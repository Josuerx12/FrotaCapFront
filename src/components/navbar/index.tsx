import { useState } from "react";
import {
  FaBars,
  FaCar,
  FaSignInAlt,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/useAuth";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  const pagePath = useLocation();

  const { user, logout } = useAuth();

  return (
    <>
      <nav className="w-full h-28 px-4 z-30 fixed bg-neutral-800 flex items-center justify-between drop-shadow-lg">
        <div
          title="FrotasCAP - Pagina Inicial"
          className="flex gap-2 text-white items-center cursor-pointer hover:scale-105 bg-size-200 bg-pos-0 hover:bg-pos-100 bg-gradient-to-br to-gray-500 via-sky-500 from-gray-500 duration-300 ease-linear transition-all p-2 drop-shadow-xl rounded-xl"
        >
          <h1 className="font-signature text-5xl font-bold  drop-shadow-lg">
            Frotascap
          </h1>
          <FaCar size={40} />
        </div>

        <ul className="hidden text-white text-lg md:flex items-center gap-3">
          <li
            onClick={() => navigate("/")}
            className={`cursor-pointer capitalize relative hover:text-gray-300 hover:scale-105  tracking-wider before:absolute before:w-0 before:h-[1px] before:bg-white hover:before:w-full before:bottom-0 before:transition-all before:duration-200 before:ease-linear ${
              pagePath.pathname === "/"
                ? "scale-105 text-gray-300"
                : "scale-100 text-white"
            }`}
          >
            Inicio
          </li>
          {user && (
            <li
              onClick={() => navigate("/solicitacoes")}
              className={`cursor-pointer capitalize relative hover:text-gray-300 hover:scale-105  tracking-wider before:absolute before:w-0 before:h-[1px] before:bg-white hover:before:w-full before:bottom-0 before:transition-all before:duration-200 before:ease-linear ${
                pagePath.pathname === "/solicitacoes"
                  ? "scale-105 text-gray-300"
                  : "scale-100 text-white"
              }`}
            >
              Solicitações
            </li>
          )}
          {user && user.position.includes("admin") && (
            <li
              onClick={() => navigate("/gestao")}
              className={`cursor-pointer capitalize relative hover:text-gray-300 hover:scale-105  tracking-wider before:absolute before:w-0 before:h-[1px] before:bg-white hover:before:w-full before:bottom-0 before:transition-all before:duration-200 before:ease-linear ${
                pagePath.pathname === "/gestao"
                  ? "scale-105 text-gray-300"
                  : "scale-100 text-white"
              }`}
            >
              Gestão
            </li>
          )}

          {user && user.position.includes("frotas") && (
            <li
              onClick={() => navigate("/frotas")}
              className={`cursor-pointer capitalize relative hover:text-gray-300 hover:scale-105  tracking-wider before:absolute before:w-0 before:h-[1px] before:bg-white hover:before:w-full before:bottom-0 before:transition-all before:duration-200 before:ease-linear ${
                pagePath.pathname === "/frotas"
                  ? "scale-105 text-gray-300"
                  : "scale-100 text-white"
              }`}
            >
              Frotas
            </li>
          )}

          {user && user.position.includes("oficina") && (
            <li
              onClick={() => navigate("/oficina")}
              className={`cursor-pointer capitalize relative hover:text-gray-300 hover:scale-105  tracking-wider before:absolute before:w-0 before:h-[1px] before:bg-white hover:before:w-full before:bottom-0 before:transition-all before:duration-200 before:ease-linear ${
                pagePath.pathname === "/oficina"
                  ? "scale-105 text-gray-300"
                  : "scale-100 text-white"
              }`}
            >
              Oficina
            </li>
          )}
          {!user && (
            <li
              onClick={() => navigate("/login")}
              className="cursor-pointer flex items-center gap-2 bg-gradient-to-br font-semibold transition-all duration-300 ease-linear to-blue-600 via-sky-400  from-blue-600 bg-pos-0 bg-size-200 hover:bg-pos-100 px-2 py-1 rounded-md tracking-wider"
            >
              Login <FaSignInAlt />
            </li>
          )}
          {user && (
            <li
              onClick={logout}
              className="flex items-center gap-1 cursor-pointer bg-gradient-to-br font-semibold transition-all duration-300 ease-linear to-red-600 via-red-300  from-red-600 bg-pos-0 bg-size-200 hover:bg-pos-100 px-2 py-1 rounded-md tracking-wider"
            >
              Sair <FaSignOutAlt />
            </li>
          )}
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
        <li
          onClick={() => {
            navigate("/");
            setMobileOpen((prev) => !prev);
          }}
          className={`cursor-pointer capitalize relative hover:text-gray-300 hover:scale-105  tracking-wider before:absolute before:w-0 before:h-[1px] before:bg-white hover:before:w-full before:bottom-0 before:transition-all before:duration-200 before:ease-linear ${
            pagePath.pathname === "/"
              ? "scale-105 text-gray-300"
              : "scale-100 text-white"
          }`}
        >
          Inicio
        </li>
        {user && (
          <li
            onClick={() => {
              navigate("/solicitacoes");
              setMobileOpen((prev) => !prev);
            }}
            className={`cursor-pointer capitalize relative hover:text-gray-300 hover:scale-105  tracking-wider before:absolute before:w-0 before:h-[1px] before:bg-white hover:before:w-full before:bottom-0 before:transition-all before:duration-200 before:ease-linear ${
              pagePath.pathname === "/solicitacoes"
                ? "scale-105 text-gray-300"
                : "scale-100 text-white"
            }`}
          >
            Solicitações
          </li>
        )}
        {user && user.position.includes("admin") && (
          <li
            onClick={() => {
              navigate("/gestao");
              setMobileOpen((prev) => !prev);
            }}
            className={`cursor-pointer capitalize relative hover:text-gray-300 hover:scale-105  tracking-wider before:absolute before:w-0 before:h-[1px] before:bg-white hover:before:w-full before:bottom-0 before:transition-all before:duration-200 before:ease-linear ${
              pagePath.pathname === "/gestao"
                ? "scale-105 text-gray-300"
                : "scale-100 text-white"
            }`}
          >
            Gestão
          </li>
        )}

        {user && user.position.includes("frotas") && (
          <li
            onClick={() => {
              navigate("/frotas");
              setMobileOpen((prev) => !prev);
            }}
            className={`cursor-pointer capitalize relative hover:text-gray-300 hover:scale-105  tracking-wider before:absolute before:w-0 before:h-[1px] before:bg-white hover:before:w-full before:bottom-0 before:transition-all before:duration-200 before:ease-linear ${
              pagePath.pathname === "/frotas"
                ? "scale-105 text-gray-300"
                : "scale-100 text-white"
            }`}
          >
            Frotas
          </li>
        )}

        {user && user.position.includes("oficina") && (
          <li
            onClick={() => {
              navigate("/oficina");
              setMobileOpen((prev) => !prev);
            }}
            className={`cursor-pointer capitalize relative hover:text-gray-300 hover:scale-105  tracking-wider before:absolute before:w-0 before:h-[1px] before:bg-white hover:before:w-full before:bottom-0 before:transition-all before:duration-200 before:ease-linear ${
              pagePath.pathname === "/oficina"
                ? "scale-105 text-gray-300"
                : "scale-100 text-white"
            }`}
          >
            Oficina
          </li>
        )}
        {!user && (
          <li
            onClick={() => {
              navigate("/login");
              setMobileOpen((prev) => !prev);
            }}
            className="cursor-pointer flex items-center gap-2 bg-gradient-to-br font-semibold transition-all duration-300 ease-linear to-blue-600 via-sky-400  from-blue-600 bg-pos-0 bg-size-200 hover:bg-pos-100 px-2 py-1 rounded-md tracking-wider"
          >
            Login <FaSignInAlt />
          </li>
        )}
        {user && (
          <li
            onClick={() => {
              logout();
              setMobileOpen((prev) => !prev);
            }}
            className="flex items-center gap-1 cursor-pointer bg-gradient-to-br font-semibold transition-all duration-300 ease-linear to-red-600 via-red-300  from-red-600 bg-pos-0 bg-size-200 hover:bg-pos-100 px-2 py-1 rounded-md tracking-wider"
          >
            Sair <FaSignOutAlt />
          </li>
        )}
      </ul>
    </>
  );
};

export { Navbar };
