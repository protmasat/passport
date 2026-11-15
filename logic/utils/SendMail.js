const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const SendMail = async (email, name, message) => {
  const { data, error } = await resend.emails.send({
    from: "Passport Contact Form <onboarding@resend.dev>",
    to: process.env.EMAIL,
    replyTo: email,
    subject: "Contact Enquiry from Passport Contact Form",
    html: `
      <div>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong> ${escapeHtml(message)}</p>
      </div>
    `,
  });

  if (error) {
    console.error("Error while sending mail:", error);
    throw new Error(error.message);
  }

  console.log("Message sent:", data.id);
  return data;
};

module.exports = SendMail;
