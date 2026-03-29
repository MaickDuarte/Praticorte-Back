import express from "express";
import { addUser, updateUser, getUserByEmail, getUsers, getActiveUsersAppointmentAllowed, deleteUser } from "../controllers/users.controller.js";

const router = express.Router();

router.post("/addUser", addUser);
router.post("/updateUser", updateUser);
router.post("/getUserByEmail", getUserByEmail);
router.post("/getUsers", getUsers);
router.post("/getActiveUsersAppointmentAllowed", getActiveUsersAppointmentAllowed);
router.post("/deleteUser", deleteUser);

export default router;
