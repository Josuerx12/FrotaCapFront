import { useState } from "react";
import { IMaintenceRequest } from "../../../interfaces/maintenanceRequest";
import MaintenceRequestDetails from "../../modals/maintenceRequests/details";

const NewRequestCard = ({ request }: { request: IMaintenceRequest }) => {
  const [isDetaling, setIsDetaling] = useState(false);

  return (
    <>
      <MaintenceRequestDetails
        request={request}
        key={request.id}
        show={isDetaling}
        handleClose={() => setIsDetaling((prev) => !prev)}
      />
      <div
        onClick={() => setIsDetaling((prev) => !prev)}
        title="Clique para ver detalhes!"
        className="w-11/12 border text-neutral-900 group mx-auto cursor-pointer hover:scale-105 hover:shadow duration-200 ease-linear bg-gray-100 rounded-lg p-2 relative before:w-full before:h-2 before:absolute before:bottom-0 before:left-0 before:bg-red-200 before:rounded-b-md"
      >
        <h6>
          <span className="font-bold capitalize">ID:</span> {request.id}
        </h6>
        <p>
          <span className="font-bold capitalize">Solicitante: </span>{" "}
          {request.Owner.name}
        </p>

        <p>
          <span className="font-bold capitalize">Solicitado dia:</span>{" "}
          {new Date(request.createdAt).toLocaleString("pt-BR")}
        </p>

        <p className="line-clamp-3">
          <span className="font-bold capitalize">Serviço solicitado: </span>{" "}
          {request.service}
        </p>

        <div className="capitalize opacity-0 flex  group-hover:opacity-100 duration-200 ease-in-out justify-center p-2 font-bold">
          Ver detalhes
        </div>
      </div>
    </>
  );
};

export default NewRequestCard;
