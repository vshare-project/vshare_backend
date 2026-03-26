import { SubscriptionController } from "@/controllers";
import { protect } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();
const subController = new SubscriptionController();

router.use(protect);
router.post('/purchase', subController.purchase.bind(subController));
router.get('/my-subscription', subController.getMySub.bind(subController));
router.post('/cancel/:id', subController.cancel.bind(subController));

export default router;