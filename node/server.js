const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql');
const nodemailer = require('nodemailer');
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

server.post("/getDestination", (req, res) => {
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
server.post("/getFlights", (req, res) => {
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


//checkuser
server.post("/checkUser", (req, res) => {
    let username = req.body.username
    let password = req.body.password
    var sql = "SELECT is_active FROM users WHERE username=? AND password=?";
    db.query(sql, [username, password], function (error, result) {
        if (error) {
            console.log(error);
            res.send({ status: false });
        }
        else {
            if (result.length > 0)
                res.send({ status: true, data: result, messageType: "S" });
            else
                res.send({ status: true, messageType: "E" });
        }
    });
});

// createNewUser
server.post("/createNewUser", (req, res) => {
    let name = req.body.name
    let mobileNo = req.body.mobileNo
    let username = req.body.username
    let password = req.body.password

    var sql = "INSERT INTO users( username, password, name, phone) VALUES (?,?,?,?) ";
    db.query(sql, [username, password, name, mobileNo], function (error, result) {
        if (error) {
            console.log(error);
            res.send({ status: false, messageType: "E", message: "Check The Inserted Values" });
        }
        else {
            res.send({ status: true, messageType: "S", message: "User Created Succesfully" });
        }
    });

});

//personalDetails
server.post("/personalDetails", (req, res) => {
    let name = req.body.name
    let emailId = req.body.emailId
    let mobileNo = req.body.mobileNo
    let address = req.body.address

    var sql = "INSERT INTO personal_details(name, emailId, mobileNo, address) VALUES (?,?,?,?) ";
    db.query(sql, [name, emailId, mobileNo, address], function (error, result) {
        if (error) {
            console.log(error);
            res.send({ status: false, messageType: "E", message: "Check The Inserted Values" });
        }
        else {
            res.send({ status: true, messageType: "S", message: " Ticket Booked Succesfully" });
        }
    });

});

//set up node mailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yswathi174@gmail.com', // Your Gmail address
        pass: 'mene zbiu zjdn qsve',       // Your Gmail password
    },
});

server.post('/send-email', (req, res) => {
    let to = req.body.to;
    let name = req.body.name;
    let flightName = req.body.flightName;
    let from = req.body.from;
    let toLocation = req.body.toLocation;
    let date = req.body.date;
    let time = req.body.time;

    // let htmlContent = `<p>Hello ${name},</p>
    // <p>Your Flight : ${flightName}</p>
    // <p>Regards,</p>
    // <p>Your App</p>`

    let mailOptions = {
        from: 'yswathi174@gmail.com',
        to: to,
        subject: "IMPORTANT !! YOUR TRAVEL DETAILS ✈️",

        html: `<h1>Hello ${name} ! ,</h1><br> \
        <h3>
        Note : please ensure the necessary travel documents are carried safe and secure and for any further clarifications please contact us </h3><br><br>\
        <h4>Your Flight Name: ${flightName}\
        <br><br>\
        Deapture Date : ${date}\
        <br><br>\
        From: ${from}\
        <br><br>\
        To: ${toLocation}\
        <br><br>\
     
        Depature Time: ${time}\
        <br><br>\

        <span style="color:red;"> Thank You 🤗<span>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }

        res.status(200).send('Email sent: ' + info.response);
    });
});