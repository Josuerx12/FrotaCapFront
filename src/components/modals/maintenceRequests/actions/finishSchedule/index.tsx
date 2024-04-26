import { FaCalendarCheck, FaSpinner, FaTimes } from "react-icons/fa";
import { IMaintenceRequest } from "../../../../../interfaces/maintanceRequest";
import Modal from "../../../modal";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useMaintance } from "../../../../../hooks/useMaintance";
import { toast } from "react-toastify";
import { useFetch } from "../../../../../hooks/useFetch";
import { useForm } from "react-hook-form";

type Props = {
  show: boolean;
  handleClose: () => void;
  request: IMaintenceRequest;
};

type FinishScheduleCredentials = {
  deadlineToDeliver: Date;
  workShopId: number;
  status: number;
};

const FinishScheduleModal = ({ show, handleClose, request }: Props) => {
  const { editMaintance } = useMaintance();
  const { handleSubmit, register } = useForm<FinishScheduleCredentials>({
    defaultValues: {
      status: 2,
    },
  });
  const query = useQueryClient();

  const { isLoading, reset, mutateAsync } = useMutation(
    "finishSchedule",
    editMaintance,
    {
      onSuccess: () =>
        Promise.all([
          toast.success("Agendamento Finalizado!"),
          handleClose(),
          query.invalidateQueries("allReq"),
        ]),
    }
  );

  async function onSubmit(data: FinishScheduleCredentials) {
    data.workShopId = Number(data.workShopId);

    await mutateAsync({ id: request.id, credentials: data });
  }

  const { fetchWorkshops } = useFetch();

  const { data, isLoading: isLoadingWorkshops } = useQuery(
    "workshops",
    fetchWorkshops
  );

  return (
    <Modal isOpen={show} hidden={handleClose} modalName="Finalizar agendamento">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span>Oficina</span>
            <select
              {...register("workShopId")}
              className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
              disabled={isLoadingWorkshops || isLoading}
            >
              <option>Selecione uma oficina</option>

              {data?.map((ws) => (
                <option key={ws.id} value={ws.id}>
                  {ws.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span>Data para levar até a oficina</span>
            <input
              {...register("deadlineToDeliver")}
              className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
              type="datetime-local"
              disabled={isLoadingWorkshops || isLoading}
              required
            />
          </label>

          <p className="text-xl font-bold text-center">
            Finalizar agendamento:
          </p>
          <p className="text-xl mb-4 text-center">
            <span className="font-bold">Solicitação numero: </span> {request.id}{" "}
            |<span className="font-bold">Solicitado por: </span>{" "}
            {request.Owner.name} | <span className="font-bold">Veiculo: </span>{" "}
            {request.plate}?
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => {
              reset();
              handleClose();
            }}
            className="w-1/2 flex disabled:bg-red-400 justify-center items-center gap-2 bg-gradient-to-r bg-size-200 bg-pos-0 hover:bg-pos-100 duration-300 p-2 text-lg rounded-md  text-white font-bold from-rose-400 via-red-500 to-red-700"
          >
            <FaTimes /> Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="w-1/2 disabled:bg-blue-600  flex justify-center items-center gap-2 bg-gradient-to-r bg-size-200 bg-pos-0 hover:bg-pos-100 duration-300 p-2 text-lg rounded-md  text-white font-bold from-green-400 via-emerald-400 to-emerald-600"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" /> Finalizando agendamento
              </>
            ) : (
              <>
                <FaCalendarCheck /> Finalizar agendamento
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FinishScheduleModal;
