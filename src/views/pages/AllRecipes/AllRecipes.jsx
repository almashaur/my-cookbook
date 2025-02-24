import React, { useState, useEffect } from 'react';
import { getAllRecipes } from '../../../services/recipeService';

const RecipeFilter = (props) => {
    const propResult =  props.cuisine?.name ? (`${props.cuisine.name}`):("all");

  const [recipes, setRecipes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState(`${propResult}`);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Fetch recipes when the component mounts
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipes();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
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
        selectedCuisine === 'all' ||
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
    <div>
      <div className="mb-3">
        <label htmlFor="cuisineSelect" className="form-label">
          Cuisine
        </label>
        <select
          id="cuisineSelect"
          className="form-select"
          value={selectedCuisine}
          onChange={(e) => setSelectedCuisine(e.target.value)}
        >
          <option value="all">All</option>
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

      <div className="mb-3">
        <label htmlFor="searchInput" className="form-label">
          Search Recipes
        </label>
        <input
          id="searchInput"
          type="text"
          className="form-control"
          placeholder="Enter recipe name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div>
        {filteredRecipes.map((recipe) => (
          <div key={recipe._id} className="card mb-2">
            <div className="card-body">
              <h5 className="card-title">{recipe.recipeName}</h5>
              {recipe.cuisine && (
                <p className="card-text">
                  <small className="text-muted">{recipe.cuisine}</small>
                </p>
              )}
              {/* Render other recipe details as needed */}
            </div>
          </div>
        ))}
        {filteredRecipes.length === 0 && <p>No recipes found.</p>}
      </div>
    </div>
  );
};

export default RecipeFilter;
