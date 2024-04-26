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
import Admin from "./pages/admin";
import { useAuthWs } from "./store/useAuthWs";
import LoginWs from "./pages/loginWs";

const App = () => {
  const { getUser, user } = useAuth();
  const { getWs, workshop } = useAuthWs();

  const userToken = Cookies.get("refreshToken");
  const workshopToken = Cookies.get("workshopToken");

  useEffect(() => {
    getUser();
  }, [userToken]);
  useEffect(() => {
    getWs();
  }, [workshopToken]);

  return (
    <main className="flex justify-between flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/solicitacoes"
          element={
            user ? (
              <Requests />
            ) : workshop ? (
              <Navigate to="/oficina" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/gestao"
          element={
            user && user.admin ? <Admin /> : <Navigate to="/solicitacoes" />
          }
        />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/solicitacoes" />
            ) : workshop ? (
              <Navigate to="/oficina" />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/login/ws"
          element={
            user || workshop ? <Navigate to="/solicitacoes" /> : <LoginWs />
          }
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
