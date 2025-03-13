// import React, { useEffect } from "react";
// import TeacherOverride from "./TeacherOverride";
// import "../styles/print.css";

// function PrintResult({
//   selectedAnswers,
//   questions,
//   comments,
//   teacherName,
//   pupilName,
//   date,
//   totalScore,
//   setTotalScore,
//   overrideScore,
//   setOverrideScore,
//   overrideComment,
//   setOverrideComment,
// }) {
//   const headerDate = new Date(date);
//   const outDay = headerDate.getDate().toString().padStart(2, "0");
//   const outMonth = (headerDate.getMonth() + 1).toString().padStart(2, "0");
//   const outYear = headerDate.getFullYear();
//   const printDate = `${outDay}-${outMonth}-${outYear}`;
//   useEffect(() => {
//     window.scrollTo(0, window.scrollY + 200);
//   }, []);
//   return (
//     <div id="tableAndContentToPrint" className="form-card print-container">
//       <div className="page-border"></div>

//       <h3 className="form-title result-title">
//         Vision Impairment Support Allocation
//       </h3>

//       <div className="result-content">
//         <div className="result-header">
//           <div className="result-meta-group">
//             <p className="result-meta">
//               <span className="meta-label">Teacher Name:</span>
//               <span className="meta-value">{teacherName}</span>
//             </p>
//             <p className="result-meta">
//               <span className="meta-label">Pupil Name:</span>
//               <span className="meta-value">{pupilName}</span>
//             </p>
//             <p className="result-meta">
//               <span className="meta-label">Date:</span>
//               <span className="meta-value">{printDate}</span>
//             </p>
//           </div>
//         </div>

//         <div className="questions-summary">
//           {Object.keys(selectedAnswers).map((questionIndex) => {
//             const question = questions[questionIndex];
//             const answerId = selectedAnswers[questionIndex];
//             const commentForAnswer = comments[questionIndex] || "";

//             return (
//               <div
//                 key={questionIndex}
//                 className={`question-container ${
//                   questionIndex % 5 === 0 ? "page-break" : ""
//                 }`}
//               >
//                 <div className="question-header">
//                   <h3 className="question-title">{question.question_text}</h3>
//                 </div>

//                 <div className="answer-section">
//                   <div className="answer-content">
//                     <span className="answer-text">
//                       {answerId ? (
//                         question.answers.find(
//                           (ans) => ans.answer_id === answerId
//                         ).answer_text
//                       ) : (
//                         <span className="na-text">N/A</span>
//                       )}
//                     </span>
//                     <span className="answer-score">
//                       {answerId
//                         ? `(${
//                             question.answers.find(
//                               (ans) => ans.answer_id === answerId
//                             ).answer_score
//                           } pts)`
//                         : ""}
//                     </span>
//                   </div>

//                   <div className="comment-section">
//                     <span className="comment-label">Teacher comment:</span>
//                     {commentForAnswer || (
//                       <span className="no-comment">No comments provided</span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="score-display">
//                   <span className="score-label">Score:</span>
//                   <span className="score-value">
//                     {answerId ? (
//                       question.answers.find((ans) => ans.answer_id === answerId)
//                         .answer_score
//                     ) : (
//                       <span className="na-text">N/A</span>
//                     )}
//                   </span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <TeacherOverride
//           totalScore={totalScore}
//           setTotalScore={setTotalScore}
//           overrideScore={overrideScore}
//           setOverrideScore={setOverrideScore}
//           overrideComment={overrideComment}
//           setOverrideComment={setOverrideComment}
//           className="override-section"
//         />
//       </div>
//     </div>
//   );
// }

// export default PrintResult;

import React, { useEffect } from "react";
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

  useEffect(() => {
    // Print automatically when component mounts
    window.print();

    // Return to previous page after print
    const afterPrint = () => window.history.back();
    window.addEventListener("afterprint", afterPrint);

    return () => window.removeEventListener("afterprint", afterPrint);
  }, []);

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
                {question.criterion_code && (
                  <span className="criterion-code">
                    {question.criterion_code}
                  </span>
                )}
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
