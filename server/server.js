// const express = require("express");

// const bodyParser = require("body-parser");
// require("dotenv").config();

// const app = express();
// let cors = require("cors");
// app.use(cors({ origin: "*" }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const expressPort = process.env.PORT || 5000;

// app.listen(expressPort, () =>
//   console.log(`Listening on expressPort ${expressPort}`)
// );
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// const getQandA = require("./getQandA");
// const fetchPupilData = require("./fetchPupilData");
// const deletePupil = require("./delete-pupil");
// const restorePupil = require("./restore-pupil");
// const validateUser = require("./validate-user");
// const saveUserFormInput = require("./save-user-form-input");
// const getPupilRecord = require("./get-pupil-record");
// const getPupilAnswers = require("./get-pupil-answers");

// app.get("/getQandA", getQandA);
// app.post("/fetch-pupil-data", fetchPupilData);
// app.delete("/delete-pupil", deletePupil);
// app.post("/restore-pupil", restorePupil);
// app.options("/login", cors());
// app.post("/login", validateUser);
// app.post("/save-user-form-input", saveUserFormInput);
// app.post("/get-pupil-record", getPupilRecord);
// app.post("/get-pupil-answers", getPupilAnswers);

const express = require("express");
const app = express();
let cors = require("cors");

const whiteList = ["http://localhost:3000"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (whiteList.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define all routes here
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const getQandA = require("./getQandA");
app.get("/getQandA", getQandA);

const fetchPupilData = require("./fetchPupilData");
app.post("/fetch-pupil-data", fetchPupilData);

const deletePupil = require("./delete-pupil");
app.delete("/delete-pupil", deletePupil);

const restorePupil = require("./restore-pupil");
app.post("/restore-pupil", restorePupil);

const validateUser = require("./validate-user");
app.post("/login", validateUser);

const saveUserFormInput = require("./save-user-form-input");
app.post("/save-user-form-input", saveUserFormInput);

const getPupilRecord = require("./get-pupil-record");
app.post("/get-pupil-record", getPupilRecord);

const getPupilAnswers = require("./get-pupil-answers");
app.post("/get-pupil-answers", getPupilAnswers);

const expressPort = process.env.PORT || 5000;

app.listen(expressPort, () =>
  console.log(` Listening on expressPort ${expressPort} `)
);
