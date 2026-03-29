import express from "express";
import {
  addOpeningHours,
  updateOpeningHours,
  getOpeningHours,
  getOpeningHoursById
} from "../controllers/openingHours.controller.js";

const router = express.Router();

router.post("/addOpeningHours", addOpeningHours);
router.post("/updateOpeningHours", updateOpeningHours);
router.post("/getOpeningHours", getOpeningHours);
router.post("/getOpeningHoursById", getOpeningHoursById);

export default router;
