import fetch from "node-fetch";
import OpenAI from "openai";

export default async function handler(req, res) {
  const {conversation} = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({error: "Method not allowed"});
  }

  try {
    const data = await fetchOpenAIResponse(conversation);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error processing message:", error);
    res.status(500).json({error: "Failed to fetch response from OpenAI"});
  }
}
async function fetchOpenAIResponse(conversation) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: conversation,
    temperature: 0.9,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
  });

  return response.choices[0].message.content;
}
