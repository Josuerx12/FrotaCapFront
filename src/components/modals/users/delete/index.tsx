import {
  FaCheck,
  FaExclamationTriangle,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";
import { IUser } from "../../../../interfaces/user";
import Modal from "../../modal";
import { useMutation, useQueryClient } from "react-query";
import { useUser } from "../../../../hooks/useUser";
import { toast } from "react-toastify";

type Props = {
  show: boolean;
  handleClose: () => void;
  user: IUser;
};

const DeleteUser = ({ show, handleClose, user }: Props) => {
  const { deleteUser } = useUser();
  const query = useQueryClient();

  const { mutateAsync, isLoading } = useMutation("deleteUser", deleteUser, {
    onSuccess: (data) =>
      Promise.all([
        handleClose(),
        toast.success(data),
        query.invalidateQueries("users"),
      ]),
  });

  return (
    <Modal modalName="Confirme a ação!" isOpen={show} hidden={handleClose}>
      <div>
        <div className="text-red-600 w-fit  mx-auto m-4 ">
          <FaExclamationTriangle size={250} className="" />
        </div>
        <p className="text-xl font-bold text-center">
          Confirmar a exclusão do usuário:
        </p>
        <p className="text-xl mb-4 text-center">
          <span className="font-bold">Nome: </span> {user.name} |{" "}
          <span className="font-bold">Email: </span> {user.email}?
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
          onClick={async () => await mutateAsync(user.id)}
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

export default DeleteUser;
