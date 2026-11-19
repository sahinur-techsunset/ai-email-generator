
# AI Email Template Generator

A simple backend project that generates email templates using Google Gemini AI.

## Technologies
- Node.js
- Express.js
- TypeScript
- Google Gemini AI

## Setup

```bash
npm install
```

Create a `.env` file:

```env
PORT=8080
GEMINI_API_KEY=your_api_key
```

Start the server:

```bash
npm run dev
```

## API

**POST** `/api/v1/emails/generate`

Request body:

```json
{
  "purpose": "Request a project deadline extension",
  "recipient_name": "Rahul",
  "tone": "professional"
}
```

## Available Tones
- Professional
- Formal
- Friendly
- Casual
- Polite

## AI Usage

Google Gemini AI is used to generate short email templates based on the given purpose, recipient name and tone.

The API also measures AI response time.
