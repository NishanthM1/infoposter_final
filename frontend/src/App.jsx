import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SavedPage from "./pages/SavedPage";
import PrivateRoute from "./components/PrivateRoute";
import MyPostsPage from "./pages/MyPostsPage";

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/myposts" element={<MyPostsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
