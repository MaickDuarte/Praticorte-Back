import express from "express";
import { getAppointmentsByDate, getAppointmentByProviderAndDate } from "../controllers/appointment.controller.js";

const router = express.Router();

router.get("/getAppointmentsByDate", getAppointmentsByDate);
router.get("/getAppointmentByProviderAndDate", getAppointmentByProviderAndDate);

export default router;
