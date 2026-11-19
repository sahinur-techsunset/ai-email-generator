import { GoogleGenAI } from "@google/genai";
import { EmailBodyInterface } from "../interfaces/email.interface";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const generateEmailService = async (body: EmailBodyInterface) => {
    const gemini = new GoogleGenAI({
        apiKey: GEMINI_API_KEY
    })

    const startTime = Date.now();

    const response = await gemini.models.generateContent({
        model: 'gemini-3.5-flash-lite',
        contents: `
            Generate a short, customer-friendly email:
            Purpose: ${body.purpose},
            Recipient: ${body.recipient_name},
            Sender: Customer Support Team
            Tone: ${body.tone},
            Return JSON with "subject" and "body" fields.
        `,
        config: {
            responseMimeType: "application/json"
        }

    })

    const endTime = Date.now();
    const responseTime = endTime - startTime

    return {
        ai_response_time: `${responseTime} ms`,
        content: JSON.parse(response.text as string)
    }
}