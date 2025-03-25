import React, { useEffect, useState } from "react";
import {
  MailOutlined,
  MobileOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import "../../resources/templates.css";

function Template6() {
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
    <div className="template6-parent">
      <div>
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
        <div className="divide1">
          <div className="top d-flex justify-content-center">
            <p>
              {user.email && (
                <>
                  <MailOutlined />
                  &ensp;{user.email} &emsp;&emsp;&emsp;
                </>
              )}
              {user.mobileNumber && (
                <>
                  <MobileOutlined />
                  &ensp;{user.mobileNumber} &emsp;&emsp;&emsp;
                </>
              )}
              {user.portfolio && (
                <>
                  <LinkedinOutlined />
                  &ensp;{user.portfolio} &emsp;&emsp;&emsp;
                </>
              )}
              {user.address && <>{user.address}</>}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content1">
        <div className="divone">
          {/* Work Experience */}
          {user.experience.length > 0 && (
            <section className="experience mt-4">
              <h4>
                <b>Work Experience</b>
              </h4>
              <div className="divider mb-2"></div>
              {user.experience.map((exp, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex gap-2">
                    <b>{index + 1}.</b>
                    <b>{exp.designation}</b> : <b>{exp.company}</b>,{" "}
                    <b>{exp.place}</b>
                  </div>
                  <h6 className="text-nowrap d-flex gap-2">
                    <b>{exp.range}</b>
                  </h6>
                  <p>{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {user.skills.length > 0 && (
            <section className="skills mt-4">
              <h4>
                <b>Skills</b>
              </h4>
              <div className="divider mb-2"></div>
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
            <div className="certificates mt-4">
              <h4>
                <b>Certificates</b>
              </h4>
              <div className="divider mb-2"></div>
              {user.certificates.map((certificate, index) => (
                <div className="d-flex flex-column" key={index}>
                  <h6>
                    <b>{certificate.name}</b>
                  </h6>
                  <p>{certificate.credential}</p>
                </div>
              ))}
            </div>
          )}

          {/* Courses */}
          {user.courses.length > 0 && (
            <section className="courses mt-4">
              <h4>
                <b>Courses</b>
              </h4>
              <div className="divider mb-2"></div>
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
        </div>

        <div className="divtwo">
          {/* Projects */}
          {user.projects.length > 0 && (
            <section className="projects mt-4">
              <h4>
                <b>Personal Projects</b>
              </h4>
              <div className="divider mb-2"></div>
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

          {/* Education */}
          {user.education.length > 0 && (
            <section className="education mt-4">
              <h4>
                <b>Education</b>
              </h4>
              <div className="divider mb-2"></div>
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

          {/* Interests */}
          {user.interests.length > 0 && (
            <section className="interests mt-4">
              <h4>
                <b>Interests</b>
              </h4>
              <div className="divider mb-2"></div>
              {user.interests.map((interest, index) => (
                <p key={index}>{interest.interests}</p>
              ))}
            </section>
          )}

          {/* Co-Curricular Activities */}
          {user.cocurricular.length > 0 && (
            <section className="interests mt-4">
              <h4>
                <b>Co-Curricular Activities</b>
              </h4>
              <div className="divider mb-2"></div>
              {user.cocurricular.map((activity, index) => (
                <div className="d-flex gap-2" key={index}>
                  <p>{activity.activity}</p>:
                  <p className="d-flex">{activity.description}</p>
                </div>
              ))}
            </section>
          )}
          <br />
        </div>
      </div>
    </div>
  );
}

export default Template6;
