const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const { config } = require("dotenv");
const cors = require("cors");
const nodemailer = require("nodemailer");

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

const accessToken = oauth2Client.getAccessToken();

router.post("/", cors(), async (req, res) => {
  console.log("email post route hit");

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USER,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  let info = await transporter
    .sendMail({
      from: "The Write Match!",
      to: `${req.body.emailAddress}`,
      subject: "You recieved a message from one of your Matches!",
      text: `${req.body.emailContent}`,
      html: `<div className="email" >
    <h2>You recieved a message from one of your Matches!</h2>
    <h4>Hi, ${req.body.emailToName}! Here is a message from ${req.body.emailFromName}:</h4>
    <p>${req.body.emailContent}</p>
    <h4>If you'd like to reply and they did not include contact information, you can email them
    by going to The Write Match, navigating to you Current Matches, and clicking the "Contact This Writer!" button.
    Happy connecting! Love,</h4>
    <h2>The Write Match</h2>
  </div>`,
    })
    .catch(console.error);
  res.send("meow");
});

module.exports = router;
