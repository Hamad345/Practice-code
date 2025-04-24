import express from "express"
import { isAuthenticate } from "../middleware/verifyToken.js"
import { getMessage, sendMessage, uploadFile } from "../controller/message.controller.js"
import multer from "multer"

const MESSAGE_ROUTES = '/api/messages';

export const UPLOAD_FILE_ROUTER = `${MESSAGE_ROUTES}/upload-file`;

const router = express.Router()

const upload = multer({ dest: "uploads/files" });
router.get("/:id", isAuthenticate, getMessage)
router.post("/send/:id", isAuthenticate, sendMessage);
router.post("/upload-file/:id", isAuthenticate, upload.single("file"), uploadFile);
export default router