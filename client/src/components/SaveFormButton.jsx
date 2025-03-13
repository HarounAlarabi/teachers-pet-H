import { BASE_API_URL } from "../api/config";

function SaveFormButton({
  selectedAnswers,
  comments,
  teacherID,
  pupilID,
  setSavedPupilID,
  pupilName,
  date,
  overrideScore,
  overrideComment,
  saveMessage,
  setSaveMessage,
}) {
  const endPoint = "/save-user-form-input";
  const formSubmission = {};
  function saveUserInput() {
    const dateTime = new Date();
    const formattedDateTime = dateTime.toLocaleString();

    setSaveMessage(`Case successfully saved on ${formattedDateTime}`);

    formSubmission.pupilID = pupilID;
    formSubmission.teacherID = teacherID;
    formSubmission.pupilName = pupilName;
    formSubmission.updateDate = date;
    formSubmission.overrideScore = overrideScore;
    formSubmission.overrideComment = overrideComment;
    const teacherAnswerIDs = Object.values(selectedAnswers);
    formSubmission.teacherSelectedAnswers = teacherAnswerIDs.map(
      (answer, index) => {
        return {
          answerID: answer,
          teacherComment: comments[index],
        };
      }
    );
    console.log("Sending form submission:", { formSubmission });

    fetch(`${BASE_API_URL}${endPoint}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formSubmission }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSavedPupilID(data.pupilID);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  return (
    <div>
      <button className="primary-btn icon-btn" onClick={saveUserInput}>
        Save
      </button>
    </div>
  );
}

export default SaveFormButton;
