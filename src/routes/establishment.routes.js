import express from "express";
import {
  addEstablishment,
  updateEstablishment,
  getEstablishmentById,
  getEstablishmentByUser,
  getEstablishments
} from "../controllers/establishment.controller.js";

const router = express.Router();

router.post("/addEstablishment", addEstablishment);
router.post("/updateEstablishment", updateEstablishment);
router.post("/getEstablishmentById", getEstablishmentById);
router.post("/getEstablishmentByUser", getEstablishmentByUser);
router.post("/getEstablishments", getEstablishments);

export default router;
