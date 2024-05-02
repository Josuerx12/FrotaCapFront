import { IMaintenceRequest } from "../../../interfaces/maintenanceRequest";
import WaitingCollectCard from "../../cards/waitingCollect";
import { Folder } from "../folder";

const WaitingToCollectFolder = ({
  requests,
}: {
  requests: IMaintenceRequest[];
}) => {
  return (
    <Folder folderName="Aguardando Coleta">
      {requests.length > 0 ? (
        requests.map((req) => <WaitingCollectCard request={req} key={req.id} />)
      ) : (
        <p className="text-center">Nenhum veiculo para ser coletado!</p>
      )}
    </Folder>
  );
};

export default WaitingToCollectFolder;
