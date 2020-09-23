import Email from "@sentrei/types/models/Email";

// eslint-disable-next-line import/prefer-default-export
export const emailSendGrid: Email.SendGrid = {
  to: "test@test.com",
  from: "support@sentrei.com",
  subject: "subject",
  text: "text",
  html: "html",
};
