import { IMaintenceRequest } from "../../../interfaces/maintenanceRequest";
import CollectedCard from "../../cards/collected";
import { Folder } from "../folder";

const CollectedFolder = ({ requests }: { requests: IMaintenceRequest[] }) => {
  return (
    <Folder folderName="Coletado">
      {requests.length > 0 ? (
        requests.map((req) => <CollectedCard request={req} key={req.id} />)
      ) : (
        <p className="text-center">
          Nenhum veiculo pendente de entrega para oficina!
        </p>
      )}
    </Folder>
  );
};

export default CollectedFolder;
