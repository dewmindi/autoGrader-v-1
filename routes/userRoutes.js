import express from "express";
import { addUser, login } from "../controllers/userController.js";

const router = express.Router();

router.post("/add", addUser);
router.post("/login", login);


export default router;