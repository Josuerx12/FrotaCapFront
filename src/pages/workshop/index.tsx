import { FaArrowsRotate, FaFilter } from "react-icons/fa6";
import { useQuery, useQueryClient } from "react-query";
import WaitingForDeliveringFolder from "../../components/folders/waitingDelivery";
import { useFetch } from "../../hooks/useFetch";
import { useFilter } from "../../hooks/useFilter";
import WaitingBudget from "../../components/folders/waitingBudget";
import WaitingMaintenanceFolder from "../../components/folders/waitingMaintenance";
import InMaintenanceFolder from "../../components/folders/inMaintenance";
import WaitingToCollectFolder from "../../components/folders/waitingToCollect";
import CollectedFolder from "../../components/folders/Collected";

const Workshop = () => {
  const query = useQueryClient();

  const { fetchWorkShopMaintenceRequests } = useFetch();

  const { data, isLoading } = useQuery("wsReq", fetchWorkShopMaintenceRequests);

  const {
    deliverToTheWorkshop,
    waitingBudget,
    waitingMaintenance,
    inMaintenance,
    waitingToCollect,
    collected,
  } = useFilter(data);

  return (
    <>
      <div className="pt-24 w-full h-screen">
        <h3 className="text-2xl font-bold text-center capitalize">
          Solicitações - Oficina
        </h3>
        <div className="w-11/12 mx-auto flex gap-2 justify-end">
          <button
            title="Filtrar solicitações de manutenção."
            className="text-base flex items-center gap-2 bg-blue-600 hover:bg-blue-800 duration-200 font-semibold text-white p-2 rounded-md"
          >
            <FaFilter /> Filtrar
          </button>
          <button
            title="Atualizar lista de usuários."
            className="text-xl flex items-center bg-black py-2 px-3 rounded-md text-white group"
            onClick={() => query.resetQueries("wsReq")}
          >
            <FaArrowsRotate className="group-hover:rotate-180 duration-300" />
          </button>
        </div>
        <div className="w-11/12 overflow-auto border mt-6 mx-auto h-5/6 rounded  flex p-2 gap-4">
          {isLoading ? (
            <p>Carregando...</p>
          ) : data && data.length > 0 ? (
            <>
              {deliverToTheWorkshop && deliverToTheWorkshop.length > 0 && (
                <WaitingForDeliveringFolder requests={deliverToTheWorkshop} />
              )}
              {waitingBudget && waitingBudget.length > 0 && (
                <WaitingBudget requests={waitingBudget} />
              )}
              {waitingMaintenance && waitingMaintenance.length > 0 && (
                <WaitingMaintenanceFolder requests={waitingMaintenance} />
              )}
              {inMaintenance && inMaintenance.length > 0 && (
                <InMaintenanceFolder requests={inMaintenance} />
              )}
              {waitingToCollect && waitingToCollect.length > 0 && (
                <WaitingToCollectFolder requests={waitingToCollect} />
              )}
              {collected && collected.length > 0 && (
                <CollectedFolder requests={collected} />
              )}
            </>
          ) : (
            <p className="text-center w-full">
              Nenhuma solicitação encontrada!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Workshop;
