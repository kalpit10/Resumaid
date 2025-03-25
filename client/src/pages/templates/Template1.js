import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  LinkedinOutlined,
  MailOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import "../../resources/templates.css";

const Template1 = () => {
  const defaultUser = {
    firstname: "",
    lastname: "",
    email: "",
    mobileNumber: "",
    portfolio: "",
    address: "",
    objective: "",
    experience: [],
    skills: [],
    certificates: [],
    courses: [],
    projects: [],
    education: [],
    interests: [],
    cocurricular: [],
  };

  const [user, setUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("resume-user"));
    return savedUser ? { ...defaultUser, ...savedUser } : defaultUser;
  });

  useEffect(() => {
    const updatedUser = JSON.parse(localStorage.getItem("resume-user"));
    if (updatedUser) {
      setUser({ ...defaultUser, ...updatedUser }); // Merge with defaults
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
            {user.projects.length > 0 && (
              <section className="projects mb-4">
                <h4>
                  <b>Personal Projects</b>
                </h4>
                {user.projects.map((project, index) => (
                  <div key={index} className="mb-3">
                    <h6>
                      <b>{project.title}</b>
                    </h6>
                    <p>{project.description}</p>
                  </div>
                ))}
              </section>
            )}

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
            {user.courses.length > 0 && (
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
            )}
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
            {user.projects.length > 0 && (
              <section className="projects mb-4">
                <h4>
                  <b>Personal Projects</b>
                </h4>
                {user.projects.map((project, index) => (
                  <div key={index} className="mb-3">
                    <h6>
                      <b>{project.title}</b>
                    </h6>
                    <p>{project.description}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Skills Section */}
            {user.skills.length > 0 && (
              <section className="skills mb-4">
                <h4>
                  <b>Skills</b>
                </h4>

                {user.skills.map((skill, index) => (
                  <div className="d-flex gap-2">
                    <p key={index} className="mb-2">
                      {skill.technology}
                    </p>{" "}
                    : <p>{skill.rating}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Certificates Section */}
            {user.certificates.length > 0 && (
              <section className="certificates mb-4">
                <h4>
                  <b>Certificates</b>
                </h4>

                {user.certificates.map((certificate, index) => (
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
                ))}
              </section>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Template1;
