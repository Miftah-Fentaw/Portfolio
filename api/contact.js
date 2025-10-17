
const nodemailer = require('nodemailer');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, projectType, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: 'YOUR_SMTP_HOST',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'YOUR_SMTP_USER',
        pass: 'YOUR_SMTP_PASSWORD',
      },
    });

    const mailOptions = {
      from: `${name} <${email}>`,
      to: 'Miftahfentawdev@gmail.com',
      subject: `New project inquiry: ${projectType}`,
      text: message,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending message' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Message sent successfully' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
