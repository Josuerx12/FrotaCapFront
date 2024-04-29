/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FaExclamationTriangle,
  FaSpinner,
  FaTimes,
  FaTools,
} from "react-icons/fa";
import { IMaintenceRequest } from "../../../../../interfaces/maintanceRequest";
import Modal from "../../../modal";
import { useMutation, useQueryClient } from "react-query";
import { useMaintance } from "../../../../../hooks/useMaintance";
import { toast } from "react-toastify";

type Props = {
  show: boolean;
  handleClose: () => void;
  request: IMaintenceRequest;
};

const ReciveVehicleModal = ({ show, handleClose, request }: Props) => {
  const { editMaintance } = useMaintance();
  const query = useQueryClient();
  const { mutateAsync, isLoading } = useMutation("reciveVeh", editMaintance, {
    onSuccess: () =>
      Promise.all([
        toast.success("Recebido na oficina com sucesso!"),
        handleClose(),
        query.invalidateQueries("wsReq"),
      ]),
    onError: (err: any) => {
      toast.error(String(err.message));
    },
  });

  return (
    <Modal
      isOpen={show}
      hidden={handleClose}
      modalName="Confirmação de recebimento de veiculo."
    >
      <div>
        <div className="text-yellow-400 w-fit  mx-auto m-4 ">
          <FaExclamationTriangle size={250} className="" />
        </div>
        <p className="text-xl font-bold text-center">Confirmar recebimento:</p>
        <p className="text-xl mb-4 text-center">
          <span className="font-bold">Solicitação numero: </span> {request.id} |
          <span className="font-bold">Solicitado por: </span>{" "}
          {request.Owner.name} | <span className="font-bold">Veiculo: </span>{" "}
          {request.plate}?
        </p>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            handleClose();
          }}
          className="w-1/2 flex disabled:bg-red-400 justify-center items-center gap-2 bg-gradient-to-r bg-size-200 bg-pos-0 hover:bg-pos-100 duration-300 p-2 text-lg rounded-md  text-white font-bold from-rose-400 via-red-500 to-red-700"
        >
          <FaTimes /> Cancelar
        </button>
        <button
          onClick={async () =>
            await mutateAsync({ id: request.id, credentials: { status: 3 } })
          }
          disabled={isLoading}
          className="w-1/2 disabled:bg-blue-600  flex justify-center items-center gap-2 bg-gradient-to-r bg-size-200 bg-pos-0 hover:bg-pos-100 duration-300 p-2 text-lg rounded-md  text-white font-bold from-green-400 via-emerald-400 to-emerald-600"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin" /> Confirmando recebimento
            </>
          ) : (
            <>
              <FaTools /> confirmar recebimento
            </>
          )}
        </button>
      </div>
    </Modal>
  );
};

export default ReciveVehicleModal;
