import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b427db75045359",
        pass: "****5840",
      },
    });

    const mailOptions = {
      from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
      to: email,
      subject: emailType === "VERIFY" ? "Verify your Email" : "Reset password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to 
            ${
              emailType === "VERIFY"
                ? "verify your email"
                : "reset your password"
            }
            or copy and paste the link below in your browser.
            <br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
