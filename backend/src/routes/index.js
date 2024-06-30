import express from "express";
import { get_list } from "../controllers/listController.js";

const router = express.Router();


router.get("/get-list", get_list);

export default router;