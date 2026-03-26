import { Router } from 'express';
import { SubscriptionPlanController } from '@/controllers/subscription-plan.controller';
import { protect } from '@/middlewares/auth.middleware';
import { restrictTo } from "@/middlewares/role.middleware";
import { UserRole } from '@/entities/user.entity';

const router = Router();
const planController = new SubscriptionPlanController();


router.get('/', planController.getAll.bind(planController));
router.get('/:id', planController.getPlanById.bind(planController));

router.use(protect);
router.use(restrictTo(UserRole.ADMIN));

router.post('/', planController.create.bind(planController));
router.patch('/:id', planController.update.bind(planController));
router.delete('/:id', planController.delete.bind(planController));

export default router;