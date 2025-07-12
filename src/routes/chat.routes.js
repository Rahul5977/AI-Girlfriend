import express from "express";
const chatRouter = express.Router();
import { chatHandler } from "../controllers/chat.controllers.js";

chatRouter.post("/",chatHandler)
export default chatRouter;