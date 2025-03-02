# 🍽️ My Cookbook App

## 📸 Screenshot/Logo
![App Screenshot](https://img.icons8.com/?size=100&id=oj3YGxooY6PN&format=png&color=000000)  

## 📝 About the App
**My Cookbook App** is a simple and user-friendly web application designed to help users store, organize, and access their favorite recipes. The app allows users to add, edit, delete, and view recipes in an intuitive interface. Built with the MERN stack, it ensures seamless CRUD operations for managing recipe data.
## Project Structure

### Frontend


```
my-cookbook/
├── node_modules/
├── public
├── src/
│ ├── contexts/
│ │ └── UserContext.jsx
│ ├── services/
│ │ ├── authService.js
│ │ ├── recipeService.js
│ │ └── userService.js
├── components/
│ │ ├── Footer/
│ │ │ └── Footer.css
│ │ │ └── Footer.jsx
│ │ ├── Navbar/
│ │ │ └── Navbar.jsx
│ │ ├── forms/
│ │ │ ├── addRecipe/
│ │ │ │ └── addRecipe.jsx
│ │ │ ├── DropDownList/
│ │ │ │ └── DropDownList.jsx
│ │ │ ├── EditRecipe/
│ │ │ │ └── EditRecipe.jsx
│ │ │ ├── LogInForm/
│ │ │ │ └── LogInForm.jsx
│ │ │ ├── RegisterForm/
│ │ │ │ └── RegisterForm.jsx
│ │ │ ├── pages/
│ │ │ ├── AboutPage/
│ │ │ │ └── AboutPage.jsx
│ │ │ ├── AllRecipes/
│ │ │ │ └── AllRecipes.jsx
│ │ │ ├── HomePage/
│ │ │ │ └── HomePage.jsx
│ │ │ ├── MyRecipes/
│ │ │ │ └── MyRecipes.jsx
│ │ │ ├── RecipeDetails/
│ │ │ │ └── RecipeDetails.jsx
│ ├── App.css
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vercel.json
└── vite.config.js
```


### Backend


```
├── controllers/
│ ├── auth.js
│ ├── recipes.js
│ └── users.js
├── middleware/
├── models/
│ ├── recipe.js
│ └── user.js
├── node_modules/
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```
---



---


## 🚀 Getting Started
To use the app, follow these steps:

1. **Visit the deployed app**: [Live Demo](link-to-deployed-app)
2. **Explore the project**:
   - Frontend Repository: [GitHub Repo](https://github.com/almashaur/my-cookbook)
   - Backend Repository: [GitHub Repo](https://github.com/almashaur/my-cookbook-backend)
## Installation

1. Clone the repositories:

    ```bash
    git clone https://github.com/almashaur/my-cookbook.git
    git clone https://github.com/almashaur/my-cookbook-backend.git
    ```

2. Install dependencies for both frontend and backend:

    ```bash
    cd my-cookbook
    npm install
    cd ../my-cookbook-backend
    npm install
    ```

3. Start the development servers:

    - Frontend:

        ```bash
        cd my-cookbook
        npm start
        ```

    - Backend:

        ```bash
        cd my-cookbook-backend
        node server.js
        ```

    The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5173/`.

## Features

- **User Authentication**: Secure sign-in and sign-up functionality.
- **Recipe Management**: Owner of the recipes only can edit and delete their recieps.
- **Responsive Design**: The application is responsive and works on various devices.

## Components

### AddRecipe

The `addRecipe` component allows users to create new recipes. It includes form validation and error handling.

### EditRecipe

The `EditRecipe` component allows component allows users to edit thier own recipes. It includes form validation and error handling. 

## Services

### recipeService

The `recipesService` contains functions to interact with the product-related API endpoints.

- `createRecipe(recipe)`: Creates a new recipe.
- `updateRecipe(recipeId, recipe)`: Updates an existing recipe.
- `deleteRecipe(recipeId)`: Deletes a recipe.
- `getAllRecipes`: returns all recipes.
- `getUserRecipes`: returns all recipes for a specific user.
- `getRecipebyId`: returns a specific recipe.



### authService

The `authService` handles user authentication.

- `login(credentials)`: Authenticates a user.
- `register(user)`: Registers a new user.


## 📜 Attributions
This project uses the following external resources:
- [React](https://reactjs.org/) - Frontend Framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Express.js](https://expressjs.com/) - Backend Framework
- [Node.js](https://nodejs.org/) - Runtime Environment
- [Bootstrap](https://getbootstrap.com/) - UI Styling

## 🛠️ Technologies Used
The app is built using the following technologies:
- **Frontend**: React, JavaScript, HTML, CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **State Management**: React Context API
- **Authentication**: JWT (if applicable)

## 🔮 Next Steps
Planned future enhancements include:
- Increase in recipe categorization (e.g., vegan, desserts, quick meals)
- Advanced search and filtering options (as in not just the cuisine)
- Meal planning and grocery list features

## 🔗 Backend README Link
The backend README file contains more details about the backend setup. Check it out [here](https://github.com/almashaur/my-cookbook-backend/blob/main/README.md).
