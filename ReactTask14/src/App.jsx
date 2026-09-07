import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import ThemeProvider, {
  ThemeContext,
} from "./context/ThemeContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import FoodDetails from "./pages/FoodDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

function Application() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app ${theme}-theme`}>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route
            path="/food/:id"
            element={<FoodDetails />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />

          <Route
            path="*"
            element={
              <section className="section">
                <h1>404 - Page Not Found</h1>
              </section>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Application />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;