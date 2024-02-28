import React from "react";
import { MailOutlined, MobileOutlined } from "@ant-design/icons";
import "../../resources/templates.css";

function Template1() {
  const user = JSON.parse(localStorage.getItem("resume-user"));
  return (
    <div className="template1-parent">
      <div>
        <div className="header1">
          <h1>
            <b>
              {user.firstname.toUpperCase()} {user.lastname.toUpperCase()}
            </b>
          </h1>
          <p>{user.objective}</p>
          <br></br>
        </div>

        <div className="divider1">
          <div className="top d-flex">
            <p>
              <MailOutlined />
              {user.email} &emsp;
              <MobileOutlined />
              {user.mobileNumber}
            </p>
          </div>
        </div>
      </div>

      <div className="content1">
        <div className="divone">
          <div className="education mt-4">
            <h4>
              <b>Education</b>
            </h4>
            {user.education.map((education) => {
              return (
                <div className="d-flex">
                  <h6 style={{ width: 100 }}>
                    <b>{education.range}: </b>
                  </h6>
                  <p>
                    <b>{education.qualification}</b>
                    <br></br>
                    <b>{education.institution}</b>
                  </p>
                </div>
              );
            })}
          </div>

          <div className="experience mt-5">
            <h4>
              <b>Work Experience</b>
            </h4>
            {user.experience.map((exp) => {
              return (
                <div className="d-flex">
                  <h6 style={{ width: 90 }}>
                    <b>{exp.range}: </b>
                  </h6>
                  <p>
                    <b>{exp.company}</b> <br></br>
                    <b>{exp.place}</b>
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="divtwo">
          <div className="projects mt-4">
            <h4>
              <b>Personal Projects</b>
            </h4>
            {user.projects.map((project) => {
              return (
                <div className="d-flex flex-column">
                  <h6>
                    <b>{project.title}</b>
                  </h6>
                  <p>{project.description}</p>
                </div>
              );
            })}
          </div>

          <div className="skills mt-4">
            <h4>
              <b>Skills</b>
            </h4>
            {user.skills.map((skill) => {
              return <p>{skill.technology}</p>;
            })}
          </div>

          <div className="certificates mt-4">
            <h4>
              <b>Certificates</b>
            </h4>
            {user.certificates.map((certificate) => {
              return (
                <div className="d-flex flex-column">
                  <h6>
                    <b>{certificate.name}</b>
                  </h6>
                  {certificate.link ? (
                    <a href={certificate.link} target="_blank" rel="noreferrer">
                      {certificate.credential}
                    </a>
                  ) : (
                    <p>{certificate.credential}</p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="courses mt-4">
            <h4>
              <b>Courses</b>
            </h4>
            {user.courses.map((course) => {
              return (
                <div className="d-flex flex-column">
                  <h6>
                    <b>{course.name}</b>
                  </h6>
                  <p>{course.organization}</p>
                </div>
              );
            })}
          </div>

          <div className="interests mt-4">
            <h4>
              <b>Interests</b>
            </h4>
            {user.interests.map((interest) => {
              return <p>{interest.interests}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template1;
