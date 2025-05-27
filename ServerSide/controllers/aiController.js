import { GoogleGenAI } from "@google/genai"
import { conceptExplainPrompt, questionAnswerPrompt } from "../utils/prompts.js"
import { asyncHandler } from "../utils/asyncHandler.js"
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY })

const generateInterviewQuestions = asyncHandler(async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body
        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ error: "All fields are required" })
        }
        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions)
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
            // maxOutputTokens: 1000,
            // temperature: 0.7
        })
        let rawText = response.text
        // Clean the raw text to ensure it is a valid JSON array from beginning to end
        const cleanText = rawText.replace(/^```json\s*/, "")//remove starting ```json
            .replace(/```$/, "") //remove ending ```
            .trim() //trim whitespace
        // Parse the cleaned text as JSON
        const data = JSON.parse(cleanText)
        res.status(200).json(data)
    } catch (error) {
        console.error("Error generating interview questions:", error)
        res.status(500).json({ error: "Failed to generate interview questions" })

    }
})
const generateConceptExplanation = asyncHandler(async (req, res) => {
    const { question } = req.body
    if (!question) {
        return res.status(400).json({ error: "Missing required field." })
    }
    try {
        const prompt = conceptExplainPrompt(question)
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
            // maxOutputTokens: 500,
            // temperature: 0.7
        })
        let rawText = response.text
        const cleanText = rawText
            .replace(/^```json\s*/, "")
            .replace(/```$/, "")
            .trim()
        const data = JSON.parse(cleanText)
        res.status(200).json(data)

    } catch (error) {
        console.error("Error generating concept explanation:", error)
        res.status(500).json({ error: "Failed to generate concept explanation" })
    }
})
export { generateInterviewQuestions, generateConceptExplanation }