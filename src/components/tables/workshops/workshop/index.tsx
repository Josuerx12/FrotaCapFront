/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { IWorkshop } from "../../../../interfaces/workShop";
import WorkshopDetailModal from "../../../modals/workshop/detail";

const WorkshopTableRow = ({ workshop }: { workshop: IWorkshop }) => {
  const { name, phone, email, id, createdAt, updatedAt } = workshop;

  const [isDetailing, setIsDetailing] = useState(false);
  return (
    <>
      <WorkshopDetailModal
        show={isDetailing}
        handleClose={() => setIsDetailing((prev) => !prev)}
        ws={workshop}
        key={id}
      />
      <tr className="border">
        <td className="border">
          <span className="flex justify-center items-center">{id}</span>
        </td>
        <td className="border">
          <span className="flex justify-center items-center">{name}</span>
        </td>
        <td className="border">
          <span className="flex justify-center items-center">{email}</span>
        </td>
        <td className="border">
          <span className="flex justify-center items-center">{phone}</span>
        </td>
        <td className="border">
          <span className="flex justify-center items-center">
            {new Date(createdAt).toLocaleString("pt-BR")}
          </span>
        </td>
        <td className="border">
          <span className="flex justify-center items-center">
            {new Date(updatedAt).toLocaleString("pt-BR")}
          </span>
        </td>
        <td className="border">
          <div
            title={`Detalhes da oficina: ${name}`}
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

export default WorkshopTableRow;
