const nodeMailer = require("nodemailer");
const { MAIL_SETTINGS } = require("../constants/constants");
const transporter = nodeMailer.createTransport(MAIL_SETTINGS);

async function sendMail({ to, OTP }) {
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: to, // list of receivers
      subject: `Slack confirmation code: ${OTP}`, // Subject line
      html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Slack</h2>
        <h4>Confirm your email address</h4>
        <p style="margin-bottom: 30px;">Your confirmation code is below — enter it in your open browser window and we'll help you get signed in.</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${OTP}</h1>
        <p style="margin-top:50px;">If you didnot request this email, there is nothing to worry about — you can safely ignore it.</p>
      </div>
    `,
    });
    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
}
module.exports = sendMail;

