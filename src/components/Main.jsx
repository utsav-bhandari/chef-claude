import { useState } from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import {getRecipeFromMistral} from "../services/ai"

export default function Main() {
    const [ingredients, setIngredients] = useState([]);

    const [recipe, setRecipe] = useState("")

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient");
        setIngredients(prevIngredientsList => [...prevIngredientsList, newIngredient]);
    }

    async function getRecipe() {
        const MarkdownRecipe = await getRecipeFromMistral(ingredients)
        setRecipe(MarkdownRecipe)
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
                getRecipe={getRecipe}
                />
            }
            {recipe && <ClaudeRecipe recipe={recipe}/>}
        </main>
    )
}