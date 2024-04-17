import { IMaintenceRequest } from "../../../interfaces/maintanceRequest";
import NewRequestCard from "../../cards/newRequest";
import { Folder } from "../folder";

const NewRequestFolder = ({ requests }: { requests: IMaintenceRequest[] }) => {
  return (
    <Folder folderName="novas solicitações">
      {requests.map((req) => (
        <NewRequestCard request={req} key={req.id} />
      ))}
    </Folder>
  );
};

export default NewRequestFolder;
