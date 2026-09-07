import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import useFetch from "../hooks/useFetch";

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchFromUrl = searchParams.get("search") || "";

  const [search, setSearch] = useState(searchFromUrl);

  const searchRef = useRef(null);

  const {
    data: apiFoods,
    loading,
    error,
  } = useFetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian"
  );

  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const localFoods = [
      {
        id: 1,
        name: "Pizza",
        price: 299,
        rating: 4.5,
        image: "/images/task14-pizza.jpg",
        description: "Delicious cheesy pizza.",
      },
      {
        id: 2,
        name: "Burger",
        price: 199,
        rating: 4.3,
        image: "/images/task14-burger.jpg",
        description: "Juicy cheese burger.",
      },
      {
        id: 3,
        name: "Biryani",
        price: 349,
        rating: 4.7,
        image: "/images/task14-biryani.avif",
        description: "Flavorful chicken biryani.",
      },
      {
        id: 4,
        name: "Pasta",
        price: 249,
        rating: 4.4,
        image: "/images/task14-pasta.jpg",
        description: "Creamy delicious pasta.",
      },
      {
        id: 5,
        name: "Noodles",
        price: 179,
        rating: 4.2,
        image: "/images/task14-noodles.png",
        description: "Hot vegetable noodles.",
      },
      {
        id: 6,
        name: "Dessert",
        price: 149,
        rating: 4.6,
        image: "/images/task14-desserts.jpg",
        description: "Sweet tasty dessert.",
      },
    ];

    setFoods(localFoods);
  }, [apiFoods]);

  const handleSearch = (event) => {
    const value = event.target.value;

    setSearch(value);

    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const focusSearch = () => {
    searchRef.current.focus();
  };

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="section">
      <h1>Our Menu 🍽️</h1>

      <div className="search-container">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={handleSearch}
        />

        <button onClick={focusSearch}>
          Focus Search
        </button>
      </div>

      {loading && <p>Loading API data...</p>}

      {error && (
        <p className="error">
          API Error: {error}
        </p>
      )}

      {!loading && filteredFoods.length === 0 && (
        <p>No food found.</p>
      )}

      <div className="food-grid">
        {filteredFoods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
          />
        ))}
      </div>
    </section>
  );
}

export default Menu;