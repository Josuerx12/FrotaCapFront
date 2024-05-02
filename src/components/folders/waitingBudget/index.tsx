import { IMaintenceRequest } from "../../../interfaces/maintenanceRequest";
import WaitingDelivery from "../../cards/waitingDelivery";
import { Folder } from "../folder";

const WaitingBudgetFolder = ({
  requests,
}: {
  requests: IMaintenceRequest[];
}) => {
  return (
    <Folder folderName="Aguardando Orçamento">
      {requests.length > 0 ? (
        requests.map((req) => <WaitingDelivery request={req} key={req.id} />)
      ) : (
        <p className="text-center">Nenhuma solicitação aguardando orçamento!</p>
      )}
    </Folder>
  );
};

export default WaitingBudgetFolder;
