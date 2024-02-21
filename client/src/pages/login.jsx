import React, { useEffect, useState } from "react";
import "./../resources/authentication.css";
import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setloading(true);
    try {
      const user = await axios.post("/api/user/login", values);
      message.success("Login successfull");
      localStorage.setItem("resume-user", JSON.stringify(user.data));
      setloading(false);
      navigate("/home");
    } catch (error) {
      setloading(false);
      message.error("Login failed");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (localStorage.getItem("resume-user")) {
      navigate("/home");
    }
  });

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img
            src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
            alt="Login"
          />
        </div>
        {loading && <Spin size="large" />}
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">Welcome back</p>
          <p>Login to the Dashboard</p>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
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
