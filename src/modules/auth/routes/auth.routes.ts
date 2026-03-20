import Router from "express";
import { UserRepository } from "../../user/repository/user.repository";
import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../service/auth.service";

const authRoutes = Router();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.get("/me", authController.me);

export { authRoutes };