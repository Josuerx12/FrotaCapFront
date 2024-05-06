import { useState } from "react";
import { IWorkshop } from "../../../../interfaces/workShop";
import Modal from "../../modal";
import { FaPen, FaSpinner, FaTimes, FaTrash } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useMutation } from "react-query";
import {
  EditWorkshopCredentials,
  useWorkshop,
} from "../../../../hooks/useWorkshop";
import { useForm } from "react-hook-form";
type Props = {
  show: boolean;
  handleClose: () => void;
  ws: IWorkshop;
};

const WorkshopDetailModal = ({ handleClose, show, ws }: Props) => {
  const {
    register,
    handleSubmit,
    reset: resetForm,
  } = useForm<EditWorkshopCredentials>({
    defaultValues: {
      email: ws.email,
      phone: ws.phone,
      name: ws.name,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { editWorkshop } = useWorkshop();

  const { mutateAsync, reset, isLoading } = useMutation(
    "editWorkshop",
    editWorkshop
  );

  async function onSubmit(data: EditWorkshopCredentials) {
    await mutateAsync({ id: ws.id, credentials: data });
  }

  return (
    <Modal
      isOpen={show}
      hidden={() => {
        handleClose();
        reset();
        resetForm();
        setIsEditing(false);
      }}
      modalName={`Detalhes da oficina: ${ws.name}`}
      key={ws.id}
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

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span>Nome da oficina</span>
          <input
            {...register("name")}
            disabled={!isEditing}
            defaultValue={ws.name}
            type="text"
            className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            placeholder="Nome da oficina aqui!"
          />
        </label>
        <label className="flex flex-col">
          <span>Email da oficina</span>
          <input
            {...register("email")}
            disabled={!isEditing}
            defaultValue={ws.email}
            type="email"
            className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            placeholder="Nome da oficina aqui!"
          />
        </label>
        <label className="flex flex-col">
          <span>Telefone da oficina</span>
          <input
            defaultValue={ws.phone}
            disabled={!isEditing}
            type="tel"
            className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            placeholder="Nome da oficina aqui!"
          />
        </label>

        <div className="flex flex-wrap gap-4">
          <label className="flex flex-col flex-grow">
            <span>CEP</span>
            <div className="flex items-center  rounded-l bg-neutral-100 focus:bg-white">
              <input
                type="text"
                placeholder="Insira seu cep aqui em traços ou pontuação"
                className="flex-1 p-2  outline-none rounded  bg-neutral-100 focus:bg-white"
                // onChange={(e) =>
                //   setValue(
                //     "address.cep",
                //     Number(e.target.value?.replace("-", "").trim())
                //   )
                // }
                disabled
                defaultValue={ws.Address.cep}
              />
              <button
                className=" text-white h-full px-3 rounded-r bg-sky-700"
                type="button"
                disabled
              >
                <FaMagnifyingGlass />
              </button>
            </div>
          </label>

          <label className="flex flex-col flex-grow">
            <span>Endereço</span>
            <input
              disabled
              defaultValue={ws.Address.street}
              className="flex-1 p-2 min-w-72 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
              type="text"
            />
          </label>

          <label className="flex flex-col flex-grow">
            <span>Numero</span>
            <input
              disabled
              defaultValue={ws.Address.number}
              type="number"
              className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            />
          </label>

          <label className="flex flex-col flex-grow">
            <span>Cidade</span>
            <input
              disabled
              defaultValue={ws.Address.city}
              className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
              type="text"
            />
          </label>

          <label className="flex flex-col flex-grow">
            <span>Estado</span>
            <input
              disabled
              className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
              defaultValue={ws.Address.state}
              type="text"
            />
          </label>
        </div>

        {isEditing && (
          <div className="flex items-center justify-center gap-4">
            <button
              disabled={isLoading}
              type="button"
              onClick={() => {
                resetForm();
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
                  <FaPen /> Editar
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </Modal>
  );
};

export default WorkshopDetailModal;
