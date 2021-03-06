import { Routes, Route } from "react-router-dom";
import Author from "./pages/author";
import Book from "./pages/book/book";
import Category from "./pages/category";
import Login from "./pages/login/login";
import User from "./pages/user";

const App = () => {
  const isCheckLogin = () => {
    const getAccessToken = localStorage.getItem("accessToken");
    if (!getAccessToken) {
      return false;
    }
    return true;
  };
  return (
    <div>
      <Routes>
        <Route path="/authors" element={<Author />} />
        <Route path="/users" element={<User />} />
        <Route path="/books" element={isCheckLogin ? <Book /> : <Login />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
