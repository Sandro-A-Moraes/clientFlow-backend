import jwt from "jsonwebtoken";
import type { TokenPayload } from "../types/tokenPayload";

export const generateAccessToken = (payload: TokenPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "15m" });
};

export const generateRefreshToken = (payload: TokenPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "7d" });
};