import React, { useEffect, useState } from "react";
import "./../resources/authentication.css";
import { Button, Form, Input, message, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [loading, setloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [lockoutTimer, setLockoutTimer] = useState(null);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    setloading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        values,
        { withCredentials: true } // Sends cookie with request
      );
      message.success("Login successful");

      const userData = {
        username: response.data.username, // Ensure username is stored
      };
      localStorage.setItem("resume-user", JSON.stringify(userData));

      setloading(false);
      navigate("/");
    } catch (error) {
      setloading(false);

      // 403  = Access Forbidden
      if (error.response?.status === 403) {
        const errorMsg = error.response.data.message;
        setErrorMessage(errorMsg);

        // Extracting remaining minutes from message
        const timeLeftMatch = errorMsg.match(/\d+/);
        if (timeLeftMatch) {
          const timeLeft = parseInt(timeLeftMatch[0], 10) * 60; // Convert minutes to seconds
          setLockoutTimer(timeLeft);

          // Start countdown timer
          const interval = setInterval(() => {
            setLockoutTimer((prev) => {
              if (prev + 1) return prev - 1;
              clearInterval(interval);
              return null; // reset wehn countdown reaches 0
            });
          }, 1000);
        }
      } else {
        message.error("Login failed. Check your credentials.");
      }
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("resume-user") || "{}");
    if (user.username) {
      navigate("/");
    }
  }, []);

  return (
    <div className="login-page">
      <div className="login-box">
        {loading && <Spin size="large" />}
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <p className="form-title">Welcome back</p>
          <p>Login to the Dashboard</p>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" disabled={lockoutTimer !== null} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              disabled={lockoutTimer !== null}
            />
          </Form.Item>

          {/* Displays Exact Error Message - Useful for Attackers
          {errorMessage && (
            <p className="error-text" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )} */}

          {lockoutTimer !== null && (
            <p className="error-text" style={{ color: "red" }}>
              Too many failed attempts. Try again in{" "}
              {Math.floor(lockoutTimer / 60)}:
              {(lockoutTimer % 60).toString().padStart(2, "0")} minutes.{" "}
            </p>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={lockoutTimer !== null}
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
