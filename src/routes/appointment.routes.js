import express from "express";
import { getAppointments } from "../controllers/appointment.controller.js";

const router = express.Router();

router.get("/", getAppointments);

export default router;
