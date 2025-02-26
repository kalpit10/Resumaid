import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import templateimg1 from "../resources/templateImages/Template-1.png";
import templateimg2 from "../resources/templateImages/Template-2.png";
import templateimg3 from "../resources/templateImages/Template-3.png";
import templateimg4 from "../resources/templateImages/Template-4.png";
import templateimg5 from "../resources/templateImages/Template-5.png";
import templateimg6 from "../resources/templateImages/Template-6.png";

const templates = [
  { title: "Simple Resume", image: templateimg1 },
  { title: "College Resume", image: templateimg2 },
  { title: "Basic Resume", image: templateimg3 },
  { title: "Creative Resume", image: templateimg4 },
  { title: "Executive Resume", image: templateimg5 },
  { title: "Modern Resume", image: templateimg6 },
];

function Template() {
  const navigate = useNavigate();

  return (
    <div className="row home">
      <Header />
      <br />
      <br />
      <br />
      <div className="row home">
        {templates.map((template, index) => (
          <div key={index} className="col-md-4 d-flex justify-content-center">
            <div className="template">
              <img
                src={template.image}
                height="400"
                alt={template.title}
                loading="lazy"
              />
              <div className="text">
                <p>{template.title}</p>
                <button onClick={() => navigate(`/templates/${index + 1}`)}>
                  <b>TRY</b>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Template;
