/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import LoginUser from "../../components/loginUser";
import LoginWs from "../../components/loginWs";
import { FaCar, FaUser, FaUserShield } from "react-icons/fa";
import { FaCircleArrowLeft } from "react-icons/fa6";

const AuthPage = () => {
  const [loginState, setLoginState] = useState(0);

  return (
    <section className="w-11/12 md:w-7/12 mx-auto h-full  min-h-screen flex flex-col gap-5 items-center">
      <h3 className="text-3xl font-bold text-neutral-800 py-3 mt-28 text-center">
        Bem vindo ao Frota CAP!
      </h3>{" "}
      {loginState !== 0 && (
        <div className="w-full flex justify-end">
          <button
            onClick={() => setLoginState(0)}
            className="flex items-center gap-2 justify-center bg-neutral-900 text-white p-2 rounded"
          >
            <FaCircleArrowLeft /> Alterar Metodo <FaUserShield />
          </button>
        </div>
      )}
      {loginState === 0 && (
        <div className="w-10/12 text-center  flex-1 flex flex-col gap-4">
          <p className="text-lg text-justify md:text-center">
            Selecione como deseja se autenticar para começar a utilizar o frota
            CAP.
          </p>

          <div className="flex gap-2 flex-wrap md:flex-nowrap">
            <button
              onClick={() => setLoginState(1)}
              className="p-2 bg-sky-600 hover:bg-sky-500 duration-200  flex gap-2  flex-grow sm:flex-grow-0 items-center justify-center text-white text-2xl rounded w-1/2 "
            >
              Solicitante / Frotas <FaUser />
            </button>
            <button
              onClick={() => setLoginState(2)}
              className="p-2 bg-orange-600 hover:bg-orange-500 duration-200 flex gap-2  flex-grow sm:flex-grow-0 items-center justify-center text-white text-2xl rounded w-1/2 "
            >
              Oficina <FaCar />
            </button>
          </div>
        </div>
      )}
      {loginState === 1 && <LoginUser />}
      {loginState === 2 && <LoginWs />}
    </section>
  );
};

export default AuthPage;
