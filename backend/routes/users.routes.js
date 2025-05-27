import { Router } from "express";
import { createData, getData, updateData } from "../controller/controller.js";
import { UserModel } from "../models/users.model.js";
const router = Router();

router.post("/", (req, res) => {
  createData(req, res, UserModel);
});
router.get("/", (req, res) => {
  getData(req, res, UserModel);
});
router.put("/:id", (req, res) => {
  updateData(req, res, UserModel);
});
router.delete("/:id", (req, res) => {
  deleteData(req, res, UserModel);
});

export default router;
