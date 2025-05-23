import { Router } from "express";
import uploadFile from "../controller/upload.controller.js";

const router = Router();

router.post("/file", uploadFile);

export default router;
