export async function getRecipeFromModel(ingredientsArr) {
  try {
    const response = await fetch("/.netlify/functions/recipe", {
      method: "POST",
      body: JSON.stringify({ ingredients: ingredientsArr }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return data.recipe;
  } catch (err) {
    console.error(err.message);
  }
}
