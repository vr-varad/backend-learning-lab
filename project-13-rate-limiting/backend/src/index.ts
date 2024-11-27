import express from 'express';
import { rateLimit } from 'express-rate-limit'

const app = express();
const PORT = 3000;

app.use(express.json());

const otpStore: Record<string, string> = {};

const generateOtpLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: "You have exceeded the 5 requests in 1 minute limit!",
  headers: true,
});

const resetPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: "You have exceeded the 5 requests in 1 hour limit!",
  headers: true,
});

app.post('/generate-otp', generateOtpLimiter, (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  console.log(`OTP for ${email}: ${otp}`);
  return res.status(200).json({ message: "OTP generated and logged" }) as any;
});

app.post('/reset-password', resetPasswordLimiter, (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "Email, OTP, and new password are required" });
  }
  if (otpStore[email] === otp) {
    console.log(`Password for ${email} has been reset to: ${newPassword}`);
    delete otpStore[email]; // Clear the OTP after use
    res.status(200).json({ message: "Password has been reset successfully" });
  } else {
    return res.status(401).json({ message: "Invalid OTP" }) as any;
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});