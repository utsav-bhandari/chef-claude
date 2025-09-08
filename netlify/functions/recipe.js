import Together from "together-ai";

const together = new Together({
    apiKey: process.env.TOGETHER_API_KEY,
});

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients.
You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention,
but try not to include too many extra ingredients. Format your response in markdown that is correct to make it easier to render to a web page.
`;

export default async (req) => {
    try {
        const { ingredients = [] } = await req.json();
        const ingredientsString = Array.isArray(ingredients)
            ? ingredients.join(", ")
            : String(ingredients);

        const primaryModel = "meta-llama/Llama-4-Scout-17B-16E-Instruct";

        let result;
        try {
            result = await together.chat.completions.create({
                model: primaryModel,
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    {
                        role: "user",
                        content: `I have ${ingredientsString}. What should I cook?`,
                    },
                ],
            });
        } catch (e) {
            // Fallback to a widely available serverless chat model if the primary is unavailable
            const fallbackModel = "meta-llama/Llama-3.3-70B-Instruct-Turbo";
            result = await together.chat.completions.create({
                model: fallbackModel,
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    {
                        role: "user",
                        content: `I have ${ingredientsString}. What should I cook?`,
                    },
                ],
            });
        }

        const fullMessage = result.choices?.[0]?.message?.content ?? "";
        return new Response(JSON.stringify({ recipe: fullMessage }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("Error from Together:", err);
        return new Response(
            JSON.stringify({ error: "Failed to generate recipe" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
