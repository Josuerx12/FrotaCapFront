import { useState } from "react";
import { FaCar, FaTools, FaUserAlt } from "react-icons/fa";
import UsersTable from "../../components/tables/users";
import VehiclesTable from "../../components/tables/vehicles";
import { IoBusiness } from "react-icons/io5";
import ProviderTable from "../../components/tables/providers";
import WorkshopsTable from "../../components/tables/workshops";

const Admin = () => {
  const [showing, setShowing] = useState("users");

  return (
    <div className="pt-24 w-full h-screen">
      <h3 className="text-3xl font-bold text-center capitalize">
        Administração
      </h3>

      <div className="max-w-screen-xl h-[90%] w-11/12 border mx-auto relative">
        <div className="flex bg-neutral-100 rounded-3xl absolute top-3 right-3 shadow-md">
          <button
            onClick={() => setShowing("users")}
            className={`${
              showing === "users" && "bg-neutral-700 text-white"
            } flex items-center gap-2 text-lg p-2 duration-200 ease rounded-l-3xl font-semibold`}
          >
            <FaUserAlt /> Usuários
          </button>
          <button
            onClick={() => setShowing("workshops")}
            className={`${
              showing === "workshops" && "bg-neutral-700 text-white"
            } flex items-center gap-2 text-lg  p-2 duration-200 ease font-semibold`}
          >
            <FaTools /> Oficinas
          </button>
          <button
            onClick={() => setShowing("providers")}
            className={`${
              showing === "providers" && "bg-neutral-700 text-white"
            } flex items-center gap-2 text-lg  p-2 duration-200 ease font-semibold`}
          >
            <IoBusiness /> Fornecedores
          </button>
          <button
            onClick={() => setShowing("vehicles")}
            className={`${
              showing === "vehicles" && "bg-neutral-700 text-white"
            } flex items-center gap-2 text-lg p-2 duration-200 ease rounded-r-3xl font-semibold`}
          >
            <FaCar /> Veículos
          </button>
        </div>

        {showing === "users" && <UsersTable />}
        {showing === "workshops" && <WorkshopsTable />}
        {showing === "providers" && <ProviderTable />}
        {showing === "vehicles" && <VehiclesTable />}
      </div>
    </div>
  );
};

export default Admin;
