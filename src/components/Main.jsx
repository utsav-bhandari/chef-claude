import { useState } from "react";

export default function Main() {
    let [ingredients, setIngredients] = useState([]);
    let ingredientsList = ingredients.map(i => <li key={i}>{i}</li>);

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredientsList => [...prevIngredientsList, newIngredient])
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                    />
                <button>
                    Add ingredient
                </button>
            </form>
            {ingredientsList.length > 0 &&     
                <section>
                    <h2>Ingredients on hand:</h2>
                    <ul className="ingredients-list" aria-live="polite">{ingredientsList}</ul>
                    {ingredients.length > 3 && <div className="get-recipe-container">
                        <div>
                            <h3>Ready for a recipe?</h3>
                            <p>Generate a recipe from your list of ingredients.</p>
                        </div>
                        <button>Get a recipe</button>
                    </div>}
                </section>}
        </main>
    )
}