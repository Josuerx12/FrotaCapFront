import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import { Home } from "./pages/home";
import Requests from "./pages/requests";
import { Bounce, ToastContainer } from "react-toastify";
import Login from "./pages/login";

const App = () => {
  return (
    <main className="flex justify-between flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solicitacoes" element={<Requests />} />
        <Route path="/login" element={<Login />} />
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
