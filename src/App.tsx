import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import { Home } from "./pages/home";
import Requests from "./pages/requests";

const App = () => {
  return (
    <main className="flex justify-between flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solicitacoes" element={<Requests />} />
      </Routes>
      <Footer />
    </main>
  );
};

export default App;
