import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import "../resources/upload.css";
import swal from "sweetalert";

function FileUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [checkScoreDisabled, setCheckScoreDisabled] = useState(true); // Set the initial value to true

  const handleChange = (e) => {
    let selected = e.target.files[0];
    let types = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
      setCheckScoreDisabled(false); // Enable the Check Score button if a file has been selected
    } else {
      setFile(null);
      setError("Please select a .docx file");
      setCheckScoreDisabled(true); // Disable the Check Score button if a file has not been selected or is invalid
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (file) {
      let data = new FormData();
      data.append("File", file);
      data.append("File", file.name);
      swal({
        title: "File uploaded successfully",
        icon: "success",
      });
      fetch(
        "http://localhost:5000/upload",
        // fetch("https://resumaid.herokuapp.com/upload",
        {
          method: "POST",
          body: data,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setError("Please select a file to upload");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent the default form submit behavior

    // create a new FormData object
    const formData = new FormData();

    // append the file to the FormData object
    formData.append("File", file);

    // send a POST request to the server with the FormData as the body
    fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          setCheckScoreDisabled(false); // enable the check score button
          setError(null); // clear any previous error messages
        } else {
          setCheckScoreDisabled(true); // disable the check score button
          setError(data.message); // display the error message
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setCheckScoreDisabled(true); // disable the check score button
        setError("Error uploading file. Please try again."); // display a generic error message
      });
  };

  return (
    <DefaultLayout>
      <p className="font fs-4 mt-4 text-center ms-5 ps-5">
        So, here you are!<br></br> Upload your resume here and get it tested by
        us.
      </p>
      <form
        className="position-absolute top-50 start-50 translate-middle mt-5 ms-5"
        onSubmit={handleSubmit}
      >
        <p className="font fs-6 text-center font-monospace">
          Upload in .docx format(Resumes crafted with text-based editors only)
        </p>
        <div className="mb-3">
          <input
            className="p-4 font fs-5 ml-3 form-control"
            id="formFile"
            type="file"
            onChange={handleChange}
            accept=".docx"
          />
        </div>
        <div className="ms-4">
          {error && <p>{error}</p>}
          <button
            type="submit"
            onClick={handleUpload}
            className="btn btn-primary font m-4 btn-lg"
          >
            Upload
          </button>
          <button
            type="button"
            onClick={() => navigate("/result")}
            className="btn btn-primary font m-4 btn-lg"
            disabled={checkScoreDisabled} // Set the disabled attribute based on the checkScoreDisabled state
          >
            Check Score
          </button>
        </div>
      </form>
    </DefaultLayout>
  );
}

export default FileUpload;
