import { IMaintenceRequest } from "../../../interfaces/maintanceRequest";
import WaitingDelivery from "../../cards/waitingDelivery";
import { Folder } from "../folder";

const WaitingForDeliveringFolder = ({
  requests,
}: {
  requests: IMaintenceRequest[];
}) => {
  return (
    <Folder folderName="Aguardando envio">
      {requests.length > 0 ? (
        requests.map((req) => <WaitingDelivery request={req} key={req.id} />)
      ) : (
        <p className="text-center">
          Nenhum veiculo pendente de entrega para oficina!
        </p>
      )}
    </Folder>
  );
};

export default WaitingForDeliveringFolder;
