import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/db.js";
import router from "./routes/authrout.js";
// import error from "./middleware/error.js";
import cookieparser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import note_router from "./routes/notes.js";
import cors from "cors";

dotenv.config({ path: "./config/config.env" });

const app = express();

//middleware
app.use(
  cors({
    origin: "https://notes-app-frontend-zeta-puce.vercel.app",
    credentials: true,
  }),
);

app.use(
  "/uploads",
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), "uploads"),
  ),
);

app.use(express.json());
app.use(cookieparser());
app.use("/api/auth/", router);
app.use("/api/data/", note_router);
// app.use(error);
await connectDB();

export default app;

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });
