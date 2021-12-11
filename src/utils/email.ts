require("dotenv").config();
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

// Create a SMTP transport object
const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // upgrade later with STARTTLS  host: "smtp.gmail.com",
  // tls: {
  //   ciphers: "SSLv3",
  // },
  requireTLS: true,

  auth: {
    // type: "OAuth2",
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const connectGMAIL = async () => {
  // verify connection configuration
  await transport.verify();
  console.log("Nodemailer connecté !");
};

export const messageEmail = (
  to: string,
  subject: string,
  text: string,
  htmlTemplate: string,
  attachments?: Array<{ filename: string; content: string | Buffer; encoding?: string }> | undefined
) => {
  return {
    from: '"IMIE VSCode" <imievscodegroupe3@gmail.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html: htmlTemplate,
    attachments,
  };
};

// envoie du mail
export const sendMail = (message: { from: string; to: string; subject: string; text: string; html: string }) => {
  return new Promise<boolean>(resolve => {
    transport.sendMail(message, error => {
      if (error) {
        console.log(error.message);
        resolve(false);
      }
      // if you don't want to use this transport object anymore, uncomment following line
      transport.close(); // close the connection pool
      resolve(true);
    });
  });
};
