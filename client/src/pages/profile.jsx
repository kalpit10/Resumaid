import React, { useEffect, useState } from "react";
import { Button, Form, message, Spin, Tabs } from "antd";
import Personalinfo from "../components/Personalinfo";
import SkillsEducation from "../components/SkillsEducation";
import ExperienceProjects from "../components/experienceProjects";
import Certificates from "../components/Certificates";
import Interests from "../components/Interests";
import axios from "axios";
import Header from "../components/Header";

function Profile() {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("resume-user"))
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("resume-user"))); // Update user state when localStorage changes
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await axios.post("http://localhost:5000/api/user/update", {
        ...values,
        _id: userData._id,
      });

      if (result.data) {
        localStorage.setItem("resume-user", JSON.stringify(result.data));
        // window.location.reload(); //Hard reload to re-map updated data in local storage
      }
      console.log(result.data);
      setLoading(false);
      message.success("Profile updated successfully");
    } catch (error) {
      setLoading(false);
      message.error("Profile updation failed");
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
