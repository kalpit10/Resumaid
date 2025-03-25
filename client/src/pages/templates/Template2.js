import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import "../../resources/templates.css";

function Template2() {
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
    <div className="template2-parent">
      <div className="tem2">
        {/* Header Section */}
        <div className="header1">
          <h1>
            <b>
              {user.firstname ? user.firstname.toUpperCase() : ""}{" "}
              {user.lastname ? user.lastname.toUpperCase() : ""}
            </b>
          </h1>
          {user.objective && (
            <>
              <h6 className="text-left">Objective</h6>
              <p>{user.objective}</p>
            </>
          )}
        </div>

        {/* Contact Info */}
        <div className="mobile">
          {user.email && (
            <p>
              <MdEmail />
              &ensp;{user.email} &emsp;
            </p>
          )}
          {user.mobileNumber && (
            <p className="num">
              <MdPhone />
              &ensp;{user.mobileNumber}
            </p>
          )}
          {user.portfolio && (
            <p>
              <FaLinkedinIn />
              &ensp;{user.portfolio}
            </p>
          )}
          {user.address && <p>{user.address}</p>}
        </div>
      </div>

      {/* Main Content */}
      <div className="content1">
        {/* Left Column */}
        <Col>
          <div className="divone">
            {/* Education */}
            {user.education.length > 0 && (
              <section className="education">
                <h4>
                  <u>
                    <b>Education</b>
                  </u>
                </h4>
                {user.education.map((education, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex gap-2">
                      <b>{education.qualification}</b> :<p>{education.range}</p>
                    </div>
                    <b>{education.institution}</b>
                    <br />
                    <div className="d-flex gap-2">
                      <p>{education.course}</p>:
                      <b className="print-percentage">{education.percentage}</b>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Experience */}
            {user.experience.length > 0 && (
              <section className="experience mb-4">
                <h4>
                  <u>
                    <b>Work Experience</b>
                  </u>
                </h4>
                {user.experience.map((exp, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex gap-2">
                      <b>{index + 1}.</b>
                      <b>{exp.designation}</b> : <b>{exp.company}</b>,{" "}
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

            {/* Courses */}
            {user.courses.length > 0 && (
              <section className="courses">
                <h4>
                  <b>
                    <u>Courses</u>
                  </b>
                </h4>
                {user.courses.map((course, index) => (
                  <div className="d-flex flex-column" key={index}>
                    <h6>
                      <b>{course.name}</b>
                    </h6>
                    <p>{course.organization}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Interests */}
            {user.interests.length > 0 && (
              <section className="interests">
                <h4>
                  <b>
                    <u>Interests</u>
                  </b>
                </h4>
                {user.interests.map((interest, index) => (
                  <p key={index}>{interest.interests}</p>
                ))}
              </section>
            )}
          </div>
        </Col>

        {/* Right Column */}
        <Col>
          <div className="divtwo">
            {/* Projects */}
            {user.projects.length > 0 && (
              <section className="projects">
                <h4>
                  <b>
                    <u>Personal Projects</u>
                  </b>
                </h4>
                {user.projects.map((project, index) => (
                  <div key={index} className="d-flex flex-column">
                    <h6>
                      <b>{project.title}</b>
                    </h6>
                    <p>{project.description}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Skills */}
            {user.skills.length > 0 && (
              <section className="skills">
                <h4>
                  <u>
                    <b>Skills</b>
                  </u>
                </h4>
                {user.skills.map((skill, index) => (
                  <div className="d-flex gap-2" key={index}>
                    <p className="mb-2">{skill.technology}</p> :{" "}
                    <p>{skill.rating}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Certificates */}
            {user.certificates.length > 0 && (
              <section className="certificates mb-4">
                <h4>
                  <u>
                    <b>Certificates</b>
                  </u>
                </h4>
                {user.certificates.map((certificate, index) => (
                  <div key={index} className="mb-3">
                    <h6>
                      <u>
                        <b>{certificate.name}</b>
                      </u>
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

            {/* Co-curricular */}
            {user.cocurricular.length > 0 && (
              <section className="interests">
                <h4>
                  <u>
                    <b>Co-Curricular Activities</b>
                  </u>
                </h4>
                {user.cocurricular.map((activity, index) => (
                  <div className="d-flex gap-2" key={index}>
                    <p>{activity.activity}</p>:
                    <p className="d-flex">{activity.description}</p>
                  </div>
                ))}
              </section>
            )}
          </div>
        </Col>
      </div>
    </div>
  );
}

export default Template2;
