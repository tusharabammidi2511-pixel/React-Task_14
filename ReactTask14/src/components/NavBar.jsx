import { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const cart = useSelector((state) => state.food.cart);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src="../public/images/task14-logo.png" alt="FoodNest Logo"  />
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/menu">Menu</Link>

        <Link to="/cart">
          Cart 🛒 ({cartCount})
        </Link>

        <Link to="/login">Login</Link>

        <Link to="/admin">Admin</Link>

        <button onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;