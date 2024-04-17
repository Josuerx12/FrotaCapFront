import { IMaintenceRequest } from "../../../interfaces/maintanceRequest";

const NewRequestCard = ({ request }: { request: IMaintenceRequest }) => {
  console.log(request);
  return <div className="">{request.id}</div>;
};

export default NewRequestCard;
