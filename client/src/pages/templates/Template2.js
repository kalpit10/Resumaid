import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import "../../resources/templates.css";

function Template2() {
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
    <div className="template2-parent">
      <div className="tem2">
        {/* Header Section */}
        <div className="header1">
          <h1>
            <b>
              {user.firstname ? user.firstname.toUpperCase() : "First Name"}{" "}
              {user.lastname ? user.lastname.toUpperCase() : "Last Name"}
            </b>
          </h1>
          <h6 className="text-left">Objective</h6>
          <p>{user.objective || "Objective goes here."}</p>
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
            {/* Education Section */}
            <section className="education">
              <h4>
                <u>
                  <b>Education</b>
                </u>
              </h4>
              {user.education.length > 0 ? (
                user.education.map((education, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex gap-2">
                      <b>{education.qualification}</b> :<p>{education.range}</p>
                    </div>
                    <b>{education.institution}</b>
                    <br></br>
                    <div className="d-flex gap-2">
                      <p>{education.course}</p>:
                      <b className="print-percentage">{education.percentage}</b>
                    </div>
                  </div>
                ))
              ) : (
                <p>No education details provided</p>
              )}
            </section>

            {user.experience.length > 0 && (
              <section className="experience mb-4">
                <h4>
                  <u>
                    <b>Work Experience</b>
                  </u>
                </h4>
                {user.experience.length > 0 ? (
                  user.experience.map((exp, index) => (
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
                  ))
                ) : (
                  <p>No experience details provided</p>
                )}
              </section>
            )}

            {user.courses.length > 0 && (
              <div className="courses">
                <h4>
                  <b>
                    <u>Courses</u>
                  </b>
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
            )}

            {user.interests.length > 0 && (
              <div className="interests">
                <h4>
                  <b>
                    <u>Interests</u>
                  </b>
                </h4>
                {user.interests.map((interest) => {
                  return <p>{interest.interests}</p>;
                })}
              </div>
            )}
          </div>
        </Col>

        {/* Right Column */}
        <Col>
          <div className="divtwo">
            {user.projects.length > 0 && (
              <div className="projects">
                <h4>
                  <b>
                    <u>Personal Projects</u>
                  </b>
                </h4>
                {user.projects.map((project, index) => {
                  return (
                    <div key={index} className="d-flex flex-column">
                      <h6>
                        <b>{project.title}</b>
                      </h6>
                      <p>{project.description}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {user.skills.length > 0 && (
              <section className="skills">
                <h4>
                  <u>
                    <b>Skills</b>
                  </u>
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
            )}

            {user.certificates.length > 0 && (
              <section className="certificates mb-4">
                <h4>
                  <u>
                    <b>Certificates</b>
                  </u>
                </h4>
                {user.certificates.length > 0 ? (
                  user.certificates.map((certificate, index) => (
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
                  ))
                ) : (
                  <p>No certificates available</p>
                )}
              </section>
            )}

            {user.cocurricular.length > 0 && (
              <section className="interests">
                <h4>
                  <u>
                    <b>Co-Curricular Activities</b>
                  </u>
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
          </div>
        </Col>
      </div>
    </div>
  );
}

export default Template2;
