import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/foodSlice";

function FoodCard({ food }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(food));
  };

  return (
    <div className="food-card">
      <img src={food.image} alt={food.name} />

      <div className="food-content">
        <h3>{food.name}</h3>

        <p className="rating">
          ⭐ {food.rating}
        </p>

        <p>{food.description}</p>

        <h3>₹{food.price}</h3>

        <div className="card-buttons">
          <Link to={`/food/${food.id}`}>
            View Details
          </Link>

          <button onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;