import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Button, Form, message, Spin, Tabs } from "antd";
import Personalinfo from "../components/Personalinfo";
import SkillsEducation from "../components/SkillsEducation";
import ExperienceProjects from "../components/experienceProjects";
import Certificates from "../components/Certificates";
import Interests from "../components/Interests";
import axios from "axios";

function Profile() {
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("resume-user"));
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await axios.post("api/user/update", {
        ...values,
        _id: user._id,
      });
      localStorage.setItem("resume-user", JSON.stringify(result.data));
      setLoading(false);
      message.success("Profile updated successfully");
    } catch (error) {
      setLoading(false);
      message.error("Profile updation failed");
    }
  };

  return (
    <DefaultLayout>
      {loading && <Spin size="large" />}
      <div className="update-profile">
        <h2>
          <b>Update Profile</b>
        </h2>
        <hr />
        <Form layout="vertical" onFinish={onFinish} initialValues={user}>
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
    </DefaultLayout>
  );
}

export default Profile;
