import { Router } from "express";
import { UserController } from "@/controllers/user.controller";
import { protect } from "@/middlewares/auth.middleware";
import upload from "@/middlewares/upload.middleware";

const router = Router();
const userController = new UserController();

router.use(protect);
router.get('/me', userController.profile.bind(userController));
router.patch('/upload-avatar', upload.single('avatar'), userController.updateAvatar.bind(userController));
router.patch('/update-profile', userController.updateProfile.bind(userController));

export default router;