import { Router } from "express";
import { generateEmailController } from "../controllers/email.controller";

const EmailRouter = Router()

EmailRouter.post("/emails/generate", generateEmailController)

export default EmailRouter