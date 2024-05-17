/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Modal from "../../modal";
import { IVehicle } from "../../../../interfaces/vehicle";
import { useForm } from "react-hook-form";
import { FaSpinner, FaTimes, FaTrash } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ErrorLabel from "../../../errorLabel";
import { useFetch } from "../../../../hooks/useFetch";
import { FaPen } from "react-icons/fa6";
import { EditCredentials, useVehicle } from "../../../../hooks/useVehicle";
import { toast } from "react-toastify";
import DeleteVehicleModal from "../delete";

type Props = {
  show: boolean;
  handleClose: () => void;
  vehicle: IVehicle;
};

type MutationError = {
  message: string[];
  name: string;
  plate: string;
  providerId: string;
};

const VehicleDetailModal = ({ show, handleClose, vehicle }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { fetchProviders } = useFetch();

  const { reset, watch, handleSubmit, register } = useForm<IVehicle>({
    defaultValues: {
      name: vehicle.name,
      plate: vehicle.plate,
      providerId: vehicle.providerId,
    },
  });

  const query = useQueryClient();

  const { data } = useQuery("providers", fetchProviders);

  const { EditVehicle } = useVehicle();

  const { mutateAsync, isLoading, error } = useMutation<
    any,
    MutationError,
    EditCredentials
  >("editVehicle", EditVehicle, {
    onSuccess: (data) =>
      Promise.all([
        query.invalidateQueries("vehicles"),
        handleClose(),
        toast.success(data),
        reset(),
      ]),
  });

  async function onSubmit(data: IVehicle) {
    const credentials: Record<string, string | number> = {};

    if (data.name !== vehicle.name) {
      credentials["name"] = data.name;
    }
    if (data.plate !== vehicle.plate) {
      credentials["plate"] = data.plate;
    }
    if (Number(data.providerId) !== Number(vehicle.providerId)) {
      credentials["providerId"] = Number(data.providerId);
    }

    await mutateAsync({ id: vehicle.id, credentials: credentials as any });
  }

  return (
    <>
      <DeleteVehicleModal
        show={isDeleting}
        handleClose={() => setIsDeleting((prev) => !prev)}
        vehicle={vehicle}
        key={vehicle.id}
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
            <label>Nome do veiculo</label>
            <input
              {...register("name")}
              defaultValue={watch("name")}
              placeholder="Ex: Gol"
              className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
              type="text"
            />
          </div>

          {error && error.name && <ErrorLabel>{error.name}</ErrorLabel>}

          <div className="flex flex-col">
            <label>Placa do veiculo</label>
            <input
              {...register("plate")}
              defaultValue={watch("plate")}
              placeholder="ABC1234"
              className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
              type="plate"
            />
            {error && error.plate && <ErrorLabel>{error.plate}</ErrorLabel>}
          </div>

          <div className="flex flex-col">
            <label>Provedor</label>
            <select
              {...register("providerId")}
              defaultValue={watch("providerId")}
              className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            >
              <option>Selecione um provedor!</option>
              {data?.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
            {error && error.providerId && (
              <ErrorLabel>{error.providerId}</ErrorLabel>
            )}
          </div>

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
                    <FaPen /> Editar
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

export default VehicleDetailModal;
