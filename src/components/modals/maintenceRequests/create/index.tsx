/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaPlus, FaSpinner, FaTimes } from "react-icons/fa";
import Modal from "../../modal";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import {
  CreateMaintanceCredentials,
  useMaintance,
} from "../../../../hooks/useMaintanance";
import { toast } from "react-toastify";
import ErrorLabel from "../../../errorLabel";
import { useFetch } from "../../../../hooks/useFetch";

type Props = {
  show: boolean;
  handleClose: () => void;
};

type MutationError = {
  message: string[];
  vehicle: string;
};

const CreateMaintanceRequestModal = ({ show, handleClose }: Props) => {
  const query = useQueryClient();
  const { createMaintance } = useMaintance();

  const { fetchVehicles } = useFetch();

  const { data } = useQuery("vehicles", fetchVehicles);

  const {
    register,
    handleSubmit,
    reset: resetForm,
  } = useForm<CreateMaintanceCredentials>();

  const { isLoading, reset, mutateAsync, error } = useMutation<
    any,
    MutationError,
    CreateMaintanceCredentials
  >("newRequest", createMaintance, {
    onSuccess: (data) =>
      Promise.all([
        query.invalidateQueries("allReq"),
        query.invalidateQueries("userReq"),
        resetForm(),
        handleClose(),
        toast.success(data),
      ]),
  });

  async function onSubmit(data: CreateMaintanceCredentials) {
    data.km = Number(data.km);
    await mutateAsync(data);
  }

  return (
    <Modal
      isOpen={show}
      hidden={() => {
        handleClose();
        resetForm();
        reset();
      }}
      modalName="Gerar nova solicitação de manutenção"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span>Nº da Ordem de Serviço</span>
          <input
            className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            {...register("os")}
            placeholder="Ex: 32554"
            type="number"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Motorista</span>
          <input
            className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            {...register("driverName")}
            placeholder="Ex: Jhon Doe"
            type="text"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span>Nº Telefone do Motorista</span>
          <input
            className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            {...register("driverPhone")}
            placeholder="Ex: 22997929644"
            type="tel"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span>Km</span>
          <input
            placeholder="Ex: 12608"
            className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            {...register("km")}
            type="number"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span>Veiculo</span>
          <select
            className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            {...register("plate")}
          >
            <option>Selecione um veiculo.</option>

            {data?.map((veh) => (
              <option value={veh.plate}>
                {veh.name} / {veh.plate}
              </option>
            ))}
          </select>
          {error && error.vehicle && <ErrorLabel>{error.vehicle}</ErrorLabel>}
        </label>

        <label className="flex flex-col gap-1">
          <span>Serviço a ser realizado</span>
          <textarea
            className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            rows={5}
            placeholder="Insira aqui o serviço desejado com seus detalhes!"
            {...register("service")}
          />
        </label>

        {error && error.message && <ErrorLabel>{error.message[0]}</ErrorLabel>}

        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => {
              reset();
              handleClose();
              resetForm();
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

export default CreateMaintanceRequestModal;
