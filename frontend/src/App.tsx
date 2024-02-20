import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import Login from "./pages/Login/Login";
import SignIn from "./pages/SignIn/SignIn";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={"/signin"} element={<SignIn />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/products"} element={<Products />} />
        <Route path={"/product/:id"} element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
