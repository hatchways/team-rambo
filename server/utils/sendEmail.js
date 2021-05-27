// External util for sending emails!
// Currently attached in auth.ts upon login
// Will be moved to the appropriate functionality in the future

const sgMail = require("@sendgrid/mail");

const sendEmail = async () => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: "amahalwy@gmail.com", // Change to your recipient
    from: "teamkanban.hatchways@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    templateId: "d-e6c0b94a01e1459c9d4927595a785b97",
  };

  try {
    sgMail.send(msg).then(() => console.log("Email sent"));
  } catch (error) {
    console.error(error.body);
  }
};

module.exports = sendEmail;
