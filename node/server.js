const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql');
const server = express()
server.use(bodyParser.json());

// to connect frontend  nd backend 
const cors = require('cors')
server.use(cors())

// establish d db connection

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "airways_application",
});

db.connect(function (error) {
    if (error) {
        console.log("Error connecting to DB");
    }
    else {
        console.log("Successfully conndected to db");
    }
});

// establish d port 

server.listen(8085, function check(error) {
    if (error) {
        console.log("errorr");
    }
    else {
        console.log("started");
    }
});

//insert query -api (create the tercord )

// server.post("/api/student/add", (req, res) => {
//     let details = {
//         stname: req.body.stname,
//         course: req.body.course,
//         fee: req.body.fee,
//     };
//     let sql = "INSERT INTO student SET ?";
//     db.query(sql, details, (error) => {
//         if (error) {
//             res.send({ status: false, message: "Student created Failed" });
//         }
//         else {
//             res.send({ status: true, message: "Student created Success" });
//         }
//     });
// });

//view the record 

server.get("/getDestination", (req, res) => {
    var sql = "SELECT * FROM destinations";
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Table dosen't exist");
        }
        else {
            res.send({ status: true, data: result });
        }
    });
});

// flights 
server.get("/getFlights", (req, res) => {
    var sql = "SELECT * FROM flights";
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Table dosent exist");
        }
        else {
            res.send({ status: true, data: result });
        }
    });
});

