const client = require("./db-client");

const saveUserFormInput = (req, res) => {
  const { formSubmission } = req.body;
  const {
    teacherID,
    pupilID,
    pupilName,
    updateDate,
    overrideScore,
    overrideComment,
    teacherSelectedAnswers,
  } = formSubmission;

  // Track if response has been sent
  let responseSent = false;

  // this function will add an individual answer to the table
  function addAnAnswer(pupilID, anAnswer) {
    return client.query(
      "INSERT INTO selected_option (pupil_id, answer_id, teacher_comment) VALUES ($1,$2,$3)",
      [pupilID, anAnswer.answerID, anAnswer.teacherComment]
    );
  }

  // delete existing pupil record before inserting new version
  const deleteExistingRecords = () => {
    if (!pupilID) return Promise.resolve();

    return client
      .query("DELETE FROM selected_option WHERE pupil_id = $1", [pupilID])
      .then(() =>
        client.query("DELETE FROM pupil WHERE pupil_id = $1", [pupilID])
      );
  };

  const handleError = (error, message) => {
    if (responseSent) return;
    console.error(error.message);
    res.status(502).json({
      result: "failure",
      message: message,
    });
    responseSent = true;
  };

  deleteExistingRecords()
    .then(() => client.query("SELECT MAX(pupil_id)+1 as next_id FROM pupil"))
    .then((result) => {
      const nextPupilID = result.rows[0].next_id;
      const updateTimestamp = updateDate + " 00:00:00";
      const queryString = overrideScore
        ? "INSERT INTO pupil (pupil_id, teacher_id, pupil_nickname, last_update, override_score, override_comment) VALUES ($1,$2,$3,$4,$5,$6)"
        : "INSERT INTO pupil (pupil_id, teacher_id, pupil_nickname, last_update, override_comment) VALUES ($1,$2,$3,$4,$5)";

      const queryArray = overrideScore
        ? [
            nextPupilID,
            teacherID,
            pupilName,
            updateTimestamp,
            overrideScore,
            overrideComment,
          ]
        : [nextPupilID, teacherID, pupilName, updateTimestamp, overrideComment];

      return client
        .query(queryString, queryArray)
        .then((result) => {
          if (result.rowCount === 0) {
            throw new Error("Pupil record could not be inserted");
          }
          return Promise.all(
            teacherSelectedAnswers.map((anAnswer) =>
              addAnAnswer(nextPupilID, anAnswer)
            )
          );
        })
        .then(() => {
          if (responseSent) return;
          res.status(200).json({ pupilID: nextPupilID });
          responseSent = true;
        });
    })
    .catch((error) => {
      handleError(
        error,
        error.message.includes("pupil_id")
          ? "Error setting next pupil id"
          : "Database operation failed"
      );
    });
};

module.exports = saveUserFormInput;
