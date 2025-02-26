import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  LinkedinOutlined,
  MailOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import "../../resources/templates.css";

const Template1 = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("resume-user"))
  );

  useEffect(() => {
    const updatedUser = JSON.parse(localStorage.getItem("resume-user"));
    if (updatedUser) {
      setUser(updatedUser); // Update state with latest profile data
    }
  }, []);

  return (
    <Container fluid className="template1-parent">
      {/* Header Section */}
      <header className="header1">
        <h1 className="mb-3 text-center">
          <b>
            {user.firstname.toUpperCase()} {user.lastname.toUpperCase()}
          </b>
        </h1>
        <h6 className="text-left">Objective</h6>
        <p className="lead">{user.objective}</p>
      </header>

      {/* Contact Info */}
      <div className="divider1 bg-dark text-white">
        <div className="d-flex">
          <p>
            {user.email && (
              <>
                <MailOutlined />
                &ensp;{user.email} &emsp;
              </>
            )}
            {user.mobileNumber && (
              <>
                <MobileOutlined />
                &ensp;{user.mobileNumber} &emsp;
              </>
            )}
            {user.portfolio && (
              <>
                <LinkedinOutlined />
                &emsp;{user.portfolio} &emsp;
              </>
            )}
            {user.address && <>{user.address}</>}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <Container className="content1 py-4">
        <Row>
          {/* Left Column */}
          <Col md={6}>
            {/* Education Section */}
            <section className="education">
              <h4>
                <b>Education</b>
              </h4>
              {user.education.length > 0 ? (
                user.education.map((education, index) => (
                  <div key={index} className="mb-2">
                    <div className="d-flex gap-2">
                      <b>{education.qualification}</b> :<p>{education.range}</p>
                    </div>
                    <b>{education.institution}</b>
                    <br></br>
                    <div className="d-flex gap-2">
                      <p>{education.course}</p>:<b>{education.percentage}</b>
                    </div>
                  </div>
                ))
              ) : (
                <p>No education details provided</p>
              )}
            </section>

            {/* Experience Section */}

            {user.experience.length > 0 && (
              <section className="experience mt-4">
                <h4>
                  <u>
                    <b>Work Experience</b>
                  </u>
                </h4>
                {user.experience.map((exp, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex gap-2">
                      <b>{index + 1}.</b>
                      <b>{exp.designation}</b> : <b>{exp.company}</b>,
                      <b>{exp.place}</b>
                    </div>
                    <h6 className="text-nowrap me-3 d-flex gap-2 mt-2">
                      <b>{exp.range}</b>
                    </h6>
                    <p>{exp.description}</p>
                  </div>
                ))}
              </section>
            )}
            <section className="courses mb-4">
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
            </section>

            {user.interests.length > 0 && (
              <section className="interests">
                <h4>
                  <b>Interests</b>
                </h4>
                {user.interests.map((interest) => {
                  return <p>{interest.interests}</p>;
                })}
              </section>
            )}
            <br></br>

            {user.cocurricular.length > 0 && (
              <section className="interests">
                <h4>
                  <b>Co-Curricular Activities</b>
                </h4>
                {user.cocurricular.map((activity) => {
                  return (
                    <div className="d-flex gap-2">
                      <p>{activity.activity}</p>:
                      <p className="d-flex">{activity.description}</p>
                    </div>
                  );
                })}
              </section>
            )}
          </Col>

          {/* Right Column */}
          <Col md={6}>
            {/* Projects Section */}
            <section className="projects mb-4">
              <h4>
                <b>Personal Projects</b>
              </h4>
              {user.projects.length > 0 ? (
                user.projects.map((project, index) => (
                  <div key={index} className="mb-3">
                    <h6>
                      <b>{project.title}</b>
                    </h6>
                    <p>{project.description}</p>
                  </div>
                ))
              ) : (
                <p>No projects listed</p>
              )}
            </section>

            {/* Skills Section */}
            <section className="skills mb-4">
              <h4>
                <b>Skills</b>
              </h4>
              {user.skills.length > 0 ? (
                user.skills.map((skill, index) => (
                  <div className="d-flex gap-2">
                    <p key={index} className="mb-2">
                      {skill.technology}
                    </p>{" "}
                    : <p>{skill.rating}</p>
                  </div>
                ))
              ) : (
                <p>No skills listed</p>
              )}
            </section>

            {/* Certificates Section */}
            <section className="certificates mb-4">
              <h4>
                <b>Certificates</b>
              </h4>
              {user.certificates.length > 0 ? (
                user.certificates.map((certificate, index) => (
                  <div key={index} className="mb-3">
                    <h6>
                      <b>{certificate.name}</b>
                    </h6>
                    {certificate.link ? (
                      <a
                        href={certificate.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {certificate.credential}
                      </a>
                    ) : (
                      <p>{certificate.credential}</p>
                    )}
                  </div>
                ))
              ) : (
                <p>No certificates available</p>
              )}
            </section>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Template1;
