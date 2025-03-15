import TeacherOverride from "./TeacherOverride";
import "../styles/print.css";

function PrintResult({
  selectedAnswers,
  questions,
  comments,
  teacherName,
  pupilName,
  date,
  totalScore,
  setTotalScore,
  overrideScore,
  setOverrideScore,
  overrideComment,
  setOverrideComment,
}) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="print-container">
      <div className="print-header">
        <h1 className="print-title">Vision Impairment Support Allocation</h1>
        <div className="print-meta">
          <div className="meta-item">
            <span className="meta-label">Teacher:</span>
            <span className="meta-value">{teacherName}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Pupil:</span>
            <span className="meta-value">{pupilName}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Date:</span>
            <span className="meta-value">{formatDate(date)}</span>
          </div>
        </div>
      </div>

      <div className="print-content">
        {questions.map((question, index) => {
          const answerId = selectedAnswers[index];
          const answer = question.answers.find(
            (ans) => ans.answer_id === answerId
          );
          const comment = comments[index] || "No comments provided";

          return (
            <div key={question.id} className="print-question">
              <div className="question-header">
                <h3 className="question-text">{question.question_text}</h3>
              </div>

              {answer && (
                <div className="answer-section">
                  <div className="answer-row">
                    <span className="answer-text">{answer.answer_text}</span>
                    <span className="answer-score">
                      ({answer.answer_score} points)
                    </span>
                  </div>
                  <div className="comment-section">
                    <strong>Teacher Notes:</strong> {comment}
                  </div>
                </div>
              )}

              {(index + 1) % 3 === 0 && <div className="page-break" />}
            </div>
          );
        })}
      </div>

      <div className="print-footer">
        <TeacherOverride
          totalScore={totalScore}
          setTotalScore={setTotalScore}
          overrideScore={overrideScore}
          setOverrideScore={setOverrideScore}
          overrideComment={overrideComment}
          setOverrideComment={setOverrideComment}
        />
        <div className="summary-section">
          <div className="final-score">
            <span className="score-label">Total Support Score:</span>
            <span className="score-value">{overrideScore || totalScore}</span>
          </div>
          {overrideComment && (
            <div className="override-notes">
              <strong>Override Notes:</strong> {overrideComment}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PrintResult;
