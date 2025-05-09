import { useState } from "react";

export default function Main() {
    let [ingredients, setIngredients] = useState([]);
    let ingredientsList = ingredients.map(i => <li key={i}>{i}</li>);

    function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredientsList => [...prevIngredientsList, newIngredient])
        console.log(ingredientsList)
    }

    return (
        <main>
            <form onSubmit={handleSubmit} className="add-ingredient-form">
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