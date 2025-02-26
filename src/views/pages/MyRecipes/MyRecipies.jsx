import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getUserRecipes, deleteRecipe } from "../../../services/recipeService";
import { UserContext } from "../../../context/UserContext";

const MyRecipies = (props) => {
  const initialCuisine = props.cuisine?.name ? props.cuisine.name : "all";
  const { user } = useContext(UserContext);
  const [recipes, setRecipes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState(initialCuisine);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Fetch user's recipes when component mounts or when user changes
  useEffect(() => {
    if (user && user._id) {
      const fetchRecipes = async () => {
        try {
          const data = await getUserRecipes(user._id);
          setRecipes(data);
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
      };
      fetchRecipes();
    }
  }, [user]);

  // Filter recipes based on search query and selected cuisine
  useEffect(() => {
    const lowerCaseSearch = searchQuery.toLowerCase();
    const filtered = recipes.filter((recipe) => {
      const matchesCuisine =
        selectedCuisine === "all" ||
        recipe.cuisine?.toLowerCase() === selectedCuisine.toLowerCase();
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
    <div className="container my-5">
      {/* Profile Header */}
      <div className="text-center mb-5">
        <img
          className="d-block mx-auto mb-4"
          src="/icons8-cookbook-50.png"
          alt="Cookbook Icon"
          width="72"
          height="57"
        />
        <h1 className="display-5 fw-bold">Welcome back, {user?.username}</h1>

        {/* Search and Filter */}
        <div className="row justify-content-center mt-4">
          <div className="col-md-8 mb-3">
            <input
              type="text"
              id="search"
              className="form-control"
              placeholder="Search your recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
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

        {/* Add Recipe Button */}
        <div className="row justify-content-center">
          <div className="col-md-4">
            <Link to="/addrecipes" className="btn btn-primary btn-lg">
              Add Recipe
            </Link>
          </div>
        </div>
      </div>

      {/* Recipe Cards */}
      <div className="row">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm border">
                <img
                  src={recipe.image || "example.png"}
                  className="card-img-top"
                  alt={recipe.recipeName}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{recipe.recipeName}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {recipe.cuisine}
                  </h6>
                  <p className="card-text">Level: {recipe.level}</p>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <Link
                      to={`/recipedetails/${recipe._id}`}
                      className="btn btn-sm btn-outline-success"
                    >
                      View More...
                    </Link>
                    <div>
                      <Link
                        to={`/editrecipes/${recipe._id}`}
                        className="btn btn-sm btn-outline-warning me-2"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(recipe._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center">No recipes found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecipies;
