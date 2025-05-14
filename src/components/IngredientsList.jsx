export default function IngredientsList(props) {
    const ingredientsList = props.ingredients.map((item, idx) => <li key={idx}>{item}</li>);
    const showGetRecipe = props.ingredients.length > 3;
    return (
        <section className="ingredients-list-container">
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsList}</ul>
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