import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addFood,
  updateFood,
  deleteFood,
} from "../store/foodSlice";

function Admin() {
  const dispatch = useDispatch();

  const foods = useSelector(
    (state) => state.food.foods
  );

  const [form, setForm] = useState({
    name: "",
    price: "",
    rating: "",
    description: "",
    image: "/images/pizza.jpg",
  });

  const [editingId, setEditingId] =
    useState(null);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]:
        event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.name ||
      !form.price ||
      !form.rating
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (editingId) {
      dispatch(
        updateFood({
          ...form,
          id: editingId,
          price: Number(form.price),
          rating: Number(form.rating),
        })
      );

      setEditingId(null);
    } else {
      dispatch(
        addFood({
          ...form,
          price: Number(form.price),
          rating: Number(form.rating),
        })
      );
    }

    setForm({
      name: "",
      price: "",
      rating: "",
      description: "",
      image: "/images/pizza.jpg",
    });
  };

  const handleEdit = (food) => {
    setEditingId(food.id);

    setForm({
      name: food.name,
      price: food.price,
      rating: food.rating,
      description: food.description,
      image: food.image,
    });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this food?"
    );

    if (confirmed) {
      dispatch(deleteFood(id));
    }
  };

  return (
    <section className="section">
      <h1>Admin Dashboard</h1>

      <form
        className="admin-form"
        onSubmit={handleSubmit}
      >
        <h2>
          {editingId
            ? "Update Food"
            : "Add New Food"}
        </h2>

        <input
          name="name"
          placeholder="Food name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="rating"
          type="number"
          step="0.1"
          placeholder="Rating"
          value={form.rating}
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId
            ? "Update Food"
            : "Add Food"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);

              setForm({
                name: "",
                price: "",
                rating: "",
                description: "",
                image: "/images/.jpg",
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>Food List</h2>

      <div className="admin-food-list">
        {foods.map((food) => (
          <div
            className="admin-food"
            key={food.id}
          >
            <img
              src={food.image}
              alt={food.name}
            />

            <div>
              <h3>{food.name}</h3>

              <p>₹{food.price}</p>

              <button
                onClick={() =>
                  handleEdit(food)
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  handleDelete(food.id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Admin;