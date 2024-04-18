import { IMaintenceRequest } from "../../../interfaces/maintanceRequest";
import InSchedulingRequestCard from "../../cards/inSchedulingRequest";
import { Folder } from "../folder";

const InSchedulingFolder = ({
  requests,
}: {
  requests: IMaintenceRequest[];
}) => {
  return (
    <Folder folderName="em agendamento">
      {requests.length > 0 ? (
        requests.map((req) => (
          <InSchedulingRequestCard request={req} key={req.id} />
        ))
      ) : (
        <p className="text-center">Nenhuma solicitação em agendamento!</p>
      )}
    </Folder>
  );
};

export default InSchedulingFolder;
