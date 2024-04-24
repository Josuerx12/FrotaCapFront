import { useQuery } from "react-query";
import NewRequestFolder from "../../components/folders/newRequest";
import { useFetch } from "../../hooks/useFetch";
import { useFilter } from "../../hooks/useFilter";
import InSchedulingFolder from "../../components/folders/inScheduling";
import WaitingForDeliveringFolder from "../../components/folders/waintingDelivery";
import InWorkshopFolder from "../../components/folders/inWorkshop";

const Requests = () => {
  const { fetchAllMaintenceRequests } = useFetch();

  const { data, isLoading } = useQuery("allReq", fetchAllMaintenceRequests);

  const { newRequests, schedulingRequests, deliverToTheWorkshop } =
    useFilter(data);

  return (
    <div className="pt-24 w-full h-screen">
      <h3 className="text-2xl font-bold text-center capitalize">
        Solicitações
      </h3>

      <div className="w-11/12 overflow-auto border mt-6 mx-auto h-5/6 rounded  flex items-center gap-4">
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <>
            {newRequests && <NewRequestFolder requests={newRequests} />}
            {schedulingRequests && (
              <InSchedulingFolder requests={schedulingRequests} />
            )}
            {deliverToTheWorkshop && (
              <WaitingForDeliveringFolder requests={deliverToTheWorkshop} />
            )}
            {deliverToTheWorkshop && (
              <InWorkshopFolder requests={deliverToTheWorkshop} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Requests;
