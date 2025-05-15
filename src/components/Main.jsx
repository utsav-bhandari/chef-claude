import { useState, useEffect, useRef } from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import {getRecipeFromModel} from "../services/ai"

export default function Main() {
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    
    const recipeSection = useRef(null)

    useEffect(() => {
        if (recipe && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [recipe]);

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
                setIngredients={setIngredients}
                getRecipe={getRecipe}
                isProcessing={isProcessing}
                />
            }
            {recipe && <ClaudeRecipe recipe={recipe} setRecipe={setRecipe} recipeSection={recipeSection}/>}
        </main>
    )
}