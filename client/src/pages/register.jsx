import React, { useEffect, useState } from "react";
import "./../resources/authentication.css";
import { Button, Checkbox, Form, Input, message, Modal, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [loading, setLoading] = useState(false);

  // State to control MFA modal visibility
  const [showMfaModal, setShowMfaModal] = useState(false);

  // Store registered username to use later (e.g, for /enable-mfa)
  const [registeredUsername, setRegisteredUsername] = useState("");

  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Send the registration request to the backend (NO HASHING HERE)
      await axios.post("http://localhost:5000/api/user/register", {
        username: values.username,
        password: values.password, // Send plaintext password (backend will hash)
      });

      setLoading(false);
      message.success("Registration successful");
      setRegisteredUsername(values.username);
      setShowMfaModal(true);
    } catch (error) {
      setLoading(false);
      // Handle specific backend error messages
      const errorMsg = error.response?.data?.message || "Registration failed";
      message.error(errorMsg);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("resume-user")) {
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
                pattern:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?]).{16,}$/,
                message:
                  "Password must be at least 16 characters long, include an uppercase letter, a number, and a special character",
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

        {/* MFA Prompt Modal */}
        <Modal
          open={showMfaModal}
          title="Enable Two-Factor Authentication"
          onCancel={() => navigate("/login")}
          footer={[
            <Button key="skip" onClick={() => navigate("/login")}>
              ⏭️ Skip for Now
            </Button>,
            <Button
              key="enable"
              type="primary"
              onClick={() => {
                // Store username so EnableMFA can access it
                localStorage.setItem(
                  "resume-user",
                  JSON.stringify({ username: registeredUsername })
                );
                navigate("/enable-mfa");
              }}
            >
              ✅ Enable MFA
            </Button>,
          ]}
        >
          <p>
            For enhanced security, we recommend enabling Two-Factor
            Authentication (MFA). This adds an extra layer of protection to your
            account by requiring a 6-digit code from an authenticator app in
            addition to your password.
          </p>
        </Modal>
      </div>
    </div>
  );
}

export default Register;
