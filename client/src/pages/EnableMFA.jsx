// ✅ EnableMFA.jsx (Styled UI)
import React, { useEffect, useState } from "react";
import { Button, Input, message, Spin, Card, Typography } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

function EnableMFA() {
  const [qrCode, setQrCode] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("resume-user"));
    if (!user?.username) {
      message.error("User not found. Please login again.");
      navigate("/login");
      return;
    }

    const fetchQRCode = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/enable-mfa",
          {
            username: user.username,
          }
        );
        setQrCode(response.data.qrCode);
        setLoading(false);
      } catch (error) {
        message.error("Failed to generate QR code");
        navigate("/login");
      }
    };

    fetchQRCode();
  }, [navigate]);

  const handleVerify = async () => {
    setVerifying(true);
    const user = JSON.parse(localStorage.getItem("resume-user"));
    try {
      await axios.post("http://localhost:5000/api/user/verify-mfa", {
        username: user.username,
        token: otp,
      });

      message.success("MFA setup complete! You can now login.");
      localStorage.removeItem("resume-user");
      navigate("/login");
    } catch (error) {
      message.error(error.response?.data?.message || "Invalid OTP. Try again.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        {loading ? (
          <Spin size="large" />
        ) : (
          <Card
            style={{ maxWidth: 400, margin: "auto", textAlign: "center" }}
            bordered={false}
            className="mfa-card"
          >
            <Title level={3}>🔐 Set Up MFA</Title>
            <Paragraph>
              Scan the QR code below using Google Authenticator, then enter the
              6-digit code to confirm.
            </Paragraph>

            <img
              src={qrCode}
              alt="MFA QR Code"
              style={{ width: 200, margin: "1rem auto", display: "block" }}
            />

            <Input
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{ marginBottom: "1rem" }}
            />
            <Button
              type="primary"
              block
              onClick={handleVerify}
              loading={verifying}
              disabled={otp.length !== 6}
            >
              ✅ Verify OTP
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}

export default EnableMFA;
