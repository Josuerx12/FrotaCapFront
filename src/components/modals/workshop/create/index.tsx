import { FaMagnifyingGlass, FaPlus, FaSpinner } from "react-icons/fa6";
import Modal from "../../modal";
import { useForm } from "react-hook-form";
import {
  CreateWorkshopCredentials,
  useWorkshop,
} from "../../../../hooks/useWorkshop";
import { useMutation } from "react-query";
import { useFindByCep } from "../../../../hooks/useFindByCep";
import { FaTimes } from "react-icons/fa";

type Props = {
  handleClose: () => void;
  show: boolean;
};

const CreateWorkshopModal = ({ handleClose, show }: Props) => {
  const { getValues, register, handleSubmit, watch, setValue, reset } =
    useForm<CreateWorkshopCredentials>();

  const { createWorkshop } = useWorkshop();
  const { findByCep } = useFindByCep();

  const { mutateAsync, isLoading } = useMutation("addWorkshop", createWorkshop);

  async function onSubmit(data: CreateWorkshopCredentials) {
    await mutateAsync(data);
  }

  async function handleFindByCep() {
    const res = await findByCep(getValues("address.cep"));

    setValue("address.street", `${res.logradouro}, ${res.bairro}`);
    setValue("address.city", res.localidade);
    setValue("address.state", res.uf);
  }

  console.log(getValues("address"));

  return (
    <Modal
      isOpen={show}
      hidden={() => {
        handleClose();
        reset();
      }}
      modalName="Adicionar uma nova oficina."
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label className="flex flex-col">
          <span>Nome da oficina</span>
          <input
            {...register("name")}
            type="text"
            className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            placeholder="Nome da oficina aqui!"
          />
        </label>

        <label className="flex flex-col">
          <span>Email da oficina</span>
          <input
            {...register("email")}
            type="email"
            className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            placeholder="Email da oficina aqui!"
          />
        </label>

        <label className="flex flex-col">
          <span>Telefone da oficina</span>
          <input
            {...register("phone")}
            type="tel"
            className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            placeholder="Telefone com ddd da oficina aqui!"
          />
        </label>

        <h4 className="font-bold my-2">Endereço:</h4>

        <div className="flex flex-wrap gap-4">
          <label className="flex flex-col flex-grow">
            <span>CEP</span>
            <div className="flex items-center  rounded-l bg-neutral-100 focus:bg-white">
              <input
                type="text"
                placeholder="Insira seu cep aqui em traços ou pontuação"
                className="flex-1 p-2  outline-none rounded  bg-neutral-100 focus:bg-white"
                onChange={(e) =>
                  setValue(
                    "address.cep",
                    Number(e.target.value?.replace("-", "").trim())
                  )
                }
              />
              <button
                className=" text-white h-full px-3 rounded-r bg-sky-700"
                type="button"
                onClick={handleFindByCep}
              >
                <FaMagnifyingGlass />
              </button>
            </div>
          </label>

          <label className="flex flex-col flex-grow">
            <span>Endereço</span>
            <input
              defaultValue={watch("address.street")}
              className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
              type="text"
            />
          </label>

          <label className="flex flex-col flex-grow">
            <span>Numero</span>
            <input
              onChange={(e) =>
                setValue("address.number", Number(e.target.value))
              }
              type="number"
              className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            />
          </label>

          <label className="flex flex-col flex-grow">
            <span>Cidade</span>
            <input
              defaultValue={watch("address.city")}
              className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
              type="text"
            />
          </label>

          <label className="flex flex-col flex-grow">
            <span>Estado</span>
            <input
              className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
              defaultValue={watch("address.state")}
              type="text"
            />
          </label>
        </div>

        <input type="hidden" {...register("address.country")} value="Brasil" />

        <label className="flex flex-col ">
          <span>Senha de acesso</span>
          <input
            {...register("password")}
            className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            type="password"
            placeholder="Senha para acesso aqui!"
          />
        </label>

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

export default CreateWorkshopModal;
