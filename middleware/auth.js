import jwt from "jsonwebtoken";
import errorhandler from "../helper/errorhandler.js";

export const auth = async (req, resizeBy, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return resizeBy
        .status(401)
        .json({ success: false, message: "Please login to access" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode.id;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Please login to access" });
  }
};
