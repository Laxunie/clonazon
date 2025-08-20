import type { Request, Response } from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

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