import React, { useEffect, useState } from "react";
import { Button, Form, message, Spin, Tabs } from "antd";
import Personalinfo from "../components/Personalinfo";
import SkillsEducation from "../components/SkillsEducation";
import ExperienceProjects from "../components/experienceProjects";
import Certificates from "../components/Certificates";
import Interests from "../components/Interests";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/profile", { withCredentials: true })
      .then((response) => {
        setUserData(response.data); // Store user data securely in state
      })
      .catch((error) => {
        console.error("Failed to fetch user data", error);
      });
  }, []);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await axios.post(
        "http://localhost:5000/api/user/update",
        values, // backend should get it from JWT
        { withCredentials: true }
      );

      if (result.data) {
        setUserData(result.data); // Update user data in state
        message.success("Profile updated successfully");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);

      if (error.response?.status === 401) {
        message.error("Session expired. Please login again!");
        localStorage.removeItem("resume-user"); // Clearing old session
        navigate("/login");
      } else {
        message.error("Profile update failed");
      }
    }
  };

  return (
    <div className="row home">
      <Header />
      <br />
      <br />
      <br />
      <div className="row profile">
        {loading && <Spin size="large" />}
        <div className="update-profile">
          <h2>
            <b>Update Profile</b>
          </h2>
          <hr />
          <Form layout="vertical" onFinish={onFinish} initialValues={userData}>
            <Tabs
              style={{
                fontFamily: "'Source Serif Pro', serif",
                fontWeight: "bold",
              }}
              defaultActiveKey="1"
              items={[
                {
                  label: `Personal info`,
                  key: "1",
                  children: <Personalinfo />,
                },
                {
                  label: `Skills and Education`,
                  key: "2",
                  children: <SkillsEducation />,
                },
                {
                  label: `Experience / Projects`,
                  key: "3",
                  children: <ExperienceProjects />,
                },
                {
                  label: `Certificates / Courses`,
                  key: "4",
                  children: <Certificates />,
                },
                {
                  label: `Co-curricular / Interests`,
                  key: "5",
                  children: <Interests />,
                },
              ]}
            />
            <Button htmlType="submit" className="btnupdt">
              UPDATE
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
