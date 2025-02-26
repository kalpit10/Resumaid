import React from "react";
import { Container, Button, Carousel } from "react-bootstrap";
import { ThemeProvider, createTheme } from "@mui/material";
import { MdEmail, MdPhone } from "react-icons/md";
import TypeWriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import "../resources/landing.css";
import Header from "../components/Header";

function Home() {
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#2196f3",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="home-page bg-dark text-light">
        {/* Navbar */}
        <Header />

        {/* Hero Section */}
        <section className="hero vh-100 d-flex align-items-center position-relative">
          <div className="hero-overlay position-absolute w-100 h-100"></div>
          <Container className="position-relative">
            <div className="typewriter-effect">
              <TypeWriter
                options={{
                  strings: [
                    "Welcome to Resumaid!",
                    "Free ATS Evaluation",
                    "Create Your Perfect Resume",
                    "Get Hired Faster",
                    "Stand Out in the Job Market",
                  ],
                  delay: 70,
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                }}
              />
            </div>

            <p className="lead mb-5">
              Professional resume templates,and expert suggestions to help you
              land your dream job.
            </p>
            <Button
              variant="primary"
              size="lg"
              href="#templates"
              className="pulse-button"
            >
              Get Started
            </Button>
          </Container>
        </section>

        {/* Templates Section */}
        <section id="templates" className="py-5 bg-dark">
          <Container>
            <h2 className="text-center mb-5">Professional Templates</h2>
            <Carousel className="templates-carousel">
              <Carousel.Item>
                <div
                  className="template-preview"
                  onClick={() => navigate("/templates/1")}
                >
                  <img
                    src={require("../resources/templateImages/Template-1.png")}
                    className="img-fluid w-auto object-fit-cover"
                    alt="Template 1"
                    style={{ height: "300px" }} // Adjust height as needed
                    loading="lazy"
                  />
                  <h3>Simple Professional</h3>
                  <p>Clean and traditional layout perfect for any industry</p>
                </div>
              </Carousel.Item>

              <Carousel.Item>
                <div
                  className="template-preview"
                  onClick={() => navigate("/templates/4")}
                >
                  <img
                    src={require("../resources/templateImages/Template-4.png")}
                    className="img-fluid w-auto object-fit-cover"
                    alt="Template 4"
                    style={{ height: "300px" }} // Adjust height as needed
                    loading="lazy"
                  />
                  <h3>Creative Resume</h3>
                  <p>Contemporary design for creative professionals</p>
                </div>
              </Carousel.Item>

              <Carousel.Item>
                <div
                  className="template-preview"
                  onClick={() => navigate("/templates/6")}
                >
                  <img
                    src={require("../resources/templateImages/Template-6.png")}
                    className="img-fluid w-auto object-fit-cover"
                    alt="Template 6"
                    style={{ height: "300px" }} // Adjust height as needed
                    loading="lazy"
                  />
                  <h3>Modern Premium</h3>
                  <p>Sophisticated layout for senior positions</p>
                </div>
              </Carousel.Item>
            </Carousel>
            <div className="text-center mt-4">
              <Button
                variant="outline-light"
                size="lg"
                onClick={() => navigate("/template")}
              >
                View All Templates
              </Button>
            </div>
          </Container>
        </section>

        {/* About Section */}
        <section id="about" className="py-5 bg-darker">
          <Container>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h2 className="mb-4">About Resumaid</h2>
                <p className="lead mb-4">
                  Welcome to Resumaid, your ultimate destination for creating
                  the perfect resume. We combine professional templates to help
                  you stand out in today's competitive job market.
                </p>
                <div className="mt-4">
                  <h4>Our Features</h4>
                  <ul className="list-unstyled">
                    <li className="mb-3">
                      ✓ Explore 6 Premium Resume Templates for a Professional
                      and Polished Look
                    </li>
                    <li className="mb-3">✓ Expert ATS Suggestions</li>
                    <li className="mb-3">✓ Easy-to-Use Interface</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-image-container">
                  <div className="about-image-placeholder bg-gradient">
                    <img
                      src={require("../resources/templateImages/Template-1_HD.png")}
                      alt="About Resumes"
                      className=" w-100"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-5 bg-dark">
          <Container>
            <div className="row">
              <div className="col-lg-6">
                <h2 className="mb-4">Contact Us</h2>
                <p className="lead mb-4">
                  Have questions? We're here to help! Reach out to our team for
                  support or feedback.
                </p>
                <div className="contact-info">
                  <div className="d-flex align-items-center mb-3">
                    <MdEmail className="me-2 fs-4" />
                    <span>support@resumaid.com</span>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <MdPhone className="me-2 fs-4" />
                    <span>+1 (234) 567-8900</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <h4 className="mb-4">Our Team</h4>
                <div className="team-members">
                  <div className="team-member mb-3">
                    <h5 className="mb-1">Kalpit Swami</h5>
                    <p className="mb-2">Full Stack Developer</p>
                    <a
                      href="https://www.linkedin.com/in/kalpit-swami-7a4554204/"
                      className="btn btn-outline-light btn-sm"
                    >
                      LinkedIn Profile
                    </a>
                  </div>

                  <div className="team-member mb-3">
                    <h5 className="mb-1">Rafique Roberts</h5>
                    <p className="mb-2">Penetration Tester</p>
                    <a
                      href="https://www.linkedin.com/in/rafique-roberts-8b2b2b21a/"
                      className="btn btn-outline-light btn-sm"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                  <div className="team-member mb-3">
                    <h5 className="mb-1">Hardik Dagar</h5>
                    <p className="mb-2">Security Analyst</p>
                    <a
                      href="https://www.linkedin.com/in/hardik-dagar/"
                      className="btn btn-outline-light btn-sm"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                  <div className="team-member mb-3">
                    <h5 className="mb-1">Navdeep Tura</h5>
                    <p className="mb-2">Security Project Manager</p>
                    <a
                      href="https://www.linkedin.com/in/navdeep-tura-63a48922/"
                      className="btn btn-outline-light btn-sm"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                  <div className="team-member mb-3">
                    <h5 className="mb-1">Parameswara Reddy</h5>
                    <p className="mb-2">Threat Intelligence Analyst</p>
                    <button className="btn btn-outline-light btn-sm">
                      LinkedIn Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Footer */}
        <footer className="bg-darker py-4">
          <Container className="text-center">
            <p className="mb-0 d-flex justify-content-center">
              <div className="me-2">© {new Date().getFullYear()}</div>
              <div className="cursor" onClick={() => navigate("/")}>
                Resumaid.
              </div>
              All rights reserved.
            </p>
          </Container>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default Home;
