import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import "../resources/upload.css";
import swal from "sweetalert";

function FileUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [checkScoreDisabled, setCheckScoreDisabled] = useState(true);

  // Handle file selection
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError(null);
      setCheckScoreDisabled(false); // Enable "Check Score" button
    } else {
      setFile(null);
      setError("Please select a valid .docx file.");
      setCheckScoreDisabled(true); // Disable "Check Score" button
    }
  };

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    try {
      // Prepare FormData for upload
      const formData = new FormData();
      formData.append("File", file);

      // Send POST request to server
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        swal({
          title: "File uploaded successfully",
          icon: "success",
        });
        console.log("Server Response:", result);
        setCheckScoreDisabled(false); // Enable "Check Score" button
        setError(null);
      } else {
        throw new Error(result.message || "Unknown error occurred.");
      }
    } catch (err) {
      console.error("Upload Error:", err);
      setError(err.message || "An error occurred while uploading.");
      setCheckScoreDisabled(true); // Disable "Check Score" button
    }
  };

  return (
    <DefaultLayout>
      <p className="font fs-4 mt-4 text-center ms-5 ps-5">
        So, here you are!
        <br /> Upload your resume here and get it tested by us.
      </p>
      <form
        className="position-absolute top-50 start-50 translate-middle mt-5 ms-5"
        onSubmit={handleUpload}
      >
        <p className="font fs-6 text-center font-monospace">
          Upload in .docx format (Resumes crafted with text-based editors only)
        </p>
        <div className="mb-3">
          <input
            className="p-4 font fs-5 ml-3 form-control"
            id="formFile"
            type="file"
            name="File"
            onChange={handleChange}
            accept=".docx"
          />
        </div>
        <div className="ms-4">
          {error && <p className="text-danger">{error}</p>}
          <button
            type="submit"
            className="btn btn-primary font m-4 btn-lg"
            disabled={!file} // Disable upload button until a file is selected
          >
            Upload
          </button>
          <button
            type="button"
            onClick={() => navigate("/result")}
            className="btn btn-primary font m-4 btn-lg"
            disabled={checkScoreDisabled} // Disable "Check Score" button if no valid upload
          >
            Check Score
          </button>
        </div>
      </form>
    </DefaultLayout>
  );
}

export default FileUpload;
