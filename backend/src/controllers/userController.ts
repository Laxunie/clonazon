import type { Request, Response } from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../jwt.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, password, address, country, state, city } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      address,
      country,
      state,
      city,
    });

    res.status(201).json({ message: "User registered!", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    // Store refreshToken in httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.json({ accessToken, user }); // client stores this in memory (not localStorage)
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json({ message: "No refresh token provided" });

    // verify token synchronously
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { userId: string };

    // fetch user from DB
    const loggedUser = await User.findById(decoded.userId).select("-password");
    if (!loggedUser) return res.status(404).json({ message: "User not found" });

    // generate new access token
    const accessToken = jwt.sign({ id: loggedUser._id }, process.env.JWT_ACCESS_SECRET!, { expiresIn: "15m" });
    

    res.json({ accessToken, user: loggedUser });
  } catch (err: any) {
    if (err.name === "TokenExpiredError") return res.status(403).json({ message: "Refresh token expired" });
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
