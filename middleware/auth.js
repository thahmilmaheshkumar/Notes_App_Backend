import jwt from "jsonwebtoken";
import errorhandler from "../helper/errorhandler.js";

export const auth = async (req, resizeBy, next) => {
  try {
    const token = await req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Please login to access" });
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await decode.id;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Please login to access" });
  }
};
