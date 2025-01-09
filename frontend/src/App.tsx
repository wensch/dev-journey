import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CreateCharacter from "./pages/CreateCharacter";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import MyCharacter from "./pages/MyCharacter";
import SingUp from "./pages/SingUp";
import MyPage from "./pages/MyPage";
import withAuth from "./withAuth";

const ProtectedMyPage = withAuth(MyPage);

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-character" element={<CreateCharacter />} />
        <Route path="/my-character" element={<MyCharacter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<SingUp />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/my-page" element={<ProtectedMyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
