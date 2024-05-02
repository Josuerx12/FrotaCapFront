import { IMaintenceRequest } from "../../../interfaces/maintenanceRequest";
import InMaintenanceCard from "../../cards/inMaintenance";
import { Folder } from "../folder";

const InMaintenanceFolder = ({
  requests,
}: {
  requests: IMaintenceRequest[];
}) => {
  return (
    <Folder folderName="Em manutenção">
      {requests.length > 0 ? (
        requests.map((req) => <InMaintenanceCard request={req} key={req.id} />)
      ) : (
        <p className="text-center">
          Nenhum veiculo pendente de entrega para oficina!
        </p>
      )}
    </Folder>
  );
};

export default InMaintenanceFolder;
