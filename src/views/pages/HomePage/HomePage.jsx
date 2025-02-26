import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { Link } from "react-router-dom";

const cuisines = [
  {
    name: "Italian",
    description:
      "Savor the rich traditions of Italy – handmade pastas, classic pizzas, and a dash of ‘la dolce vita’ in every bite.",
    image: "/italian.png",
  },
  {
    name: "Mediterranean",
    description:
      "Experience fresh, wholesome flavors from sun-kissed coasts – think olive oil, vibrant herbs, and a light, healthy twist.",
    image: "/mediterranean.png",
  },
  {
    name: "Chinese",
    description:
      "Delight in the art of balance – a fusion of sweet, savory, and tangy tastes that have defined centuries of culinary mastery.",
    image: "/chinese.png",
  },
  {
    name: "Mexican",
    description:
      "Spice up your day with bold, colorful flavors – from sizzling tacos to zesty enchiladas, every dish is a fiesta.",
    image: "/mexican.png",
  },
  {
    name: "Indian",
    description:
      "Immerse yourself in a tapestry of spices – aromatic curries, rich gravies, and a burst of flavor in every mouthful.",
    image: "/indian.png",
  },
  {
    name: "Thai",
    description:
      "Discover the perfect harmony of sweet, sour, salty, and spicy – each dish is a vibrant journey for your senses.",
    image: "/thai.png",
  },
  {
    name: "American",
    description:
      "Enjoy a diverse culinary adventure – from classic comfort foods to innovative twists that capture the spirit of modern America.",
    image: "/american.png",
  },
  {
    name: "French",
    description:
      "Indulge in elegance and tradition – experience refined techniques, exquisite flavors, and a taste of culinary art.",
    image: "/french.png",
  },
  {
    name: "Japanese",
    description:
      "Embrace simplicity and precision – fresh ingredients, delicate flavors, and a minimalist approach that highlights every nuance.",
    image: "/japanese.png",
  },
];

const Dashboard = (props) => {
  const { user } = useContext(UserContext);

  return (
    <main>
      {/* Hero Section */}
      <div className="px-4 py-5 text-center rounded-3 shadow-lg">
        <img
          className="d-block mx-auto mb-4"
          src="/icons8-cookbook-50.png"
          alt="Cookbook Icon"
          width="72"
          height="57"
        />
        <h1 className="display-5 fw-bold">My Cookbook</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            A place to share and save recipes, learn new cuisines, and connect
            with others who share your passion for food.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/allrecipes">
              <button type="button" className="btn btn-info btn-lg px-4 gap-3">
                View All Recipes
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Cuisine Cards */}
      <section className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {cuisines.map((cuisine, index) => (
              <div className="col" key={index}>
                <div className="card shadow-sm h-100">
                  <img
                    className="card-img-top"
                    src={cuisine.image}
                    alt={`${cuisine.name} cuisine`}
                    width="100%"
                    height="225"
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{cuisine.name}</h5>
                    <p className="card-text">{cuisine.description}</p>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <Link to="/allrecipes">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => props.handleCuisineClick(cuisine)}
                        >
                          Go to Cuisine
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
