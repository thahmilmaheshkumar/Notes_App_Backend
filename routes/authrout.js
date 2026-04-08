import express from "express";
import {
  getUserDetails,
  Login,
  logout,
  register,
  uploaded,
} from "../controller/authcontroller.js";
import { auth } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/register", upload.single("Image"), register);
router.post("/login", Login);
router.get("/me", auth, getUserDetails);
router.post("/logout", auth, logout);
router.post("/upload", auth, upload.single("Image"), uploaded);

export default router;
