import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foods: [
    {
      id: 1,
      name: "Pizza",
      price: 299,
      rating: 4.5,
      image: "/images/task14-pizza.jpg",
      description:
        "Cheesy pizza loaded with fresh vegetables and delicious toppings.",
    },
    {
      id: 2,
      name: "Burger",
      price: 199,
      rating: 4.3,
      image: "/images/task14-burger.jpg",
      description:
        "Juicy burger prepared with fresh vegetables, cheese and a soft bun.",
    },
    {
      id: 3,
      name: "Biryani",
      price: 349,
      rating: 4.7,
      image: "/images/task14-biryani.avif",
      description:
        "Aromatic and flavorful biryani prepared with delicious spices.",
    },
    {
      id: 4,
      name: "Pasta",
      price: 249,
      rating: 4.4,
      image: "/images/task14-pasta.jpg",
      description:
        "Creamy pasta prepared with fresh ingredients and delicious sauce.",
    },
    {
      id: 5,
      name: "Noodles",
      price: 179,
      rating: 4.2,
      image: "/images/task14-noodles.png",
      description:
        "Hot and tasty noodles prepared with fresh vegetables.",
    },
    {
      id: 6,
      name: "Dessert",
      price: 149,
      rating: 4.6,
      image: "/images/task14-desserts.jpg",
      description:
        "Sweet and delicious dessert for the perfect ending to your meal.",
    },
  ],

  cart: [],
};

const foodSlice = createSlice({
  name: "food",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.id !== action.payload
      );
    },

    increaseQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  addFood,
  updateFood,
  deleteFood,
} = foodSlice.actions;

export default foodSlice.reducer;