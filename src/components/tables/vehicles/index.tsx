import { useState } from "react";
import { FaFilter, FaPlus } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { useQuery, useQueryClient } from "react-query";
import { useFetch } from "../../../hooks/useFetch";
import VehicleTableRow from "./vehicle";
import CreateVehicle from "../../modals/vehicles/create";

const VehiclesTable = () => {
  const [isCreating, setIsCreating] = useState(false);

  const { fetchVehicles } = useFetch();

  const { data, isLoading } = useQuery("vehicles", fetchVehicles);

  const query = useQueryClient();

  return (
    <div className="flex flex-col gap-6 mx-auto w-full px-4">
      <CreateVehicle
        show={isCreating}
        handleClose={() => setIsCreating((prev) => !prev)}
      />
      <h3 className="text-xl text-center mt-4 font-bold">Veiculos</h3>
      <div className="relative flex justify-start">
        <div className="flex gap-2">
          <button
            onClick={() => setIsCreating((prev) => !prev)}
            title="Adicionar novo usuário."
            className="text-base flex items-center gap-2 bg-green-600 hover:bg-green-800 duration-200 font-semibold text-white p-2 rounded-md"
          >
            <FaPlus /> Adicionar
          </button>
          <button
            title="Filtrar usuários."
            className="text-base flex items-center gap-2 bg-blue-600 hover:bg-blue-800 duration-200 font-semibold text-white p-2 rounded-md"
          >
            <FaFilter /> Filtrar
          </button>
          <button
            title="Atualizar lista de usuários."
            className="text-xl flex items-center bg-black py-2 px-3 rounded-md text-white group"
            onClick={() => query.resetQueries("vehicles")}
          >
            <FaArrowsRotate className="group-hover:rotate-180 duration-300" />
          </button>
        </div>
      </div>
      <div className="absolute w-full inset-0 top-auto h-[75%] md:h-[80%] shadow p-2 rounded-md overflow-auto">
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <table className="w-full">
            <thead className="border">
              <tr>
                <th className="border">ID</th>
                <th className="border">Veiculo</th>
                <th className="border">Placa</th>
                <th className="border">Provedor</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data?.map((vehicle) => (
                <VehicleTableRow vehicle={vehicle} key={vehicle.id} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default VehiclesTable;
