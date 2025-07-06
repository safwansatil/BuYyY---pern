import { useThemeStore } from "./store/useThemeStore";
import Navbar from "./components/Navbar";
import CartModal from "./components/CartModal";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

import { Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";

function App() {
  const { theme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>

      <CartModal />
      <Toaster />
    </div>
  );
}

export default App;
