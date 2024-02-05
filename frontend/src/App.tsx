import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/products"} element={<Products />} />
        <Route path={"/product/:id"} element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
