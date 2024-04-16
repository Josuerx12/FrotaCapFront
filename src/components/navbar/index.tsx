import { useState } from "react";
import { BiLogIn } from "react-icons/bi";
import { FaBars, FaCar, FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = [
    {
      path: "/",
      name: "inicio",
    },
    {
      path: "/oficina",
      name: "oficina",
    },
    {
      path: "/frotas",
      name: "frotas",
    },
    {
      path: "/gestao",
      name: "gestão",
    },
    {
      path: "/solicitacoes",
      name: "solicitações",
    },
  ];

  const navigate = useNavigate();

  const pagePath = useLocation();

  return (
    <>
      <nav className="w-full h-28 px-4 z-30 fixed bg-neutral-800 flex items-center justify-between drop-shadow-lg">
        <div
          title="FrotasCAP - Pagina Inicial"
          className="flex gap-2 text-white items-center cursor-pointer hover:scale-105 duration-200 ease-linear bg-gradient-to-br to-gray-500 from-sky-500 p-2 drop-shadow-xl rounded-xl"
        >
          <h1 className="font-signature text-5xl font-bold  drop-shadow-lg">
            Frotascap
          </h1>
          <FaCar size={40} />
        </div>

        <ul className="hidden text-white text-lg md:flex items-center gap-3">
          {items.map(({ path, name }, i) => (
            <li
              key={i}
              onClick={() => navigate(path)}
              className={`cursor-pointer  relative hover:text-gray-300 hover:scale-105  tracking-wider before:absolute before:w-0 before:h-[1px] before:bg-white hover:before:w-full before:bottom-0 before:transition-all before:duration-200 before:ease-linear ${
                pagePath.pathname === path
                  ? "scale-105 text-gray-300"
                  : "scale-100 text-white"
              }`}
            >
              {name}
            </li>
          ))}
          <li className="flex gap-1 items-center cursor-pointer bg-gradient-to-br font-semibold transition-colors duration-300 ease-linear to-sky-900 from-sky-500 hover:bg-none hover:bg-sky-500 px-2 py-1 rounded-md tracking-wider">
            Login <BiLogIn />
          </li>
        </ul>

        <button
          type="button"
          className="text-white md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <FaTimes size={35} /> : <FaBars size={35} />}
        </button>
      </nav>

      <ul
        className={`fixed z-10 duration-300 transition-all ease-linear text-white text-3xl flex gap-6 flex-col h-screen justify-center items-center w-full bg-neutral-800 ${
          mobileOpen ? "top-0" : "-top-full"
        }`}
      >
        <li className="cursor-pointer hover:text-gray-300 tracking-wider">
          Incio
        </li>
        <li className="cursor-pointer hover:text-gray-300 tracking-wider">
          Oficina
        </li>
        <li className="cursor-pointer hover:text-gray-300 tracking-wider">
          Frotas
        </li>
        <li className="cursor-pointer hover:text-gray-300 tracking-wider">
          Gestão
        </li>
        <li className="cursor-pointer hover:text-gray-300 tracking-wider">
          Solicitações
        </li>

        <li className="cursor-pointer bg-gradient-to-br font-semibold transition-colors duration-300 ease-linear to-sky-400 from-blue-500 hover:bg-gradient-to-br hover:to-blue-500 hover:from-sky-400 px-2 py-1 rounded-md tracking-wider">
          Login
        </li>
      </ul>
    </>
  );
};

export { Navbar };
