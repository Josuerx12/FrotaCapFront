import { Navigate, Route, Routes } from "react-router-dom";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import { Home } from "./pages/home";
import Requests from "./pages/requests";
import { Flip, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useAuth } from "./store/useAuth";
import Admin from "./pages/admin";
import { useAuthWs } from "./store/useAuthWs";
import Workshop from "./pages/workshop";
import FrotasPage from "./pages/frotas";
import AuthPage from "./pages/login";

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
          path="/oficina"
          element={workshop ? <Workshop /> : <Navigate to="/solicitacoes" />}
        />
        <Route
          path="/frotas"
          element={
            user && user.frotas ? (
              <FrotasPage />
            ) : (
              <Navigate to="/solicitacoes" />
            )
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
              <AuthPage />
            )
          }
        />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
      <Footer />
    </main>
  );
};

export default App;
