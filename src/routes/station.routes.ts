import { StationController } from "@/controllers/station.controller";
import { UserRole } from "@/entities";
import { protect } from "@/middlewares/auth.middleware";
import { restrictTo } from "@/middlewares/role.middleware";
import upload from "@/middlewares/upload.middleware";
import { Router } from "express";

const router = Router();
const stationController = new StationController;

router.get('/', stationController.getAllStation.bind(StationController))
router.get('/:id', stationController.getStationById.bind(StationController))

router.post('/', protect, restrictTo(UserRole.ADMIN), upload.array('images', 5) ,  stationController.createStation.bind(StationController))
router.patch('/:id', protect, restrictTo(UserRole.ADMIN), upload.array('images', 5) ,  stationController.updateStation.bind(StationController))
router.delete('/:id', protect, restrictTo(UserRole.ADMIN) ,  stationController.delete.bind(StationController))



export default router;