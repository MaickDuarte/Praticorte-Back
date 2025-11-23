import express from "express";
import { addAppointment, updateAppointment, getAppointmentsByDate, getAppointmentByProviderAndDate } from "../controllers/appointment.controller.js";

const router = express.Router();

router.post("/addAppointment", addAppointment);
router.post("/updateAppointment", updateAppointment);
router.post("/getAppointmentsByDate", getAppointmentsByDate);
router.post("/getAppointmentByProviderAndDate", getAppointmentByProviderAndDate);

export default router;
