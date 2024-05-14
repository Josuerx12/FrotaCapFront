/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaCar, FaSpinner, FaTimes, FaTools } from "react-icons/fa";
import { IMaintenceRequest } from "../../../../../interfaces/maintenanceRequest";
import Modal from "../../../modal";
import { useMutation, useQueryClient } from "react-query";
import {
  EditMaintanceCredentials,
  useMaintance,
} from "../../../../../hooks/useMaintanance";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

type Props = {
  show: boolean;
  handleClose: () => void;
  request: IMaintenceRequest;
};

const StartMaintenanceModal = ({ show, handleClose, request }: Props) => {
  const {
    register,
    reset: resetForm,
    handleSubmit,
  } = useForm<EditMaintanceCredentials>({
    defaultValues: {
      status: 5,
    },
  });
  const { editMaintance } = useMaintance();
  const query = useQueryClient();
  const { mutateAsync, isLoading, reset } = useMutation(
    "sendBudget",
    editMaintance,
    {
      onSuccess: () =>
        Promise.all([
          toast.success("Manutenção iniciada com sucesso!!"),
          handleClose(),
          query.invalidateQueries("wsReq"),
        ]),
      onError: (err: any) => {
        toast.error(String(err.message));
      },
    }
  );

  async function onSubmit(data: EditMaintanceCredentials) {
    await mutateAsync({ id: request.id, credentials: data });
  }

  return (
    <Modal isOpen={show} hidden={handleClose} modalName="Iniciar manutenção.">
      <div>
        <div className="text-yellow-400 w-fit  mx-auto m-4 ">
          <FaCar size={250} />
        </div>
        <p className="text-xl font-bold text-center">
          Detalhes da solicitação:
        </p>
        <p className="text-xl mb-4 text-center">
          <span className="font-bold">Solicitação numero: </span> {request.id} |
          <span className="font-bold">Solicitado por: </span>{" "}
          {request.Owner.name} | <span className="font-bold">Veiculo: </span>{" "}
          {request.plate}?
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="flex flex-col gap-1">
          <span>Prazo para entrega do veiculo:</span>
          <input
            type="datetime-local"
            {...register("deadlineToForward")}
            required
            className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
          />
        </label>
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => {
              reset();
              resetForm();
              handleClose();
            }}
            className="w-1/2 flex disabled:bg-red-400 justify-center items-center gap-2 bg-gradient-to-r bg-size-200 bg-pos-0 hover:bg-pos-100 duration-300 p-2 text-lg rounded-md  text-white font-bold from-rose-400 via-red-500 to-red-700"
          >
            <FaTimes /> Cancelar
          </button>
          <button
            disabled={isLoading}
            className="w-1/2 disabled:bg-blue-600  flex justify-center items-center gap-2 bg-gradient-to-r bg-size-200 bg-pos-0 hover:bg-pos-100 duration-300 p-2 text-lg rounded-md  text-white font-bold from-green-400 via-emerald-400 to-emerald-600"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" /> Iniciando Manutenção
              </>
            ) : (
              <>
                <FaTools /> Iniciar Manutenção
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default StartMaintenanceModal;
