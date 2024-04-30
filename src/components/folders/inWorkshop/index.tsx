import { IMaintenceRequest } from "../../../interfaces/maintenanceRequest";
import WaitingDelivery from "../../cards/waitingDelivery";
import { Folder } from "../folder";

const InWorkshopFolder = ({ requests }: { requests: IMaintenceRequest[] }) => {
  return (
    <Folder folderName="Aguardando orçamento">
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

export default InWorkshopFolder;
