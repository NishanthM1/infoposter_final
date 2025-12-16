import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Navbar } from "./components/Navbar";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SavedPage from "./pages/SavedPage";
import UsersPage from "./pages/UsersPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Header />
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
