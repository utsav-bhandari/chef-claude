import { useState } from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import {getRecipeMistral} from "../services/ai"

export default function Main() {
    const [ingredients, setIngredients] = useState(
        ["all the main spices", "pasta", "ground beef", "tomato paste"]
    );

    const [recipeShown, setRecipeShown] = useState(false)

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient");
        setIngredients(prevIngredientsList => [...prevIngredientsList, newIngredient]);
    }

    function toggleRecipeShown() {
        setRecipeShown(prevRecipeShown => !prevRecipeShown)
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
                <button>Add ingredient</button>
            </form>
            {ingredients.length > 0 && 
            <IngredientsList 
                ingredients={ingredients}
                toggleRecipeShown={toggleRecipeShown}
                />
            }
            {recipeShown && <ClaudeRecipe />}
        </main>
    )
}