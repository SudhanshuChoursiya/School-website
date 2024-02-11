import verifyEmailTemplate from "./verifyEmailTemplate.js";

import nodemailer from "nodemailer";

const verifyEmail = (userEmail, id) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: userEmail,
    subject: "Email verification",
    html: verifyEmailTemplate(id),
  };

  transporter.sendMail(mailOptions);
};

export default verifyEmail;
