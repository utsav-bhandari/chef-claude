import 'dotenv/config';

import { Together } from 'together-ai';

const together = new Together({
    // apiKey: "284c2a47ab2d1dedc7aabe1fe02eba07f5f8f1625c8b62cbaf405e96ca8533d6",
  apiKey: process.env.TOGETHER_API_KEY,
});

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

export default async (req, context) => {
  try {
    const { ingredients } = await req.json();
    const ingredientsString = ingredients.join(", ");

    const stream = await together.chat.completions.create({
      model: 'deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free',
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
      ],
      stream: true,
    });

    let fullMessage = '';
    for await (const chunk of stream) {
      fullMessage += chunk.choices?.[0]?.delta?.content || '';
    }

    const cleanedMessage = fullMessage.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

    return new Response(JSON.stringify({ recipe: cleanedMessage }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Error from Together:", err);
    return new Response(JSON.stringify({ error: "Failed to generate recipe" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
