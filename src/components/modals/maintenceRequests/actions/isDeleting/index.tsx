import {
  FaExclamationCircle,
  FaSpinner,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import Modal from "../../../modal";
import { useMaintance } from "../../../../../hooks/useMaintanance";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { IMaintenceRequest } from "../../../../../interfaces/maintenanceRequest";

type Props = {
  show: boolean;
  handleClose: () => void;
  request: IMaintenceRequest;
};

const IsDeletingModal = ({ show, handleClose, request }: Props) => {
  const { deleteMaintanance } = useMaintance();
  const query = useQueryClient();

  const { isLoading, reset, mutateAsync } = useMutation(
    "deletingMaintanance",
    deleteMaintanance,
    {
      onSuccess: () =>
        Promise.all([
          toast.success("Deleção concluida com sucesso!"),
          handleClose(),
          query.invalidateQueries("allReq"),
          query.invalidateQueries("userReq"),
        ]),
    }
  );

  return (
    <Modal
      isOpen={show}
      hidden={handleClose}
      modalName="Confirmar deleção da solicitação?"
    >
      <div>
        <div className="text-red-400 w-fit  mx-auto m-4 ">
          <FaExclamationCircle size={250} />
        </div>
        <p className="text-xl font-bold text-center">
          Confirmar deleção da solicitação numero {request.id}
        </p>
        <p className="text-xl mb-4 text-center">
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
            reset();
            handleClose();
          }}
          className="w-1/2 flex disabled:bg-red-400 justify-center items-center gap-2 bg-gradient-to-r bg-size-200 bg-pos-0 hover:bg-pos-100 duration-300 p-2 text-lg rounded-md  text-white font-bold from-rose-400 via-red-500 to-red-700"
        >
          <FaTimes /> Cancelar
        </button>
        <button
          onClick={async () => await mutateAsync(String(request.id))}
          disabled={isLoading}
          className="w-1/2 disabled:bg-blue-600  flex justify-center items-center gap-2 bg-gradient-to-r bg-size-200 bg-pos-0 hover:bg-pos-100 duration-300 p-2 text-lg rounded-md  text-white font-bold from-green-400 via-emerald-400 to-emerald-600"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin" /> Iniciando Remoção
            </>
          ) : (
            <>
              <FaTrash /> Deletar Solicitação
            </>
          )}
        </button>
      </div>
    </Modal>
  );
};

export default IsDeletingModal;
