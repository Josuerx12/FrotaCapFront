import { IMaintenceRequest } from "../../../interfaces/maintenanceRequest";
import WaitingDelivery from "../../cards/waitingDelivery";
import { Folder } from "../folder";

const WaitingMaintenanceFolder = ({
  requests,
}: {
  requests: IMaintenceRequest[];
}) => {
  return (
    <Folder folderName="Aguardando manutenção">
      {requests.length > 0 ? (
        requests.map((req) => <WaitingDelivery request={req} key={req.id} />)
      ) : (
        <p className="text-center">Nenhum veiculo esperando manutenção!</p>
      )}
    </Folder>
  );
};

export default WaitingMaintenanceFolder;
