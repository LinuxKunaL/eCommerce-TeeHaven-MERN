import NodeMailer from "nodemailer";
import config from "../../config/index.js";

const Transport = NodeMailer.createTransport({
  host: config.GoogleSMTP.host,
  port: config.GoogleSMTP.port,
  secure: true,
  auth: {
    user: config.GoogleSMTP.user,
    pass: config.GoogleSMTP.pass,
  },
});
const GenerateMailTemplate = (to, otp) => {
  return {
    form: "thelosser321@gmail.com",
    to: to,
    subject: "otp",
    html: `<div style="font-family: Helvetica, Arial, sans-serif; overflow: auto; padding: 20px; border-radius: 10px;">
    <div style="margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center;">
        <a href="" style="font-size: 2em; color: #00c876; text-decoration: none; font-weight: 600; display: block; margin-bottom: 20px;">TeeHaven</a>
      </div>
      <p style="font-size: 1.2em; text-align: center; color: #2b2b2b;">Hi,</p>
      <p style="text-align: center; color: #2b2b2b;">
        Thank you for choosing TeeHaven. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes.
      </p>
      <h2 style="background: #00c876; margin: 0 auto; width: max-content; padding: 10px; color: #fff; border-radius: 4px; text-align: center;">${otp}</h2>
      <p style="font-size: 1em; text-align: center; color: #2b2b2b;">Regards,<br />TeeHaven</p>
    </div>
  </div>
  `,
  };
};
export const sendGoogleMail = (sendToMail, otp) => {
  const body = GenerateMailTemplate(sendToMail, otp);
  Transport.sendMail(body, (error, info) => {
    if (error) {
      return error;
    }
    return info;
  });
};
