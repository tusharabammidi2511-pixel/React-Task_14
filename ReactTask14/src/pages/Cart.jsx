import { useSelector, useDispatch } from "react-redux";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/foodSlice";

function Cart() {
  const dispatch = useDispatch();

  const cart = useSelector(
    (state) => state.food.cart
  );

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  // Conditional Rendering
  if (cart.length === 0) {
    return (
      <section className="section empty-cart">
        <h1>Your Cart is Empty 🛒</h1>

        <p>
          Add some delicious food to your cart.
        </p>
      </section>
    );
  }

  return (
    <section className="section">
      <h1>Your Cart 🛒</h1>

      <div className="cart-container">
        {cart.map((item) => (
          <div
            className="cart-item"
            key={item.id}
          >
            <img
              src={item.image}
              alt={item.name}
            />

            <div>
              <h3>{item.name}</h3>

              <p>₹{item.price}</p>

              <div className="quantity">
                <button
                  onClick={() =>
                    dispatch(
                      decreaseQuantity(item.id)
                    )
                  }
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    dispatch(
                      increaseQuantity(item.id)
                    )
                  }
                >
                  +
                </button>
              </div>

              <button
                className="remove-button"
                onClick={() =>
                  dispatch(
                    removeFromCart(item.id)
                  )
                }
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <h2>Total: ₹{total}</h2>

        <button>
          Place Order
        </button>
      </div>
    </section>
  );
}

export default Cart;