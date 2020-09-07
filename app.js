const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
let uniID = 1;
//Mysql Config
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

//Connection
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql connected");
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

//inserting data into table
app.get("/insertdata", (req, res) => {
  const post = { user_id: req.body.user_id, password: req.body.password };
  console.log(req.body);
  const sql = "INSERT INTO user_id SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("post added");
  });
});

//Adding University details
app.post("/insertuni", (req, res) => {
  const post = {
    uniname: req.body.uniname,
    webURL: req.body.webURL,
    contact: req.body.contact,
    regDate: req.body.regDate,
    expDate: req.body.expDate,
    studentNo: req.body.studentNo,
    email: req.body.email,
    imgURL: req.body.imgURL,
    uid: uniID,
    user_id: req.body.user,
  };

  const sql = "INSERT INTO uni_details SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;

    res.send("post added");
    uniID += 1;
  });
});

//Getting all posts
app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM user_id";

  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log("posts fecthed");
    res.send(results);
  });
});

//Get university details
app.post("/getunis", (req, res) => {
  let sql = `SELECT * FROM uni_details WHERE user_id = "${req.body.user}" `;

  let query = db.query(sql, (err, results) => {
    if (err) throw err;

    console.log("Uni details fecthed");
    res.send(results);
  });
});

//Getting one post
app.get("/onepost/:id", (req, res) => {
  let sql = `SELECT * FROM user_id WHERE user_id = "${req.params.id}"`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});

//Editing posts
app.get("/updatepost/:id/:update", (req, res) => {
  let newId = req.params.update;
  let sql = `UPDATE user_id SET user_id = "${newId}" WHERE user_id = "${req.params.id}"`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("posts updated");
  });
});

app.post("/login", (req, res) => {
  const user = req.body.user_id;
  const pass = req.body.password;
  let sql = `SELECT * FROM user_id WHERE user_id = "${user}"`;
  let query = db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    }
    if (results.length == 0) {
      res.send("incorrectuid");
      return;
    }
    if (results[0].password != pass) {
      res.send("incorrectpw");
      return;
    }
    res.json(results);
  });
});

app.listen("4000", () => {
  console.log("server started on port 4000");
});
