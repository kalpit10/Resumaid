import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useParams } from "react-router-dom";
import DefaultLayout from "../../components/DefaultLayout";
import Template1 from "./Template1";
import Template2 from "./Template2";
import { Button } from "antd";
import Template3 from "./Template3";
import Template4 from "./Template4";
import Template5 from "./Template5";
import Template6 from "./Template6";
function Templates() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const params = useParams();
  const navigate = useNavigate();
  const getTemplate = () => {
    switch (params.id) {
      case "1": {
        return <Template1 />;
      }
      case "2": {
        return <Template2 />;
      }
      case "3": {
        return <Template3 />;
      }
      case "4": {
        return <Template4 />;
      }
      case "5": {
        return <Template5 />;
      }
      case "6": {
        return <Template6 />;
      }
      default: {
        return "No template";
      }
    }
  };
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-end my-5 mx-5">
        <Button className="btn1" onClick={() => navigate("/template")}>
          Back
        </Button>
        <Button className="mx-4 btn1" onClick={handlePrint}>
          Print
        </Button>
      </div>
      <div ref={componentRef}>{getTemplate()}</div>
    </DefaultLayout>
  );
}

export default Templates;
