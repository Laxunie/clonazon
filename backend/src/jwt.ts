import jwt from "jsonwebtoken";

// Create Access Token
export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "15m", // short-lived
  });
};

// Create Refresh Token
export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d", // longer-lived
  });
};