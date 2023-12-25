const twilio = require("twilio");

const sendSms = (options) => {
  const client = new twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  return client.messages
    .create({
      body: options.body,
      from: process.env.TWILIO_PHONE,
      to: `+91${options.to}`,
    })
    .catch((err) => console.error("Error: " + err));
};

module.exports = sendSms;
