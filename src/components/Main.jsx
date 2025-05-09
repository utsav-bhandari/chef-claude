import { useState } from "react";

export default function Main() {
    let [ingredients, setIngredients] = useState([]);
    let ingredientsList = ingredients.map(i => <li key={i}>{i}</li>);

    function submitIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredientsList => [...prevIngredientsList, newIngredient])
    }

    return (
        <main>
            <form action={submitIngredient} className="add-ingredient-form">
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
            <ul>
                {ingredientsList}
            </ul>
        </main>
    )
}