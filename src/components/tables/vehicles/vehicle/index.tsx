/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { IVehicle } from "../../../../interfaces/vehicle";
import VehicleDetailModal from "../../../modals/vehicles/details";

const VehicleTableRow = ({ vehicle }: { vehicle: IVehicle }) => {
  const [isDetailing, setIsDetailing] = useState(false);
  return (
    <>
      <VehicleDetailModal
        vehicle={vehicle}
        show={isDetailing}
        handleClose={() => setIsDetailing((prev) => !prev)}
        key={vehicle.id}
      />
      <tr className="border">
        <td className="border">
          <span className="flex justify-center items-center">{vehicle.id}</span>
        </td>
        <td className="border">
          <span className="flex justify-center items-center">
            {vehicle.name}
          </span>
        </td>
        <td className="border">
          <span className="flex justify-center items-center">
            {vehicle.plate}
          </span>
        </td>
        <td className="border">
          <span className="flex justify-center items-center">
            {vehicle.provider.name}
          </span>
        </td>
        <td className="border">
          <div
            title={`Detalhes do usuário: ${vehicle.name}`}
            className="flex justify-center items-center py-2"
          >
            <button
              onClick={() => setIsDetailing(true)}
              className="px-2 py-2 bg-size-200 bg-pos-0 hover:bg-pos-100 bg-gradient-to-r from-cyan-500 via-blue-400 to-cyan-700 duration-200 capitalize text-white font-bold rounded-md flex items-center gap-2"
            >
              detalhes <FaInfoCircle />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default VehicleTableRow;
