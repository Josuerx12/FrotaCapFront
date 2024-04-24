import { IMaintenceRequest } from "../../../interfaces/maintanceRequest";
import NewRequestCard from "../../cards/newRequest";
import { Folder } from "../folder";

const NewRequestFolder = ({ requests }: { requests: IMaintenceRequest[] }) => {
  return (
    <Folder folderName="novas solicitações">
      {requests.length > 0 ? (
        requests.map((req) => <NewRequestCard request={req} key={req.id} />)
      ) : (
        <p className="text-center">Nenhuma nova solicitação!</p>
      )}
    </Folder>
  );
};

export default NewRequestFolder;
