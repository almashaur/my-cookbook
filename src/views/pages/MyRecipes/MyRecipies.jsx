import React, { useState, useEffect, useContext } from "react";
import { getUserRecipes, deleteRecipe } from "../../../services/recipeService";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

const MyRecipies = (props) => {
  const propResult = props.cuisine?.name ? `${props.cuisine.name}` : "all";

  const { user } = useContext(UserContext);
  const [recipes, setRecipes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState(`${propResult}`);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const navigate = useNavigate();

  // Fetch recipes when the component mounts
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getUserRecipes(user._id);
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  // Update filtered recipes whenever recipes, selectedCuisine, or searchQuery changes
  useEffect(() => {
    const lowerCaseSearch = searchQuery.toLowerCase();
    const filtered = recipes.filter((recipe) => {
      // Check cuisine filter
      const matchesCuisine =
        selectedCuisine === "all" ||
        recipe.cuisine?.toLowerCase() === selectedCuisine.toLowerCase();
      // Check recipe name loose search (case-insensitive substring match)
      const matchesSearch = recipe.recipeName
        .toLowerCase()
        .includes(lowerCaseSearch);
      return matchesCuisine && matchesSearch;
    });

    setFilteredRecipes(filtered);
  }, [recipes, selectedCuisine, searchQuery]);

  const handleDelete = async (id) => {
    try {
      await deleteRecipe(id);
      const data = await getUserRecipes(user._id);
      setRecipes(data);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <>
      <div className="px-4 py-5 my-5 text-center">
        <img
          className="d-block mx-auto mb-4"
          src="/icons8-cookbook-50.png"
          alt=""
          width="72"
          height="57"
        />
        <h1 className="display-5 fw-bold">Welcome back, {user.username}</h1>
        <div className="col-lg-6 mx-auto">
          {/* Search and Dropdown */}
          <div className="row mb-4 align-items-end">
            <div className="col-md-8 mb-2 mb-md-0">
              <input
                type="text"
                id="search"
                className="form-control"
                placeholder="Type recipe name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 gap-3"
                onClick={() => navigate("/addrecipes")}
              >
                Add Recipe
              </button>
            </div>
          </div>
        </div>
        <div className="container mt-4">
          <div className="col-md-4">
            <select
              id="cuisineSelect"
              className="form-select"
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
            >
              <option value="all">All Cuisines</option>
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
        </div>

        {/* Recipe Cards */}
        <div className="row">
          {filteredRecipes.map((recipe) => (
            <div key={recipe._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm border">
                <img
                  src={recipe.image || "example.png"}
                  className="card-img-top"
                  alt={recipe.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{recipe.recipeName}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {recipe.cuisine}
                  </h6>
                  <p className="card-text">Level: {recipe.level}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <a href={`/recipedetails/${recipe._id}`} data-discover="true">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-success"
                      >
                        View more...
                      </button>
                    </a>
                    <div>
                      <a href={`/editrecipes/${recipe._id}`} data-discover="true">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-warning"
                        >
                          Edit
                        </button>
                      </a>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger m-2"
                        onClick={() => handleDelete(recipe._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredRecipes.length === 0 && (
            <div className="col-12">
              <p className="text-center">No recipes found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyRecipies;
