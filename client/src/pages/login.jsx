import React, { useEffect, useState } from "react";
import "./../resources/authentication.css";
import { Button, Form, Input, message, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [lockoutTimer, setLockoutTimer] = useState(null);
  const [rateLimitTimer, setRateLimitTimer] = useState(null);
  const [mfaRequired, setMfaRequired] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          username: values.username,
          password: values.password,
          otp: mfaRequired ? otp : undefined,
        },
        { withCredentials: true }
      );

      message.success("Login successful");

      const userData = {
        username: response?.data?.username,
      };
      localStorage.setItem("resume-user", JSON.stringify(userData));

      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);

      if (!error.response) {
        message.error("An unexpected error occurred. Please try again.");
        return;
      }

      const status = error.response.status;
      const errorMsg = error.response?.data?.message || "Login failed.";
      setErrorMessage(errorMsg);

      if (errorMsg === "OTP is required for MFA") {
        setMfaRequired(true);
        return;
      }

      if (status === 403) {
        const timeMatch = errorMsg.match(/\d+/);
        if (timeMatch && timeMatch[0]) {
          const seconds = parseInt(timeMatch[0], 10) * 60;
          if (!isNaN(seconds)) setLockoutTimer(seconds);
        }
      } else if (status === 429) {
        const retryAfter = error.response.data?.retryAfter;
        const retrySeconds = parseInt(retryAfter, 10) || 120;
        setRateLimitTimer(retrySeconds);
      } else {
        message.error("Login failed. Invalid credentials.");
      }
    }
  };

  useEffect(() => {
    if (lockoutTimer === null) return;
    const interval = setInterval(() => {
      setLockoutTimer((prev) => {
        if (prev > 1) return prev - 1;
        clearInterval(interval);
        return null;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutTimer]);

  useEffect(() => {
    if (rateLimitTimer === null) return;
    const interval = setInterval(() => {
      setRateLimitTimer((prev) => {
        if (prev > 1) return prev - 1;
        clearInterval(interval);
        return null;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [rateLimitTimer]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("resume-user") || "{}");
    if (user?.username) {
      navigate("/");
    }
  }, [navigate]);

  const isDisabled = lockoutTimer !== null || rateLimitTimer !== null;

  return (
    <div className="login-page">
      <div className="login-box">
        {loading && <Spin size="large" />}
        <Form name="login-form" onFinish={onFinish}>
          <p className="form-title">Welcome back</p>
          <p>Login to the Dashboard</p>

          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" disabled={isDisabled} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" disabled={isDisabled} />
          </Form.Item>

          {mfaRequired && (
            <Form.Item
              name="otp"
              rules={[{ required: true, message: "Please input your OTP!" }]}
            >
              <Input
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Item>
          )}

          {lockoutTimer !== null && (
            <p className="error-text" style={{ color: "red" }}>
              Account Locked. Try again in {Math.floor(lockoutTimer / 60)}:
              {(lockoutTimer % 60).toString().padStart(2, "0")} minutes.
            </p>
          )}

          {rateLimitTimer !== null && (
            <p className="error-text" style={{ color: "red" }}>
              Rate limit exceeded. Try again in{" "}
              {Math.floor(rateLimitTimer / 60)}:
              {(rateLimitTimer % 60).toString().padStart(2, "0")} minutes.
            </p>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={isDisabled}
            >
              LOGIN
            </Button>
            <Link to="/register">Click here to Register</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
