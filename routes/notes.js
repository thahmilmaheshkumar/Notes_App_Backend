import express from "express";
import {
  createNotes,
  deleted,
  getAllNotes,
  update,
} from "../controller/notescontroller.js";
import { auth } from "../middleware/auth.js";

const note_router = express.Router();

note_router
  .route("/notes")
  .get(auth, getAllNotes)
  .post(auth, createNotes)
  .put(auth, update)
  .delete(auth, deleted);

export default note_router;
