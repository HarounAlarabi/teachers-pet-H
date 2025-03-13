import React, { useState, useEffect } from "react";
import PrintResult from "./PrintResult";
import SaveFormButton from "./SaveFormButton";
import "../styles/ShowResult.css";
import BackToLandingPageButton from "./BackToLandingPageButton";

function ShowResult({
  selectedAnswers,
  questions,
  comments = [],
  teacherID,
  teacherName,
  pupilID,
  setSavedPupilID,
  pupilName,
  date,
  overrideComment,
  setOverrideComment,
  overrideScore,
  setOverrideScore,
  //validateForm,
}) {
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const handleShowResults = () => {
    //if (!validateForm()) return;
    const unansweredQuestions = questions
      .map((_, index) => selectedAnswers[index])
      .some((answerId) => !answerId);

    if (unansweredQuestions || pupilName === "") {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
      setShowResults(true);
    }
  };

  useEffect(() => {
    let score = 0;
    for (let questionIndex in selectedAnswers) {
      const answerId = selectedAnswers[questionIndex];
      if (answerId) {
        const question = questions[questionIndex];
        const answer = question.answers.find(
          (ans) => ans.answer_id === answerId
        );
        if (answer && answer.answer_score) {
          score += answer.answer_score;
        }
      }
    }
    setTotalScore(score);
  }, [selectedAnswers, questions]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="results-section">
        {showErrorMessage && (
          <div className="form-error">
            <span className="error-icon">⚠️</span>
            <p>
              Please ensure you have entered a pupil name and answered all above
              questions.
            </p>
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="primary-btn"
            onClick={handleShowResults}
          >
            Show Result
          </button>
        </div>

        {showResults && (
          <div id="print-content" className="printable-content">
            <PrintResult
              className="results-summary"
              selectedAnswers={selectedAnswers}
              questions={questions}
              comments={comments}
              teacherName={teacherName}
              pupilName={pupilName}
              date={date}
              totalScore={totalScore}
              setTotalScore={setTotalScore}
              overrideScore={overrideScore}
              setOverrideScore={setOverrideScore}
              overrideComment={overrideComment}
              setOverrideComment={setOverrideComment}
            />

            {saveMessage && (
              <div className="form-status">
                <span className="status-icon">✅</span>
                <p className="status-message">{saveMessage}</p>
              </div>
            )}

            <div className="action-group">
              <SaveFormButton
                className="secondary-btn"
                selectedAnswers={selectedAnswers}
                comments={comments}
                teacherID={teacherID}
                pupilID={pupilID}
                setSavedPupilID={setSavedPupilID}
                pupilName={pupilName}
                date={date}
                overrideScore={overrideScore}
                overrideComment={overrideComment}
                saveMessage={saveMessage}
                setSaveMessage={setSaveMessage}
              />

              <button className="primary-btn icon-btn" onClick={handlePrint}>
                <span className="btn-icon">🖨️</span>
                Print Results
              </button>

              <BackToLandingPageButton
                className="text-btn"
                teacherID={teacherID}
                teacherUsername={teacherName}
                setSaveMessage={setSaveMessage}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ShowResult;
