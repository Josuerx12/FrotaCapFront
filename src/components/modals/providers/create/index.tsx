/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "../../modal";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import ErrorLabel from "../../../errorLabel";
import {
  CreateProviderCredentials,
  useProvider,
} from "../../../../hooks/useProvider";
import { FaPlus, FaSpinner, FaTimes } from "react-icons/fa";

type Props = {
  show: boolean;
  handleClose: () => void;
};

type MutationError = {
  message: string[];
  name: string;
};

const CreateProviderModal = ({ show, handleClose }: Props) => {
  const { create } = useProvider();
  const { register, handleSubmit, reset } =
    useForm<CreateProviderCredentials>();
  const query = useQueryClient();

  const { mutateAsync, error, isLoading } = useMutation<
    any,
    MutationError,
    CreateProviderCredentials
  >("addProvider", create, {
    onSuccess: (data) =>
      Promise.all([
        query.invalidateQueries("providers"),
        reset(),
        toast.success(data),
        handleClose(),
      ]),
  });

  async function onSubmit(data: CreateProviderCredentials) {
    await mutateAsync(data);
  }

  return (
    <Modal
      modalName="Adicionar novo fornecedor"
      isOpen={show}
      hidden={handleClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label>Nome</label>
          <input
            {...register("name")}
            placeholder="Ex: Nome"
            className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            type="text"
          />
          {error && error.name && <ErrorLabel>{error.name}</ErrorLabel>}
        </div>

        {error && error.message && <ErrorLabel>{error.message[0]}</ErrorLabel>}

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
            disabled={isLoading}
            className="w-1/2 disabled:bg-blue-600  flex justify-center items-center gap-2 bg-gradient-to-r bg-size-200 bg-pos-0 hover:bg-pos-100 duration-300 p-2 text-lg rounded-md  text-white font-bold from-green-400 via-emerald-400 to-emerald-600"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" /> Cadastrando
              </>
            ) : (
              <>
                <FaPlus /> Cadastrar
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateProviderModal;
