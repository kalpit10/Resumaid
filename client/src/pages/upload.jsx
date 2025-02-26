import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../resources/upload.css";
import swal from "sweetalert";
import Header from "../components/Header";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { CloudUpload, Assessment } from "@mui/icons-material";

function FileUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
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
    <div>
      <Header />
      <br />
      <br />
      <br />
      <Container className="upload-container py-5 mt-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="text-center mb-5">
              <h1 className="display-5 mb-3">Resume Evaluation</h1>
              <p className="lead text-muted">
                Upload your resume and get instant ATS feedback
              </p>
            </div>

            <Form onSubmit={handleUpload}>
              <div
                className={`upload-area ${isDragging ? "dragging" : ""} ${
                  file ? "has-file" : ""
                }`}
              >
                <Form.Control
                  type="file"
                  onChange={handleChange}
                  accept=".docx"
                  className="file-input"
                />
                <div className="upload-content">
                  <CloudUpload className="upload-icon" />
                  <p className="upload-text">
                    {file
                      ? file.name
                      : "Drag & drop your resume here or click to browse"}
                  </p>
                  <p className="upload-hint">
                    Accepts .docx format (Text-based editors only)
                  </p>
                </div>
              </div>

              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}

              <div className="d-flex justify-content-center gap-3 mt-4">
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  className="d-flex align-items-center"
                  disabled={!file}
                >
                  <CloudUpload className="me-2" />
                  Upload Resume
                </Button>
                <Button
                  variant="outline-primary"
                  size="lg"
                  onClick={() => navigate("/result")}
                  className="d-flex align-items-center"
                  disabled={checkScoreDisabled}
                >
                  <Assessment className="me-2" />
                  Check Score
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FileUpload;
