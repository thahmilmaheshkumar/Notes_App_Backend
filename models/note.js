import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Login",
    required: true,
  },
  note: {
    type: "string",
    required: [true, "Please provide a note"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Note", NoteSchema);
