import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Analytics } from "@mui/icons-material";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Score from "./score";
import "../resources/result.css";

function Result() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(null);
  const [positives, setPositives] = useState([]); //  Stores positive feedback
  const [suggestions, setSuggestions] = useState([]); //  Stores improvement suggestions

  const handleGetResults = async () => {
    setIsLoading(true);
    try {
      const result = await Score(); // Fetch score & suggestions
      setScore(result.score);
      setPositives(result.positives);
      setSuggestions(result.suggestions);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching score:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="result-page">
      <Header />
      <Container className="mt-5 pt-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div className="back-button-wrapper mb-4">
              <Button
                variant="link"
                className="back-button"
                onClick={() => navigate("/upload")}
              >
                <ArrowLeft className="me-2" />
                Back to Upload
              </Button>
            </div>

            <AnimatePresence>
              {!showResults ? (
                <motion.div
                  className="result-content text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    className="get-results-button"
                    onClick={handleGetResults}
                    disabled={isLoading}
                  >
                    <Analytics className="me-2" />
                    {isLoading ? "Analyzing Resume..." : "Get Your Results"}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  className="score-section"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="score-content">
                    {/* Circular Score Indicator */}
                    <div className="score-circle-wrapper">
                      <motion.div
                        className="score-circle"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <svg viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            className="score-background"
                          />
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="45"
                            className="score-indicator"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: score / 100 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                        </svg>
                        <div className="score-value">{score}%</div>
                      </motion.div>
                      <h2>ATS Compatibility Score</h2>
                    </div>

                    {/* Dynamic Message Based on Score */}
                    {score >= 85 ? (
                      <motion.div
                        className="congratulations-message text-center mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h2 className="text-success">🎉 Congratulations! 🎉</h2>
                        <p className="text-muted">
                          Your resume is highly optimized! Great job ensuring
                          it's ATS-friendly.
                        </p>
                      </motion.div>
                    ) : score >= 50 && score <= 80 ? (
                      <motion.div
                        className="encouragement-message text-center mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h2 className="text-primary">Keep Improving! 💡</h2>
                        <p className="text-muted">
                          Your resume is decent, but there are areas to enhance
                          for better ATS compatibility.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="serious-message text-center mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h2 className="text-danger">
                          ⚠ Needs Significant Improvement
                        </h2>
                        <p className="text-muted">
                          Your resume lacks key ATS optimization elements.
                          Review the suggestions to improve it.
                        </p>
                      </motion.div>
                    )}

                    {/* Positive Feedback (Green Cards) */}
                    {positives.length > 0 && (
                      <div className="suggestions-grid">
                        {positives.map((positive, index) => (
                          <motion.div
                            key={index}
                            className="suggestion-card success"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                          >
                            <CheckCircle className="suggestion-icon" />
                            <h3>Well Done!</h3>
                            <p>{positive}</p>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Improvement Suggestions (Yellow Cards) */}
                    <div className="suggestions-grid">
                      {suggestions.map((suggestion, index) => (
                        <motion.div
                          key={index}
                          className="suggestion-card warning"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <AlertTriangle className="suggestion-icon" />
                          <h3>Improvement Needed</h3>
                          <p>{suggestion}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Buttons for Retesting & Download */}
                    <motion.div
                      className="action-buttons"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                    >
                      <Button
                        variant="outline-primary"
                        size="lg"
                        onClick={() => navigate("/upload")}
                      >
                        Check Another Resume
                      </Button>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => window.print()}
                      >
                        Download Report
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Result;
