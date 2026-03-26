import { AuthController } from "@/controllers/auth.controller";
import { protect } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();
const authController = new AuthController();


router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post('/refresh', authController.refresh.bind(authController));
router.post('/verify-email', authController.verifyEmail.bind(authController));
router.post('/forgot-password', authController.forgotPassword.bind(authController));
router.post('/reset-password', authController.resetPassword.bind(authController));


router.post('/logout', protect, authController.logout.bind(authController));


export default router;
