/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import ErrorLabel from "../../../errorLabel";
import Modal from "../../modal";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FaPlus, FaSpinner, FaTimes } from "react-icons/fa";
import { VehicleCredentials, useVehicle } from "../../../../hooks/useVehicle";
import { toast } from "react-toastify";
import { useFetch } from "../../../../hooks/useFetch";

type Props = {
  show: boolean;
  handleClose: () => void;
};

type MutationError = {
  message: string[];
  providerId: string;
  plate: string;
  name: string;
};

const CreateVehicleModal = ({ show, handleClose }: Props) => {
  const { register, handleSubmit, reset } = useForm<VehicleCredentials>();
  const { CreateVehicle } = useVehicle();

  const query = useQueryClient();

  const { fetchProviders } = useFetch();

  const { data } = useQuery("providers", fetchProviders);

  const { mutateAsync, isLoading, error } = useMutation<
    any,
    MutationError,
    VehicleCredentials
  >("addNewVehicle", CreateVehicle, {
    onSuccess: (data) =>
      Promise.all([
        reset(),
        toast.success(data),
        handleClose(),
        query.invalidateQueries("vehicles"),
      ]),
  });

  async function onSubmit(data: VehicleCredentials) {
    data.providerId = Number(data.providerId);

    await mutateAsync(data);
  }

  return (
    <Modal
      hidden={handleClose}
      isOpen={show}
      modalName="Adicionar novo veiculo na frota"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label>Nome do veiculo</label>
          <input
            {...register("name")}
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
            placeholder="ABC1234"
            className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            type="string"
          />
          {error && error.plate && <ErrorLabel>{error.plate}</ErrorLabel>}
        </div>

        <div className="flex flex-col">
          <label>Provedor</label>
          <select
            {...register("providerId")}
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

export default CreateVehicleModal;
