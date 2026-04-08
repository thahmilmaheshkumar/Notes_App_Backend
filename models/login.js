import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, "Please provide a name"],
    unique: true,
  },
  email: {
    type: "string",
    required: [true, "Please provide an email"],
  },
  password: {
    type: "string",
    required: [true, "Please provide a password"],
  },
  Image: {
    type: "string",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Login", LoginSchema);
