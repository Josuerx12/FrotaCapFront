/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Modal from "../../modal";
import { FaPen, FaSpinner, FaTimes, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { FaUserPen } from "react-icons/fa6";
import { IProvider } from "../../../../interfaces/provider";
import {
  CreateProviderCredentials,
  useProvider,
} from "../../../../hooks/useProvider";
import DeleteProviderModal from "../delete";

type Props = {
  show: boolean;
  handleClose: () => void;
  provider: IProvider;
};

const ProviderDetails = ({ show, handleClose, provider }: Props) => {
  const { editProvider } = useProvider();

  const query = useQueryClient();

  const { register, handleSubmit, watch, reset } =
    useForm<CreateProviderCredentials>({
      defaultValues: {
        name: provider.name,
      },
    });

  const { mutateAsync, isLoading } = useMutation("editProvider", editProvider, {
    onSuccess: (data) =>
      Promise.all([
        query.invalidateQueries("providers"),
        handleClose(),
        toast.success(data),
        setIsEditing(false),
      ]),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function onSubmit(data: CreateProviderCredentials) {
    const credentials: Record<string, string | boolean> = {};

    if (data.name !== provider.name) {
      credentials["name"] = data.name;
    }

    await mutateAsync({ id: provider.id, credentials });
  }

  return (
    <>
      <DeleteProviderModal
        show={isDeleting}
        handleClose={() => setIsDeleting((prev) => !prev)}
        provider={provider}
        key={provider.id}
      />
      <Modal
        isOpen={show}
        hidden={() => {
          handleClose();
          setIsEditing(false);
          reset();
        }}
        modalName="Detalhes do usuário!"
      >
        {!isEditing && !isDeleting && (
          <div className="flex justify-end gap-4 ">
            <button
              onClick={() => setIsEditing(true)}
              className="flex p-2 rounded-md text-white font-semibold items-center gap-2 bg-size-200 bg-pos-0 hover:bg-pos-100 duration-500 bg-gradient-to-l from-blue-600 via-sky-400 to-blue-800"
            >
              <FaPen /> Editar
            </button>
            <button
              onClick={() => {
                setIsDeleting((prev) => !prev);
                handleClose();
              }}
              className="flex p-2 rounded-md text-white font-semibold items-center gap-2 bg-size-200 bg-pos-0 hover:bg-pos-100 duration-500 bg-gradient-to-l from-red-600 via-red-400 to-red-800"
            >
              <FaTrash /> Deletar
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label>Nome</label>
            <input
              {...register("name")}
              defaultValue={watch("name")}
              placeholder="Ex: Nome"
              disabled={!isEditing}
              className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
              type="text"
            />
          </div>

          <div className="flex flex-col">
            <label>Adicionado em</label>
            <input
              value={new Date(provider.createdAt).toLocaleString("pt-BR")}
              disabled
              className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <label>Atualizado em</label>
            <input
              value={new Date(provider.updatedAt).toLocaleString("pt-BR")}
              disabled
              className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
              type="text"
            />
          </div>

          {provider.Vehicle.length > 0 ? (
            <div>
              <h4>Veiculos desse provedor:</h4>
              <div>
                {provider.Vehicle.map((vehicle) => (
                  <p className="font-bold w-fit py-1 px-2 cursor-default text-white bg-size-200 bg-pos-0 hover:bg-pos-100 duration-500 bg-gradient-to-l from-blue-600 via-sky-600 to-blue-800 rounded-md">
                    Modelo: {vehicle.name} / Placa: {vehicle.plate}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <p>Nenhum veiculo cadastrado para esse provedor!</p>
          )}

          {isEditing && (
            <div className="flex items-center justify-center gap-4">
              <button
                disabled={isLoading}
                type="button"
                onClick={() => {
                  reset();
                  setIsEditing(false);
                }}
                className="w-1/2 rounded-md disabled:bg-red-400 p-2 text-white font-semibold text-xl flex justify-center items-center gap-2 bg-size-200 bg-pos-0 hover:bg-pos-100 duration-500 bg-gradient-to-l from-red-600 via-red-400 to-red-800"
              >
                <FaTimes /> Cancelar
              </button>
              <button
                disabled={isLoading}
                className="w-1/2 p-2 disabled:bg-blue-600 text-white font-semibold text-xl flex justify-center items-center gap-2 bg-size-200 bg-pos-0 hover:bg-pos-100 duration-500 bg-gradient-to-l from-blue-600 via-sky-400 to-blue-800 rounded-md"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Editando
                  </>
                ) : (
                  <>
                    <FaUserPen /> Editar
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </Modal>
    </>
  );
};

export default ProviderDetails;
