const express = require("express");
const app = express();
let cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const allowedOrigins = [
  "http://localhost:3000",
  "https://teachers-pet-server.onrender.com",
  "https://mellow-marzipan-dc9e91.netlify.app"
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const getQandA = require("./getQandA");
app.get("/getQandA", getQandA);

const saveUserFormInput = require("./save-user-form-input");
app.post("/save-user-form-input", saveUserFormInput);

const fetchPupilData = require("./fetchPupilData");
app.post("/fetch-pupil-data", fetchPupilData);

const deletePupil = require("./delete-pupil");
app.delete("/delete-pupil", deletePupil);

const restorePupil = require("./restore-pupil");
app.post("/restore-pupil", restorePupil);

const validateUser = require("./validate-user");
app.post("/login", validateUser);

const getPupilRecord = require("./get-pupil-record");
app.post("/get-pupil-record", getPupilRecord);

const getPupilAnswers = require("./get-pupil-answers");
app.post("/get-pupil-answers", getPupilAnswers);

const expressPort = process.env.PORT || 5000;
app.listen(expressPort, () =>
  console.log(` Listening on expressPort ${expressPort} `)
);
