import { registerUser, loginUser } from "../services/authService.js";
import generateToken from "../utils/generateToken.js";
import { saveOtp } from "../services/otpService.js";
import { sendEmail } from "../EmailSender.js";
import { verifyOtpService } from "../services/otpService.js";
import { generateOtp } from "../services/otpService.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: 7 * 24 * 60 * 60 * 1000
};

export const signup = async (req, res) => {
  try {
    const { user, token } = await registerUser(req.body);
    res.cookie("token", token, cookieOptions);
    res.status(201).json({ id: user._id, name: user.name, email: user.email });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { user, token } = await loginUser(req.body);
    res.cookie("token", token, cookieOptions);
    res.json({ id: user._id, name: user.name, email: user.email });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(0)
  });
  res.json({ message: "Logged out" });
};

export const sendOtpController = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOtp();
    await saveOtp(email, otp);
    await sendEmail(email, "Your OTP Code", `Your OTP is ${otp}. It expires in 5 minutes.`);
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const verifyOtpController = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;
    await verifyOtpService(email, otp);
    const { user, token } = await registerUser({ name, email, password });
    res.cookie("token", token, cookieOptions);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};