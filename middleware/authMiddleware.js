import jwt from "jsonwebtoken";
import asyncHandler from "express";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  console.log("middleware");
  let token;
  console.log(req.headers.authorization);
  next();
  //   if (
  //     req.headers.authorization &&
  //     req.headers.authorization.startsWith("Bearer")
  //   ) {
  // try {
  //   token = req.headers.authorization.split(" ")[1];
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   console.log("decodedd", decoded);
  //   next();
  // } catch (error) {}
  // }
  // console.log(req.headers.authorization);

  //   if (!token) {
  //     res.status(401);
  //     throw new Error("Not authorised, no token");
  //   }
});

export { protect };
