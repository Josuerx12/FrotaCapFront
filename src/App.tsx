import { Navigate, Route, Routes } from "react-router-dom";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import { Home } from "./pages/home";
import Requests from "./pages/requests";
import { Bounce, ToastContainer } from "react-toastify";
import Login from "./pages/login";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useAuth } from "./store/useAuth";

const App = () => {
  const { getUser, user } = useAuth();

  const token = Cookies.get("refreshToken");

  useEffect(() => {
    getUser();
  }, [token]);

  return (
    <main className="flex justify-between flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/solicitacoes"
          element={user ? <Requests /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/solicitacoes" /> : <Login />}
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Footer />
    </main>
  );
};

export default App;
