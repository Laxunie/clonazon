import express from "express";
import { loginUser, refreshToken, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);

export default router;