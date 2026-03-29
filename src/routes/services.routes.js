import express from "express";
import { addService, updateService, getServices, deleteService } from "../controllers/services.controller.js";

const router = express.Router();

router.post("/addService", addService);
router.post("/updateService", updateService);
router.post("/getServices", getServices);
router.post("/deleteService", deleteService);

export default router;
