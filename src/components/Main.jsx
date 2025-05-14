import { useState, useEffect } from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import {getRecipeFromModel} from "../services/ai"

export default function Main() {
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);


    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient");
        if (newIngredient) setIngredients(prevIngredientsList => [...prevIngredientsList, newIngredient]);
    }

    async function getRecipe() {
        if (isProcessing) return;
        setIsProcessing(true);
        const MarkdownRecipe = await getRecipeFromModel(ingredients);
        console.log(MarkdownRecipe)
        setRecipe(MarkdownRecipe);
        setIsProcessing(false);
    }

    useEffect(() => {
        if (recipe) {
            const recipeSection = document.querySelector(".suggested-recipe-container");
            if (recipeSection) {
                setTimeout(() => {
                    recipeSection.scrollIntoView({ behavior: "smooth" });
                }, 50);
            }
        }
    }, [recipe]);

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

            {ingredients.length < 4 && (
            <p className="ingredient-requirement-message">
                The chef needs at least 4 ingredients.
            </p>
            )}

            {ingredients.length > 0 && 
            <IngredientsList 
                ingredients={ingredients}
                getRecipe={getRecipe}
                isProcessing={isProcessing}
                />
            }
            {recipe && <ClaudeRecipe recipe={recipe}/>}
        </main>
    )
}