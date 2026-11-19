import { NextFunction, Request, Response } from "express";
import { generateEmailService } from "../services/email.service";
import { EmailBodyInterface } from "../interfaces/email.interface";

const allowedTones = ["professional", "formal", "friendly", "casual", "polite"];

export const generateEmailController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { purpose, recipient_name, tone = "professional" } = req.body as EmailBodyInterface

        if (!purpose || !recipient_name)
            return res.status(400).json({
                success: false,
                message: "The purpose and recipient_name are required."
            })

        if (tone && !allowedTones.includes(tone.toLowerCase()))
            return res.status(400).json({
                success: false,
                message: `Invalid tone, Only allows: ${allowedTones.join(", ")}`
            })

        const response = await generateEmailService({
            purpose: purpose.trim(),
            recipient_name: recipient_name.trim(),
            tone: tone.toLowerCase() as EmailBodyInterface["tone"]
        })

        console.log(`AI Response Time: ${response.ai_response_time}`);

        res.json({
            success: true,
            ...response
        })

    } catch (err) {
        next(err)
    }
}