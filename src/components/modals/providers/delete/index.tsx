import {
  FaCheck,
  FaExclamationTriangle,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";
import Modal from "../../modal";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { IProvider } from "../../../../interfaces/provider";
import { useProvider } from "../../../../hooks/useProvider";

type Props = {
  show: boolean;
  handleClose: () => void;
  provider: IProvider;
};

const DeleteProviderModal = ({ show, handleClose, provider }: Props) => {
  const { deleteProvider } = useProvider();
  const query = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    "deleteProvider",
    deleteProvider,
    {
      onSuccess: (data) =>
        Promise.all([
          handleClose(),
          toast.success(data),
          query.invalidateQueries("providers"),
        ]),
    }
  );

  return (
    <Modal modalName="Confirme a ação!" isOpen={show} hidden={handleClose}>
      <div>
        <div className="text-red-600 w-fit  mx-auto m-4 ">
          <FaExclamationTriangle size={250} className="" />
        </div>
        <p className="text-xl font-bold text-center">
          Confirmar a exclusão do provedor:
        </p>
        <p className="text-xl mb-4 text-center">
          <span className="font-bold">Nome: </span> {provider.name}?
        </p>
      </div>

      <div className="flex gap-2 items-end">
        <button
          disabled={isLoading}
          onClick={handleClose}
          className="w-1/2 rounded-md disabled:bg-red-500 p-2 text-white font-semibold text-xl flex justify-center items-center gap-2 bg-size-200 bg-pos-0 hover:bg-pos-100 duration-500 bg-gradient-to-l from-red-600 via-red-400 to-red-800"
        >
          <FaTimes /> Cancelar
        </button>
        <button
          disabled={isLoading}
          onClick={async () => await mutateAsync(provider.id)}
          className="w-1/2 rounded-md disabled:bg-blue-600 p-2 text-white font-semibold text-xl flex justify-center items-center gap-2 bg-size-200 bg-pos-0 hover:bg-pos-100 duration-500 bg-gradient-to-l from-blue-600 via-sky-400 to-blue-800"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin" /> Deletando
            </>
          ) : (
            <>
              <FaCheck /> Confirmar
            </>
          )}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteProviderModal;
