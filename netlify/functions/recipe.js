import { Together } from 'together-ai';

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. 
You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, 
but try not to include too many extra ingredients. Format your response in markdown that is correct to make it easier to render to a web page.
`;

export default async (req, context) => {
  try {
    let ingredientsString = '';
    const body = await req.json();
    const { ingredients } = body;
    ingredientsString = ingredients.join(", ");

    const result = await together.chat.completions.create({
    model: 'meta-llama/Llama-Vision-Free',
    messages: [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
    ]});

    const fullMessage = result.choices?.[0]?.message?.content || '';

    return new Response(JSON.stringify({ recipe: fullMessage }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
    },
    });

  } catch (err) {
    console.error("Error from Together:", err);
    return new Response(JSON.stringify({ error: "Failed to generate recipe" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
