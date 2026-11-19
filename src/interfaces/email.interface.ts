export interface EmailBodyInterface {
    purpose: string,
    recipient_name: string,
    tone: "professional" | "formal" | "friendly" | "casual" | "polite"
}