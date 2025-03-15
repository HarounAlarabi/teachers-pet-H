import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import ShowResult from "./ShowResult";
import appendices from "./data/appendices.json";
import AppendixTooltip from "./AppendixToolTip";
import { BASE_API_URL } from "../api/config";
import "../styles/form.css";
function Form() {
  const location = useLocation();
  const teacherUsername = location.state.teacherUsername;
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [scores, setScores] = useState({});
  const [comments, setComments] = useState([]);
  const [setErrors] = useState({
    pupilName: "",
    date: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [pupilName, setPupilName] = useState("");
  const [date, setDate] = useState("");
  const [overrideComment, setOverrideComment] = useState("");
  const [overrideScore, setOverrideScore] = useState("");
  const [savedPupilID, setSavedPupilID] = useState("");

  const teacherID = location.state.teacherID;
  let editPupilID = location.state.pupilId;
  if (savedPupilID !== "" && editPupilID !== savedPupilID) {
    editPupilID = savedPupilID;
  }

  const endpoints = {
    questions: `${BASE_API_URL}/getQandA`,
    pupilRecord: `${BASE_API_URL}/get-pupil-record`,
    pupilAnswers: `${BASE_API_URL}/get-pupil-answers`,
  };

  const questionsURL = endpoints.questions;
  const pupilRecordURL = endpoints.pupilRecord;
  const pupilAnswersURL = endpoints.pupilAnswers;
  const [populator, setPopulator] = useState(false);

  useEffect(() => {
    if (questions.length > 0) {
      setComments((prev) => {
        const newComments = Array(questions.length).fill("");
        return prev.length === questions.length ? prev : newComments;
      });
    }
  }, [questions]);

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
    setDate(formattedDate);
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(questionsURL);
        if (!response.ok) throw new Error("No data to display");
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        console.error("Error fetching questions:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
    if (editPupilID) setPopulator(true);
  }, [questionsURL, editPupilID]);

  const handleRadioChange = useCallback(
    (questionIndex, answer_id) => {
      const answer = questions[questionIndex]?.answers?.find(
        (ans) => ans.answer_id === answer_id
      );
      setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: answer_id }));
      setScores((prev) => ({
        ...prev,
        [questionIndex]: answer?.answer_score || 0,
      }));
    },
    [questions]
  );

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchEditData = async () => {
      if (!populator || !editPupilID) return;

      try {
        const [recordResponse, answersResponse] = await Promise.all([
          fetch(pupilRecordURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pupilID: editPupilID }),
            signal,
          }),
          fetch(pupilAnswersURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pupilID: editPupilID }),
            signal,
          }),
        ]);

        // Handle record response
        if (!recordResponse.ok) {
          throw new Error("Failed to fetch pupil record");
        }
        const recordData = await recordResponse.json();

        // Validate and set record data
        if (recordData.length > 0) {
          const pupil = recordData[0];
          setPupilName(pupil.pupil_nickname || "");
          setOverrideComment(pupil.override_comment || "");
          setOverrideScore(pupil.override_score || null);
        }

        // Handle answers response
        if (!answersResponse.ok) {
          throw new Error("Failed to fetch pupil answers");
        }
        const answerData = await answersResponse.json();

        // Process answers
        if (answerData.length > 0) {
          const newComments = [];
          answerData.forEach((answer, index) => {
            handleRadioChange(index, answer.answer_id);
            newComments[index] = answer.teacher_comment || "";
          });
          setComments(newComments);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error);
        }
      }
    };

    fetchEditData();

    return () => controller.abort();
  }, [
    populator,
    editPupilID,
    pupilRecordURL,
    pupilAnswersURL,
    handleRadioChange,
  ]);
  const handleComment = (index, e) => {
    const updatedComments = [...comments];
    updatedComments[index] = e.target.value;
    setComments(updatedComments);
  };
  const validateForm = () => {
    const newErrors = {};
    if (!pupilName.trim()) newErrors.pupilName = "Pupil name is required";
    if (!date) newErrors.date = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (isLoading) {
    return <div className="loading-spinner">Loading assessment form...</div>;
  }

  return (
    <div className="form-container">
      {/* Input Section */}
      <div className="form-header">
        <div className="input-group">
          <label className="input-label">Teacher Name:</label>
          <input
            className="form-input readOnlyInput"
            value={teacherUsername}
            readOnly
          />
        </div>

        <div className="input-group">
          <label className="input-label">Pupil Name:</label>
          <input
            className="form-input"
            value={pupilName}
            onChange={(e) => setPupilName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Date:</label>
          <input
            type="date"
            className="form-input date-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      {/* Questions Section */}
      <div className="questions-container">
        {questions.length === 0 ? (
          <div className="no-questions">📝 No questions available</div>
        ) : (
          questions.map((que, index) => (
            <div key={que.id || index} className="question-card">
              <div className="question-header">
                <h3 className="question-title">
                  <span>{que.question_text}</span>
                  {(que.criterion_code === "1.1" ||
                    que.criterion_code === "1.2" ||
                    que.criterion_code === "7") && (
                    <AppendixTooltip
                      appendixId={`appendix-${que.criterion_code}`}
                      content={
                        appendices.appendices.find((a) => {
                          const appendixMap = { 1.1: 1, 1.2: 2, 7: 3 };
                          return a.id === appendixMap[que.criterion_code];
                        }) || { type: "Appendix not found", details: [] }
                      }
                    />
                  )}
                </h3>
              </div>

              <fieldset className="answer-options">
                {que.answers?.map((answer) => (
                  <label key={answer.answer_id} className="answer-option">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={answer.answer_id}
                      checked={selectedAnswers[index] === answer.answer_id}
                      onChange={() =>
                        handleRadioChange(index, answer.answer_id)
                      }
                      className="answer-radio"
                    />
                    <div className="answer-row">
                      <span className="answer-text">{answer.answer_text}</span>
                      <span className="answer-score">
                        ({answer.answer_score} pts)
                      </span>
                    </div>
                  </label>
                ))}
              </fieldset>

              <div className="question-footer">
                <div className="comment-section">
                  <label className="comment-label">
                    Additional Comments
                    <span className="character-count">
                      ({(comments[index] || "").length}/255)
                    </span>
                  </label>
                  <textarea
                    className="comment-input"
                    value={comments[index] || ""}
                    onChange={(e) => handleComment(index, e)}
                    placeholder="Enter specific observations..."
                    maxLength="255"
                    aria-label={`Comments for question ${index + 1}`}
                  />
                </div>

                <div className="score-display">
                  <span className="score-label">Current Score:</span>
                  <span className="score-value">{scores[index] || 0}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <ShowResult
        className="results-section"
        validateForm={validateForm}
        selectedAnswers={selectedAnswers}
        questions={questions}
        comments={comments}
        teacherID={teacherID}
        teacherName={teacherUsername}
        pupilID={editPupilID}
        setSavedPupilID={setSavedPupilID}
        pupilName={pupilName}
        date={date}
        overrideComment={overrideComment}
        setOverrideComment={setOverrideComment}
        overrideScore={overrideScore}
        setOverrideScore={setOverrideScore}
      />
    </div>
  );
}

export default Form;
