import ReactMarkdown from "react-markdown"

export default function ClaudeRecipe(props) {
    return (
        <section className="suggested-recipe-container">
            <h2>Chef Claude recommends:</h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
            <button onClick={() => props.setRecipe("")} className="rm-ingredient-btn rm-all-btn">Clear recipe</button>

        </section>
    )
}