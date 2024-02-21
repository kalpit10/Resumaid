import React from "react";
import Score from "./score";
import DefaultLayout from "../components/DefaultLayout";
import "../resources/result.css";

function Result() {
  return (
    <DefaultLayout>
      <div>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
          crossOrigin="anonymous"
        />

        {/* <link
          href="https://fonts.cdnfonts.com/css/manifestor"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/cera-round-pro"
          rel="stylesheet"
        /> */}
        {/* <button
            onClick={() => navigate("/upload")}
            className="btn btn-primary ms-5 btn-circle"
          >
            Back
          </button> */}

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
    </DefaultLayout>
  );
}

export default Result;
