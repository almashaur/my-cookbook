import React, { useState, useEffect } from "react";
import { getAllRecipes } from "../../../services/recipeService";

const RecipeFilter = (props) => {
  const propResult = props.cuisine?.name ? `${props.cuisine.name}` : "all";

  const [recipes, setRecipes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState(`${propResult}`);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Fetch recipes when the component mounts
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipes();
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

  return (
    <div className="container mt-4">
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
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => props.handleRecipeClick(recipe._id)}
                        />
                  </a>
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
  );
};

export default RecipeFilter;
