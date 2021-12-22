import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Container from "./components/Main";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Auth from "./features/Auth";
import Test from "./test";
import TestServer from "./testServer";

function App() {
  const navigate = useNavigate();
  const loginInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loginInUser.id;
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <div className="App flex flex-col min-h-screen h-full bg-slate-500">
      <Header />

      <Routes>
        <Route path="/login" element={<Auth type="login" />} />
        <Route path="/register" element={<Auth type="register" />} />
        <Route path="/server" element={<TestServer />} />
        <Route element={<ProtectedRoutes isLogged={isLoggedIn} />}>
          <Route path="/test" element={<Test />} />
          <Route path="/" element={<Container type="home" />} />
          <Route path="/photo" element={<Container type="photo" />} />
          <Route path="/profile" element={<Container type="profile" />} />
          <Route path="/people" element={<Container type="people" />} />
          <Route path="/setting" element={<Container type="setting" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
