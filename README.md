# Chef Claude - Recipe Generator

Welcome to **Chef Claude**, a React-based web application that allows users to input ingredients and get recipe suggestions powered by an AI model. Chef Claude is designed to provide users with an interactive and intuitive experience where they can add or remove ingredients, get recipe suggestions, and clear generated recipes—all in a clean, user-friendly interface.

Check out the live demo here: [Chef Claude Demo](https://claude-chef-demo.netlify.app/)

---

## Features

- **Add Ingredients**: Input a list of ingredients and submit them to receive a recipe suggestion.
- **AI-Powered Recipe Suggestions**: Based on the provided ingredients, an AI model will suggest a recipe in proper format.
- **Interactive UI**: 
  - Add, remove, and clear ingredients.
  - View suggested recipes with an option to clear them.
  - A smooth scroll behavior to focus on the generated recipe.

---

## How it Works

1. **User Input**: The user enters ingredients they have into the input field.
2. **Submit Ingredients**: As ingredients are added, the list grows. The AI will generate a recipe suggestion when the list has 4 or more ingredients.
3. **Recipe Generation**: The AI model processes the list and returns a recipe suggestion in markdown format, which is then displayed in the UI.
4. **Smooth Scroll**: When the recipe is generated, the page will automatically scroll down to the recipe section for easy viewing.
5. **Clear Recipe**: Users can clear the recipe suggestion if they want to start over or try a new set of ingredients.

---

## Tech Stack

* **React**: Frontend framework for building the UI.
* **JavaScript (ES6)**: For modern, efficient JavaScript functionality.
* **Netlify**: Hosting and deployment platform for the app.
* **AI Model**: The backend GPT-based AI model generates recipe suggestions based on the ingredients provided by the user.

---

## Contribution

Feel free to fork the repository, make changes, and submit pull requests. If you find bugs or want to request a feature, please open an issue.

---

## License

This project is open-source and available under the [MIT License](LICENSE).
