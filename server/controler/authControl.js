import jwt from "jsonwebtoken"
import { getMongoDbConn } from "../db/dbConect.js";
import { ObjectId } from "mongodb";

export const authMidelwer = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: "no token provaided" })
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "123")

    const mongoConn = await getMongoDbConn();
    const usersCollection = mongoConn.collection("usersData");
    const user = await usersCollection.findOne({
      _id:new ObjectId(decoded.id)
    });
    if (user) {
      req.user = user
      next()
    } else {
      return res.status(403).json({ message: "user not found" })
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error" + err.message });
  }
};

export function otheraz(arr) {
  return async (req, res, next) => {
    try {
      const { user } = req;
      if (arr.includes(user.role)) {
        next()
      } else {
        res.status(401).json({ message: "not autherizd" })
      }
    } catch {
      res.status(500).json({ msg: "error" + err.message });
    }
  }
} 