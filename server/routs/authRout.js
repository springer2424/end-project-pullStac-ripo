import express from "express"
import { createAgent, logIn } from "../controler/adminControl.js";
import { authMidelwer, otheraz } from "../controler/authControl.js";

const router = express.Router();

router.post("/users",authMidelwer,otheraz(["admin"]),createAgent);
router.post("/login",logIn);
router.post("/reports",authMidelwer,otheraz(["admin","agent"]),createReporrt)


export default router;