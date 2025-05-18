import { Router } from "express";
import { createData } from "../controller/controller.js";
import { UserModel } from "../models/users.model.js";
const router = Router();

router.post("/", (req, res) => {
  createData(req, res, UserModel);
});

export default router;
