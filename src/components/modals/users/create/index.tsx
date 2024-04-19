/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Modal from "../../modal";
import { FaEye, FaEyeSlash, FaPlus, FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { ICreateUserCredentials } from "../../../../interfaces/user";
import { useUser } from "../../../../hooks/useUser";
import { toast } from "react-toastify";
import ErrorLabel from "../../../errorLabel";

type Props = {
  show: boolean;
  handleClose: () => void;
};

type MutationError = {
  message: string[];
  phone: string;
  email: string;
};

const CreateUserModal = ({ show, handleClose }: Props) => {
  const [isShowing, setIsShowing] = useState(false);
  const { create } = useUser();
  const { register, handleSubmit, reset } = useForm<ICreateUserCredentials>();
  const query = useQueryClient();

  const { mutateAsync, error } = useMutation<
    any,
    MutationError,
    ICreateUserCredentials
  >("addUser", create, {
    onSuccess: (data) =>
      Promise.all([
        query.invalidateQueries("users"),
        reset(),
        toast.success(data),
        handleClose(),
      ]),
  });

  async function onSubmit(data: ICreateUserCredentials) {
    await mutateAsync(data);
  }

  return (
    <Modal modalName="Adicionar usuário" isOpen={show} hidden={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label>Nome</label>
          <input
            {...register("name")}
            placeholder="Ex: Nome"
            className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            type="text"
          />
        </div>

        <div className="flex flex-col">
          <label>Email</label>
          <input
            {...register("email")}
            placeholder="Ex: nome@email.com.br"
            className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            type="email"
          />
          {error && error.email && <ErrorLabel>{error.email}</ErrorLabel>}
        </div>

        <div className="flex flex-col">
          <label>Telefone de contato</label>
          <input
            {...register("phone")}
            placeholder="Ex: 22998989622"
            className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            type="tel"
          />
          {error && error.phone && <ErrorLabel>{error.phone}</ErrorLabel>}
        </div>
        <div className="flex flex-col">
          <label>Senha</label>
          <div className="flex gap-1 items-center">
            <input
              type={isShowing ? "text" : "password"}
              placeholder="********"
              {...register("password")}
              className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            />
            <div
              className="bg-gray-800 p-2 rounded cursor-pointer group"
              title="Vizualizar a senha"
              onClick={() => setIsShowing((prev) => !prev)}
            >
              {isShowing ? (
                <FaEyeSlash
                  className="text-white group-hover:text-sky-400 "
                  size={20}
                />
              ) : (
                <FaEye
                  className="text-white group-hover:text-sky-400 "
                  size={20}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label>Confirme a senha</label>
          <input
            {...register("confirmPassword")}
            placeholder="********"
            className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
            type={isShowing ? "text" : "password"}
          />
        </div>

        {error && error.message && <ErrorLabel>{error.message[0]}</ErrorLabel>}

        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              reset();
              handleClose();
            }}
            className="w-1/2 flex justify-center items-center gap-2 bg-gradient-to-r bg-size-200 bg-pos-0 hover:bg-pos-100 duration-300 p-2 text-lg rounded-md  text-white font-bold from-rose-400 via-red-500 to-red-700"
          >
            <FaTimes /> Cancelar
          </button>
          <button className="w-1/2  flex justify-center items-center gap-2 bg-gradient-to-r bg-size-200 bg-pos-0 hover:bg-pos-100 duration-300 p-2 text-lg rounded-md  text-white font-bold from-green-400 via-emerald-400 to-emerald-600">
            <FaPlus /> Cadastrar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateUserModal;
