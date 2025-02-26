import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";
import DropDownList from "../../forms/DropDownList/DropDownList";
import { createRecipe, updateRecipe } from "../../../../services/recipeService";

const AddRecipeForm = ({ recipe }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // Early return if user is not logged in
  if (!user) {
    return (
      <p className="text-center mt-5">Please log in to add or edit a recipe.</p>
    );
  }

  const [message, setMessage] = useState("");
  const [selectedTools, setSelectedTools] = useState([]);

  // Use user._id from your UserContext (which returns decoded.payload)
  const initialState = {
    recipeName: "",
    ingredients: [],
    instructions: "",
    level: "",
    cuisine: "",
    tools: [],
    image: "",
    serves: 1,
    owner: user._id, // user is now guaranteed to exist
  };

  const ingredientInitialState = {
    ingredientName: "",
    amount: "",
    alternatives: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [ingredientList, setIngredientList] = useState([
    ingredientInitialState,
  ]);

  useEffect(() => {
    if (recipe) {
      const formattedTools = recipe.tools.map((tool) => ({
        value: tool,
        label: tool,
      }));
      setSelectedTools(formattedTools);
      setFormData({
        recipeName: recipe.recipeName,
        level: recipe.level,
        cuisine: recipe.cuisine,
        owner: recipe.owner,
        image: recipe.image,
        serves: recipe.serves || 1,
        instructions: recipe.instructions,
        tools: recipe.tools,
        ingredients: recipe.ingredients,
      });
      setIngredientList(recipe.ingredients || [ingredientInitialState]);
    }
  }, [recipe]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMessage("");
    setFormData({
      ...formData,
      [name]: name === "serves" ? Number(value) : value,
    });
  };

  const handleIngredientChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...ingredientList];
    list[index][name] = value;
    setIngredientList(list);
    setFormData({ ...formData, ingredients: list });
  };

  const handleIngredientAdd = () => {
    setIngredientList([...ingredientList, ingredientInitialState]);
  };

  const handleIngredientRemove = (index) => {
    const list = [...ingredientList];
    list.splice(index, 1);
    setIngredientList(list);
    setFormData({ ...formData, ingredients: list });
  };

  const handleToolsChange = (selectedOptions) => {
    const toolsArray = selectedOptions.map((option) => option.value);
    setSelectedTools(selectedOptions);
    setFormData({ ...formData, tools: toolsArray });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (recipe) {
        await updateRecipe(recipe._id, formData, {
          headers: { "Cache-Control": "no-cache" },
        });
        navigate(`/recipedetails/${recipe._id}`);
      } else {
        await createRecipe(formData, {
          headers: { "Cache-Control": "no-cache" },
        });
        navigate("/allrecipes");
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <main className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow p-4">
              <h2 className="text-center mb-4">
                {recipe ? "Edit Recipe" : "Add Recipe"}
              </h2>
              {message && <div className="alert alert-danger">{message}</div>}
              <form autoComplete="off" onSubmit={handleSubmit}>
                {/* Owner (readonly) */}
                <div className="mb-3">
                  <label className="form-label">Owner</label>
                  <input
                    type="text"
                    className="form-control"
                    value={user.username}
                    disabled
                  />
                </div>
                {/* Recipe Name */}
                <div className="mb-3">
                  <label className="form-label">Recipe Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="recipeName"
                    value={formData.recipeName}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Level */}
                <div className="mb-3">
                  <label className="form-label">Level</label>
                  <select
                    className="form-select"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>
                {/* Cuisine */}
                <div className="mb-3">
                  <label className="form-label">Cuisine</label>
                  <select
                    className="form-select"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Cuisine</option>
                    <option value="Italian">Italian</option>
                    <option value="Mediterranean">Mediterranean</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Indian">Indian</option>
                    <option value="Thai">Thai</option>
                    <option value="American">American</option>
                    <option value="French">French</option>
                    <option value="Japanese">Japanese</option>
                  </select>
                </div>
                {/* Tools */}
                <div className="mb-3">
                  <label className="form-label">Tools</label>
                  <DropDownList
                    selectedOptions={selectedTools}
                    setSelectedOptions={setSelectedTools}
                    onChange={handleToolsChange}
                  />
                </div>
                {/* Image URL */}
                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Serves */}
                <div className="mb-3">
                  <label className="form-label">Serves</label>
                  <input
                    type="number"
                    className="form-control"
                    name="serves"
                    min="1"
                    value={formData.serves}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Ingredients */}
                <h4>Ingredients</h4>
                {ingredientList.map((ingredient, index) => (
                  <div key={index} className="mb-2 d-flex align-items-center">
                    <input
                      type="text"
                      name="ingredientName"
                      placeholder="Ingredient Name"
                      className="form-control me-2"
                      value={ingredient.ingredientName}
                      onChange={(e) => handleIngredientChange(e, index)}
                      required
                    />
                    <input
                      type="text"
                      name="amount"
                      placeholder="Amount"
                      className="form-control me-2"
                      value={ingredient.amount}
                      onChange={(e) => handleIngredientChange(e, index)}
                      required
                    />
                    <input
                      type="text"
                      name="alternatives"
                      placeholder="Alternative"
                      className="form-control me-2"
                      value={ingredient.alternatives}
                      onChange={(e) => handleIngredientChange(e, index)}
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleIngredientRemove(index)}
                      >
                        X
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary mb-3"
                  onClick={handleIngredientAdd}
                >
                  Add Ingredient
                </button>
                {/* Instructions */}
                <div className="mb-3">
                  <label className="form-label">Instructions</label>
                  <textarea
                    className="form-control"
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    required
                    rows="5"
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  {recipe ? "Update Recipe" : "Add Recipe"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddRecipeForm;
