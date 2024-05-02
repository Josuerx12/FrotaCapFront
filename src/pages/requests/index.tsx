import { useQuery, useQueryClient } from "react-query";
import NewRequestFolder from "../../components/folders/newRequest";
import { useFetch } from "../../hooks/useFetch";
import { useFilter } from "../../hooks/useFilter";
import InSchedulingFolder from "../../components/folders/inScheduling";
import WaitingForDeliveringFolder from "../../components/folders/waitingDelivery";
import { FaFilter, FaPlus } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import CreateMaintanceRequestModal from "../../components/modals/maintenceRequests/create";
import { useState } from "react";
import WaitingBudget from "../../components/folders/waitingBudget";
import WaitingMaintenanceFolder from "../../components/folders/waitingMaintenance";
import InMaintenanceFolder from "../../components/folders/inMaintenance";
import CollectedFolder from "../../components/folders/Collected";
import WaitingToCollectFolder from "../../components/folders/waitingToCollect";

const Requests = () => {
  const [isCreating, setIsCreating] = useState(false);

  const { fetchAllMaintenceRequests } = useFetch();

  const query = useQueryClient();

  const { data, isLoading } = useQuery("allReq", fetchAllMaintenceRequests);

  const {
    newRequests,
    schedulingRequests,
    deliverToTheWorkshop,
    waitingBudget,
    waitingMaintenance,
    inMaintenance,
    collected,
    waitingToCollect,
  } = useFilter(data);

  return (
    <>
      <CreateMaintanceRequestModal
        show={isCreating}
        handleClose={() => setIsCreating((prev) => !prev)}
      />
      <div className="pt-24 w-full h-screen">
        <h3 className="text-2xl font-bold text-center capitalize">
          Solicitações
        </h3>
        <div className="w-11/12 mx-auto flex gap-2 justify-end">
          <button
            onClick={() => setIsCreating((prev) => !prev)}
            title="Gerar nova solicitação."
            className="text-base flex items-center gap-2 bg-green-600 hover:bg-green-800 duration-200 font-semibold text-white p-2 rounded-md"
          >
            <FaPlus /> Solicitar
          </button>
          <button
            title="Filtrar solicitações de manutenção."
            className="text-base flex items-center gap-2 bg-blue-600 hover:bg-blue-800 duration-200 font-semibold text-white p-2 rounded-md"
          >
            <FaFilter /> Filtrar
          </button>
          <button
            title="Atualizar lista de usuários."
            className="text-xl flex items-center bg-black py-2 px-3 rounded-md text-white group"
            onClick={() => query.resetQueries("allReq")}
          >
            <FaArrowsRotate className="group-hover:rotate-180 duration-300" />
          </button>
        </div>
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
              {waitingBudget && <WaitingBudget requests={waitingBudget} />}
              {waitingMaintenance && (
                <WaitingMaintenanceFolder requests={waitingMaintenance} />
              )}
              {inMaintenance && (
                <InMaintenanceFolder requests={inMaintenance} />
              )}
              {waitingToCollect && (
                <WaitingToCollectFolder requests={waitingToCollect} />
              )}
              {collected && <CollectedFolder requests={collected} />}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Requests;
