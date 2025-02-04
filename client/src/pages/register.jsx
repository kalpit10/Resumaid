import React, { useEffect, useState } from "react";
import "./../resources/authentication.css";
import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setloading(true);
    try {
      // Send the registration request to the backend
      await axios.post("http://localhost:5000/api/user/register", values);
      setloading(false);
      message.success("Registration successful");
      navigate("/login"); // Redirect to login after successful registration
    } catch (error) {
      setloading(false);
      // Handle specific backend error messages
      if (error.response && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Registration failed");
      }
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
        {/* <div className="illustration-wrapper">
          <img
            src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
            alt="Login"
          />
        </div> */}
        {loading && <Spin size="large" />}
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">Welcome</p>
          <p>Kindly Register and then Login to the Dashboard</p>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?]).{8,}$/,
                message:
                  "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirm-password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={loading}
            >
              Register
            </Button>
            <Link to="/login">Click here to Login</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;
