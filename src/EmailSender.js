import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"CreatorConnect" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      text: text
    });
  } catch (error) {
    console.error("Email send failed:", error.message);
    throw error;
  }
};


//sendEmail("malavgovind002@gmail.com", "testinggmail", "sdgbdfbvfd");

