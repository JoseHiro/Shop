import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import Login from "./pages/Login/Login";
import SignIn from "./pages/SignIn/SignIn";
import LandingPage from "./pages/LandingPage/LandingPage";
import Cart from "./pages/Cart/Cart";

// components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./pages/Footer/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/signin"} element={<SignIn />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/cart"} element={<Cart />} />
        <Route path={"/products"} element={<Products />} />
        <Route path={"/product/:id"} element={<Product />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
