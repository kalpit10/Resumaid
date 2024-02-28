import React from "react";
import { Button, Dropdown } from "antd";
import { Link, useNavigate } from "react-router-dom";
import landing1 from "../resources/landing.css";
import { UserOutlined } from "@ant-design/icons";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("resume-user"));
  const items = [
    {
      key: "1",
      label: <Link to="/home">Home</Link>,
    },
    {
      key: "2",
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: "3",
      label: <Link to="/template">Resume Templates</Link>,
    },
    {
      key: "4",
      label: <Link to="/upload">Resume Review</Link>,
    },
    {
      key: "5",
      label: (
        <items
          onClick={() => {
            localStorage.removeItem("resume-user");
            navigate("/landing");
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Logout
        </items>
      ),
    },
  ];
  return (
    <div>
      <link rel={landing1} href="finaldraft.css" />
      <nav
        id="navbar-example2"
        className="navbar bg-light px-3 shadow p-3  bg-body  font fs-4 fixed-top"
      >
        <a
          className="navbar-brand position-absolute top-0 end-80"
          href={"/landing"}
        >
          <img
            src={require("./images/navlogo.jpeg")}
            alt="Bootstrap"
            className="px-1 mx-3 navimage img-fluid"
          />
        </a>

        <ul className="nav nav-pills ms-auto ">
          <li className="nav-item dropdown">
            <ul className="dropdown-menu nav-font fs-5">
              <li>
                <a className="dropdown-item" href={"/upload"}>
                  Resume review
                </a>
              </li>
              <li>
                <a className="dropdown-item" href={"/template"}>
                  Resume/CV templates
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item ">
            <a className="nav-link navtransition fs-6" href="#div5">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link navtransition fs-6" href="#div6">
              Contact us
            </a>
          </li>
          <li className="nav-item">
            <Dropdown menu={{ items }} placement="bottomLeft">
              <Button icon={<UserOutlined />}>{user.username}</Button>
            </Dropdown>
          </li>
        </ul>
      </nav>
      <div id="div1" className="position-relative">
        <img
          src={require("./images/logodiv1.jpeg")}
          alt=""
          className="rounded mx-auto d-block div1img"
        />
        <p className="text-center pt-5 fs-4 fw-normal font div1p">
          Pick out from professional resume templates, evaluate your resume and
          Linkedin profile, get suggestions to improve your CV/Resume and much
          more.
        </p>
      </div>
      <div id="div2" className="position-relative">
        <video
          src={require("./images/resumaidvideoreal.ogg")}
          autoPlay
          muted
          loop
          className="position-absolute top-50 start-50 translate-middle rounded div2video"
        ></video>
      </div>
      <div id="div3" className="position-relative">
        <div
          id="carouselExampleDark"
          className="carousel carousel-dark slide px-5 pt-5"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={1}
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={2}
              aria-label="Slide 3"
            />
          </div>
          <div className=" carousel-inner text-center ">
            <div className="carousel-item active" data-bs-interval={2000}>
              <img
                onClick={() => navigate(`/templates/1`)}
                src={require("../resources/templateImages/template1.jpg")}
                className="mx-auto d-block w-40 caraouselimg hover"
                alt="..."
              />
            </div>
            <div className="carousel-item" data-bs-interval={2000}>
              <img
                onClick={() => navigate(`/templates/4`)}
                src={require("../resources/templateImages/template4.jpg")}
                className="mx-auto d-block w-40 caraouselimg hover"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                onClick={() => navigate(`/templates/6`)}
                src={require("../resources/templateImages/template6.jpg")}
                className="mx-auto d-block w-40 caraouselimg hover"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <br />
        <br />
        <br />
        <button
          onClick={() => navigate("/template")}
          type="button"
          className="btn btn-primary btn-lg  fs-3 align-middle font fw-bolder position-absolute top-50 start-50 translate-middle mt-5 "
        >
          More Templates &gt;&gt;
        </button>
        <br />
        <br />
        <br />
        <br />

        <p className="text-center fs-4 fw-normal font p-5 m-5">
          <br></br>
          <br></br>
          Our Resumaid website offers a wide selection of professional and
          modern resume templates to choose from. Each template is designed to
          help you stand out and make a great impression with potential
          employers. Our templates are easy to use and customizable, you can
          easily fill in your personal information, education, skills, and
          experience and generate a polished and customized resume in minutes.
        </p>
      </div>
      <div id="div4" className="position-relative">
        <div className="row row-cols-1 row-cols-md-3 pt-4 px-5 py-3">
          <div className="col start-100">
            <div className="card h-100">
              <img
                src={require("./images/cardimg.jpeg")}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body font">
                <p className="card-title text-center font fw-bold font">
                  Resume Review
                </p>
                <p className="card-text font">
                  Upload your Resume in .docx format and upload it to get your
                  score and suggestions
                </p>
                <button
                  type="button"
                  className="btn btn-info fs-3 text-center"
                  onClick={() => navigate("/upload")}
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="col">
            <p className="div4para p-3 m-3 font fw-bold">
              "Welcome to Resumaid, the ultimate destination for building the
              perfect resume. Our website is designed to help job seekers create
              professional and polished resumes that will make them stand out in
              a competitive job market.
              <br></br>
              <br></br> At Resumaid, we believe that a well-crafted resume is
              key to landing your dream job. That's why we offer a variety of
              tools and resources to help you create a resume that's tailored to
              your needs.
            </p>
          </div>
          <div className="col">
            <img
              className="div4img mt-5"
              src={require("./images/div4img.jpeg")}
              alt=""
            />
          </div>
        </div>
      </div>
      <div id="div5" className="position-relative">
        <p className="text-center fs-5 fw-normal font p-5">
          Our website allows users to browse and select from a range of
          professional resume templates. Users can easily fill in their personal
          information, education, skills, and experience, and our system will
          generate a polished and customized resume in just a matter of minutes.
          But that's not all - we also offer a resume scanning feature that
          allows users to upload their existing resume and receive personalized
          suggestions and a score on how well their resume is currently
          performing.
          <br></br>
          <br></br> We are committed to helping job seekers make the most of
          their resumes, and we're constantly updating our templates and resume
          scanning technology to make sure they're up-to-date with the latest
          trends and best practices in the job market.
        </p>
        <img
          src={require("./images/aboutimage.jpeg")}
          alt=""
          className="rounded mx-auto d-block  div5img"
        />
      </div>
      <div className="div6" id="div6">
        <footer className="bg-primary text-white text-center text-lg-start">
          {/* Grid container */}
          <div className="container p-4">
            {/*Grid row*/}
            <div className="row">
              {/*Grid column*/}
              <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                <p className="font fs-3 p-2">Resumaid</p>
                <p className="font div4para p-3">
                  At Resumaid, we value our customers' feedback and are
                  committed to providing the best possible service. If you have
                  any questions or concerns about our website or services,
                  please do not hesitate to reach out to us. We have various
                  ways you can contact us, and we'll be more than happy to
                  assist you.
                </p>
              </div>
              {/*Grid column*/}
              {/*Grid column*/}
              <div className="col-lg-4 col-md-5 mb-4 mb-md-0">
                <p className="font">Built by - </p>
                <ul className="list-unstyled mb-0">
                  <li>
                    <br></br>
                    <p className="font">Kalpit Swami</p>
                    <a
                      href="https://www.linkedin.com/in/kalpit-swami-7a4554204/"
                      className="text-white font footericons"
                    >
                      <iconify-icon icon="bi:linkedin"></iconify-icon>
                    </a>
                  </li>
                  <br />
                  <li>
                    <p className="font">Lishika Goel</p>
                    <a
                      href="https://www.linkedin.com/in/lishika-goel-1638b5205/"
                      className="text-white font footericons"
                    >
                      <iconify-icon icon="bi:linkedin"></iconify-icon>
                    </a>
                  </li>
                  <br />
                  <li>
                    <p className="font">Mantra Manas Acharya</p>
                    <a
                      href="https://www.linkedin.com/in/manas-acharya-971aaa219/"
                      className="text-white font footericons"
                    >
                      <iconify-icon
                        className="footericons"
                        icon="bi:linkedin"
                      ></iconify-icon>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © Copyright:
            <script>document.write(new Date().getFullYear())</script>
            <p className="text-white font">RESUMAID</p>
          </div>
          {/* Copyright */}
        </footer>
      </div>
      <div></div>
    </div>
  );
}

export default Home;
