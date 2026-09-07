import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FoodCard from "../components/FoodCard";

function Home() {
  const foods = useSelector((state) => state.food.foods);

  return (
    <>
      <section className="hero">
        <div>
          <h1>Delicious Food at Your Doorstep 🍕</h1>
          <p>
            Order your favorite food quickly and easily with ReactFoodNest.
          </p>

          <Link to="/menu" className="hero-button">
            Explore Menu
          </Link>
        </div>
      </section>

      <section className="section">
        <h2>Popular Foods</h2>

        <div className="food-grid">
          {foods.slice(0, 6).map((food) => (
            
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;