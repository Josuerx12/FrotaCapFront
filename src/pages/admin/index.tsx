import { useState } from "react";
import { FaCar, FaUserAlt } from "react-icons/fa";
import { GiMechanicGarage } from "react-icons/gi";

const Admin = () => {
  const [showing, setShowing] = useState("users");

  return (
    <div className="pt-24 w-full h-screen">
      <h3 className="text-2xl font-bold text-center capitalize">Gestão</h3>

      <div className="max-w-screen-xl h-[90%] w-11/12 border mx-auto rounded-lg">
        <div className="flex justify-end ">
          <div className="flex bg-neutral-100 rounded-bl rounded-tr-lg">
            <button
              onClick={() => setShowing("users")}
              className={`${
                showing === "users" && "bg-neutral-700 text-white"
              } flex items-center gap-2 text-lg p-2 duration-500 ease rounded-bl font-semibold`}
            >
              <FaUserAlt /> Usuários
            </button>
            <button
              onClick={() => setShowing("workshops")}
              className={`${
                showing === "workshops" && "bg-neutral-700 text-white"
              } flex items-center gap-2 text-lg p-2 duration-500 ease font-semibold`}
            >
              <GiMechanicGarage /> Oficinas
            </button>
            <button
              onClick={() => setShowing("vehicles")}
              className={`${
                showing === "vehicles" && "bg-neutral-700 text-white"
              } flex items-center gap-2 text-lg p-2 duration-500 ease rounded-tr-lg font-semibold`}
            >
              <FaCar /> Veículos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
