import React from "react";
import Score from "./score";
import "../resources/result.css";
import Header from "../components/Header";

function Result() {
  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <div>
        <a href={"/upload"} target="_self" className="backicn ms-5">
          <iconify-icon icon="material-symbols:arrow-circle-left"></iconify-icon>
        </a>

        <div>
          <img
            src={require("./images/resultimg.jpeg")}
            alt=""
            className="position-absolute top-50 start-50 translate-middle imgresult"
          ></img>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto position-absolute bottom-0 start-50 translate-middle-x mb-5 font">
          <button className="btn btn-primary btn-lg" id="bt" onClick={Score}>
            Get your results here
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
