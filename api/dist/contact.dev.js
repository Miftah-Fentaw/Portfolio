"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = handler;

var nodemailer = require('nodemailer');

function handler(req, res) {
  if (req.method === 'POST') {
    var _req$body = req.body,
        name = _req$body.name,
        email = _req$body.email,
        projectType = _req$body.projectType,
        message = _req$body.message;
    var transporter = nodemailer.createTransport({
      host: 'YOUR_SMTP_HOST',
      port: 587,
      secure: false,
      // true for 465, false for other ports
      auth: {
        user: 'YOUR_SMTP_USER',
        pass: 'YOUR_SMTP_PASSWORD'
      }
    });
    var mailOptions = {
      from: "'''".concat(name, "''' <").concat(email, ">"),
      to: 'Miftahfentawdev@gmail.com',
      subject: "New project inquiry: ".concat(projectType),
      text: message,
      html: "\n        <h2>New Project Inquiry</h2>\n        <p><strong>Name:</strong> ".concat(name, "</p>\n        <p><strong>Email:</strong> ").concat(email, "</p>\n        <p><strong>Project Type:</strong> ").concat(projectType, "</p>\n        <p><strong>Message:</strong></p>\n        <p>").concat(message, "</p>\n      ")
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
        res.status(500).json({
          message: 'Error sending message'
        });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({
          message: 'Message sent successfully'
        });
      }
    });
  } else {
    res.status(405).json({
      message: 'Method not allowed'
    });
  }
}