import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/foodSlice";

function FoodDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const foods = useSelector(
    (state) => state.food.foods
  );

  const food = foods.find(
    (item) => item.id === Number(id)
  );

  // Conditional Rendering
  if (!food) {
    return (
      <section className="section">
        <h2>Food not found ❌</h2>

        <Link to="/menu">
          Back to Menu
        </Link>
      </section>
    );
  }

  return (
    <section className="details">
      <img
        src={food.image}
        alt={food.name}
      />

      <div>
        <h1>{food.name}</h1>

        <p>⭐ Rating: {food.rating}</p>

        <p>{food.description}</p>

        <h2>₹{food.price}</h2>

        <button
          onClick={() =>
            dispatch(addToCart(food))
          }
        >
          Add to Cart
        </button>

        <br />

        <Link to="/menu">
          ← Back to Menu
        </Link>
      </div>
    </section>
  );
}

export default FoodDetails;