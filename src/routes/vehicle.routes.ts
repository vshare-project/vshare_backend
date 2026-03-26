import { Router } from "express";
import { VehicleController } from "@/controllers/vehicle.controller";
import { restrictTo } from "@/middlewares/role.middleware";
import { protect } from "@/middlewares/auth.middleware";
import { UserRole } from "@/entities";
import upload from "@/middlewares/upload.middleware";

const router = Router();
const vehicleController = new VehicleController();



router.get('/', vehicleController.getAllVehicles.bind(vehicleController));
router.get('/type/:type', vehicleController.getByType.bind(vehicleController));
router.get('/:id', vehicleController.getById.bind(vehicleController));

router.use(protect);
router.post('/', restrictTo(UserRole.ADMIN, UserRole.STAFF), upload.array('issueImages', 3), vehicleController.create.bind(vehicleController));
router.patch('/:id', restrictTo(UserRole.ADMIN, UserRole.STAFF), upload.array('issueImages', 3), vehicleController.update.bind(vehicleController));
router.delete('/:id', restrictTo(UserRole.ADMIN, UserRole.STAFF), vehicleController.delete.bind(vehicleController));


export default router;