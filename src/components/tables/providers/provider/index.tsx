import { FaInfoCircle } from "react-icons/fa";
import { useState } from "react";
import { IProvider } from "../../../../interfaces/provider";
import ProviderDetails from "../../../modals/providers/details";

const ProviderTableRow = ({ provider }: { provider: IProvider }) => {
  const [isDetailing, setIsDetaling] = useState(false);

  return (
    <>
      <ProviderDetails
        show={isDetailing}
        handleClose={() => setIsDetaling((prev) => !prev)}
        provider={provider}
        key={provider.id}
      />
      <tr className="border">
        <td className="border">
          <span className="flex justify-center items-center">
            {provider.id}
          </span>
        </td>
        <td className="border">
          <span className="flex justify-center items-center">
            {provider.name}
          </span>
        </td>
        <td className="border">
          <span className="flex justify-center items-center">
            {new Date(provider.createdAt).toLocaleString("pt-BR")}
          </span>
        </td>
        <td className="border">
          <div
            title={`Detalhes do usuário: ${provider.name}`}
            className="flex justify-center items-center py-2"
          >
            <button
              onClick={() => setIsDetaling(true)}
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

export default ProviderTableRow;
