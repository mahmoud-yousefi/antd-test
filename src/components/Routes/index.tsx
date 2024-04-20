import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Category from "../../pages/Category";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Category />}></Route>
      <Route path="/:categoryId" element={<Category />}></Route>
    </Routes>
  );
};

export default AppRoutes;
