import React, { useEffect, useState } from "react";
import "./../resources/authentication.css";
import { Button, Form, Input, message, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [loading, setloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const onFinish = async (values) => {
    setloading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/user/login", values);
      message.success("Login successful");

      const token = response.data.token;

      // Store JWT In LocalStorage (XSS Risk)
      localStorage.setItem("resume-user", JSON.stringify(response.data));

      // Log JWT to Console (Attackers Can Steal It)
      console.log("JWT Token:", token);

      setloading(false);
      navigate("/");
    } catch (error) {
      setloading(false);

      // Exposes Backend Errors (Security Misconfiguration)
      if (error.response) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }

      message.error(errorMessage);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("resume-user")) {
      navigate("/");
    }
  });

  return (
    <div className="login-page">
      <div className="login-box">
        {loading && <Spin size="large" />}
        <Form name="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
          <p className="form-title">Welcome back</p>
          <p>Login to the Dashboard</p>
          <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>

          {/* Displays Exact Error Message - Useful for Attackers */}
          {errorMessage && <p className="error-text" style={{ color: "red" }}>{errorMessage}</p>}

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
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
