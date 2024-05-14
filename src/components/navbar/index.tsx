import { useState } from "react";
import {
  FaBars,
  FaCar,
  FaSignOutAlt,
  FaTimes,
  FaUserShield,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/useAuth";
import { useAuthWs } from "../../store/useAuthWs";
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  const pagePath = useLocation();

  const { user, logout } = useAuth();
  const { workshop, logout: logoutWs } = useAuthWs();

  return (
    <>
      <nav className="w-full h-20 px-4 z-30 fixed bg-neutral-800 flex items-center justify-between drop-shadow-lg">
        <div
          title="FrotasCAP - Pagina Inicial"
          onClick={() => navigate("/")}
          className="flex gap-2 text-white items-center cursor-pointer  bg-size-200 bg-pos-0 hover:bg-pos-100 bg-gradient-to-l to-sky-300 via-sky-600 from-sky-500 duration-300 ease-linear transition-all p-2 drop-shadow-xl rounded-xl"
        >
          <h1 className="font-signature text-5xl font-bold  drop-shadow-lg">
            Frotascap
          </h1>
          <FaCar size={40} />
        </div>

        <ul className="hidden text-white text-lg md:flex items-center gap-3">
          <li
            onClick={() => navigate("/")}
            className={`cursor-pointer capitalize relative hover:text-gray-300 ease-linear  tracking-wider duration-200 hover:scale-110 ${
              pagePath.pathname === "/"
                ? "scale-110 text-gray-300"
                : "scale-100 text-white"
            }`}
          >
            Inicio
          </li>
          {user && (
            <li
              onClick={() => navigate("/solicitacoes")}
              className={`cursor-pointer capitalize relative hover:text-gray-300   tracking-wider duration-200 hover:scale-110 ${
                pagePath.pathname === "/solicitacoes"
                  ? "scale-110 text-gray-300"
                  : "scale-100 text-white"
              }`}
            >
              Solicitações
            </li>
          )}
          {user && user.admin && (
            <li
              onClick={() => navigate("/gestao")}
              className={`cursor-pointer capitalize relative hover:text-gray-300   tracking-wider duration-200 hover:scale-110 ${
                pagePath.pathname === "/gestao"
                  ? "scale-110 text-gray-300"
                  : "scale-100 text-white"
              }`}
            >
              Gestão
            </li>
          )}

          {user && user.frotas && (
            <li
              onClick={() => navigate("/frotas")}
              className={`cursor-pointer capitalize relative hover:text-gray-300   tracking-wider duration-200 hover:scale-110 ${
                pagePath.pathname === "/frotas"
                  ? "scale-110 text-gray-300"
                  : "scale-100 text-white"
              }`}
            >
              Frotas
            </li>
          )}

          {workshop && (
            <li
              onClick={() => navigate("/oficina")}
              className={`cursor-pointer capitalize relative hover:text-gray-300   tracking-wider duration-200 hover:scale-110 ${
                pagePath.pathname === "/oficina"
                  ? "scale-110 text-gray-300"
                  : "scale-100 text-white"
              }`}
            >
              Oficina
            </li>
          )}
          {!user && !workshop && (
            <li
              className={`relative cursor-pointer flex gap-2 items-center bg-gradient-to-br font-semibold transition-all duration-300 ease-linear to-blue-600 via-sky-400  from-blue-600 bg-size-200 hover:bg-pos-100 px-2 py-1 rounded-md tracking-wider`}
            >
              <Link className="flex gap-2 items-center" to="/login">
                Autentique-se <FaUserShield size={20} />
              </Link>
            </li>
          )}
          {(user || workshop) && (
            <li
              onClick={user ? logout : logoutWs}
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
        className={`fixed z-20 duration-300 transition-all ease-linear text-white text-3xl flex gap-6 flex-col h-screen justify-center items-center w-full bg-neutral-800 ${
          mobileOpen ? "top-0" : "-top-full"
        }`}
      >
        <li
          onClick={() => {
            navigate("/");
            setMobileOpen((prev) => !prev);
          }}
          className={`cursor-pointer capitalize relative hover:text-gray-300   tracking-wider duration-200 hover:scale-110 ${
            pagePath.pathname === "/"
              ? "scale-110 text-gray-300"
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
            className={`cursor-pointer capitalize relative hover:text-gray-300   tracking-wider duration-200 hover:scale-110 ${
              pagePath.pathname === "/solicitacoes"
                ? "scale-110 text-gray-300"
                : "scale-100 text-white"
            }`}
          >
            Solicitações
          </li>
        )}
        {user && user.admin && (
          <li
            onClick={() => {
              navigate("/gestao");
              setMobileOpen((prev) => !prev);
            }}
            className={`cursor-pointer capitalize relative hover:text-gray-300   tracking-wider duration-200 hover:scale-110 ${
              pagePath.pathname === "/gestao"
                ? "scale-110 text-gray-300"
                : "scale-100 text-white"
            }`}
          >
            Gestão
          </li>
        )}

        {user && user.frotas && (
          <li
            onClick={() => {
              navigate("/frotas");
              setMobileOpen((prev) => !prev);
            }}
            className={`cursor-pointer capitalize relative hover:text-gray-300   tracking-wider duration-200 hover:scale-110 ${
              pagePath.pathname === "/frotas"
                ? "scale-110 text-gray-300"
                : "scale-100 text-white"
            }`}
          >
            Frotas
          </li>
        )}

        {workshop && (
          <li
            onClick={() => navigate("/oficina")}
            className={`cursor-pointer capitalize relative hover:text-gray-300   tracking-wider duration-200 hover:scale-110 ${
              pagePath.pathname === "/oficina"
                ? "scale-110 text-gray-300"
                : "scale-100 text-white"
            }`}
          >
            Oficina
          </li>
        )}
        {!user && !workshop && (
          <li
            className={`relative cursor-pointer flex gap-2 items-center bg-gradient-to-br font-semibold transition-all duration-300 ease-linear to-blue-600 via-sky-400  from-blue-600 bg-size-200 hover:bg-pos-100 px-2 py-1 rounded-md tracking-wider`}
          >
            <Link
              onClick={() => setMobileOpen((prev) => !prev)}
              className="flex gap-2 items-center justify-between duration-200 hover:bg-blue-600 p-2 rounded"
              to="/login"
            >
              Autentique-se <FaUserShield size={20} />
            </Link>
          </li>
        )}
        {(user || workshop) && (
          <li
            onClick={user ? logout : logoutWs}
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
