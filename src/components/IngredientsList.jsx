export default function IngredientsList(props) {
    const ingredientsList = props.ingredients.map(
        (item, idx) =>
            <li key={idx}>
                <button
                    className="rm-ingredient-btn"
                    onClick={() => removeIngredient(idx)}
                    title="Remove ingredient"
                >
                    X
                </button>
                {item}
            </li>
        );
    
    const showGetRecipe = props.ingredients.length > 3;

    function removeIngredient(idx) {
        // for convenience: -1 means user pressed clear all
        if (idx === -1) {
            props.setIngredients([])
            return
        }
        props.setIngredients(prevIngredientsList => 
            prevIngredientsList.filter((_, i) => idx !== i)
        )
    }

    return (
        <section className="ingredients-list-container">
            <div className="ingredients-list-header">
                <h2>Ingredients on hand:</h2>
                <button onClick={() => removeIngredient(-1)} className="rm-ingredient-btn rm-all-btn">Clear all</button>
            </div>
            <ul className="ingredients-list" aria-live="polite">{ingredientsList}</ul>
            {/* <button className="clear-all-ingredients">Clear all</button> */}
            <div className={`get-recipe-container${showGetRecipe ? ' visible' : ''}`}>
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button
                onClick={props.getRecipe}
                disabled={props.isProcessing}
                >
                    {props.isProcessing ? "Processing..." : "Get a recipe"}
                </button>
            </div>
        </section>
    )
}