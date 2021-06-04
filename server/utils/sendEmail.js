// External util for sending emails!
// Currently attached in auth.ts upon login
// Will be moved to the appropriate functionality in the future

const sgMail = require("@sendgrid/mail");

const sendEmail = async (toEmail, { subject, html, text }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: toEmail,
    from: 'ethanmoffat@hey.com',
    subject: subject,
    text: text,
    html: html
  };

  try {
    sgMail.send(msg).then(() => console.log(`Email ${toEmail} successfully sent`));
  } catch (error) {
    console.error(error.body);
  }
};

module.exports = sendEmail;
