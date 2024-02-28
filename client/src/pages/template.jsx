import React from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import templateimg from "../resources/templateImages/template1.jpg";
import templateimg2 from "../resources/templateImages/template2.jpg";
import templateimg3 from "../resources/templateImages/template3.jpg";
import templateimg4 from "../resources/templateImages/template4.jpg";
import templateimg5 from "../resources/templateImages/template5.jpg";
import templateimg6 from "../resources/templateImages/template6.jpg";

function Template() {
  const navigate = useNavigate();
  const template1 = [
    {
      title: "Simple Resume",
      image: templateimg,
    },
  ];

  const template2 = [
    {
      title: "College Resume",
      image: templateimg2,
    },
  ];

  const template3 = [
    {
      title: "Basic Resume",
      image: templateimg3,
    },
  ];

  const template4 = [
    {
      title: "Creative Resume",
      image: templateimg4,
    },
  ];

  const template5 = [
    {
      title: "Executive Resume",
      image: templateimg5,
    },
  ];

  const template6 = [
    {
      title: "Modern Resume",
      image: templateimg6,
    },
  ];

  return (
    <DefaultLayout>
      <div className="row home">
        {template1.map((template, index) => {
          return (
            <div className="col-md-4 justify-content-between">
              <div className="template">
                <img src={template.image} height="400" alt="" />
                <div className="text">
                  <p>{template.title}</p>
                  <button onClick={() => navigate(`/templates/${index + 1}`)}>
                    <b>TRY</b>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {template2.map((template, index) => {
          return (
            <div className="col-md-4 justify-content-between">
              <div className="template">
                <img src={template.image} height="400" alt="" />
                <div className="text">
                  <p>{template.title}</p>
                  <button onClick={() => navigate(`/templates/${index + 2}`)}>
                    <b>TRY</b>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {template3.map((template, index) => {
          return (
            <div className="col-md-4 justify-content-between">
              <div className="template">
                <img src={template.image} height="400" alt="" />
                <div className="text">
                  <p>{template.title}</p>
                  <button onClick={() => navigate(`/templates/${index + 3}`)}>
                    <b>TRY</b>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {template4.map((template, index) => {
          return (
            <div className="col-md-4 justify-content-between">
              <div className="template">
                <img src={template.image} height="400" alt="" />
                <div className="text">
                  <p>{template.title}</p>
                  <button onClick={() => navigate(`/templates/${index + 4}`)}>
                    <b>TRY</b>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {template5.map((template, index) => {
          return (
            <div className="col-md-4 justify-content-between">
              <div className="template">
                <img src={template.image} height="400" alt="" />
                <div className="text">
                  <p>{template.title}</p>
                  <button onClick={() => navigate(`/templates/${index + 5}`)}>
                    <b>TRY</b>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {template6.map((template, index) => {
          return (
            <div className="col-md-4 justify-content-between">
              <div className="template">
                <img src={template.image} height="400" alt="" />
                <div className="text">
                  <p>{template.title}</p>
                  <button onClick={() => navigate(`/templates/${index + 6}`)}>
                    <b>TRY</b>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DefaultLayout>
  );
}

export default Template;
