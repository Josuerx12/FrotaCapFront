import { IMaintenceRequest } from "../../../interfaces/maintanceRequest";

const InSchedulingRequestCard = ({
  request,
}: {
  request: IMaintenceRequest;
}) => {
  console.log(request);
  return (
    <div
      title="Clique para ver detalhes!"
      className="w-11/12 border text-neutral-900 group mx-auto cursor-pointer hover:scale-105 hover:shadow duration-200 ease-linear bg-gray-100 rounded-lg p-2 relative before:w-full before:h-2 before:absolute before:bottom-0 before:left-0 before:bg-pink-500 before:animate-pulse before:rounded-b-md"
    >
      <h6 className="text-lg text-center">
        <span className="font-bold capitalize"> Numero da solicitação:</span>{" "}
        {request.id}
      </h6>
      <p>
        <span className="font-bold capitalize">Solicitante: </span>{" "}
        {request.ownerOfReq.name}
      </p>
      <p>
        <span className="font-bold capitalize">Numero do solicitante: </span>{" "}
        {request.ownerOfReq.phone}
      </p>
      <p>
        <span className="font-bold capitalize">Solicitado dia:</span>{" "}
        {new Date(request.createdAt).toLocaleString("pt-BR")}
      </p>
      <div className="capitalize opacity-0 flex  group-hover:opacity-100 duration-200 ease-in-out justify-center p-2 font-bold">
        Ver detalhes
      </div>
    </div>
  );
};

export default InSchedulingRequestCard;
