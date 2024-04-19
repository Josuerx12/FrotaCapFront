/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Modal from "../../modal";
import { IUser } from "../../../../interfaces/user";
import {
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaTimes,
  FaUserEdit,
  FaUserSlash,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import DeleteUser from "../delete";

type Props = {
  show: boolean;
  handleClose: () => void;
  user: IUser;
};

type EditCredentials = {
  password: string;
  confirmPassword: string;
};

const UserDetails = ({ show, handleClose, user }: Props) => {
  const { register, handleSubmit, watch, reset } = useForm<
    IUser & EditCredentials
  >({
    defaultValues: {
      admin: user.admin,
      email: user.email,
      frotas: user.frotas,
      id: user.id,
      name: user.name,
      phone: user.phone,
      workshop: user.workshop,
      password: undefined,
      confirmPassword: undefined,
    },
  });

  const [isShowing, setIsShowing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <>
      <DeleteUser
        show={isDeleting}
        handleClose={() => setIsDeleting((prev) => !prev)}
        user={user}
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
              <FaUserEdit /> Editar
            </button>
            <button
              onClick={() => {
                setIsDeleting((prev) => !prev);
                handleClose();
              }}
              className="flex p-2 rounded-md text-white font-semibold items-center gap-2 bg-size-200 bg-pos-0 hover:bg-pos-100 duration-500 bg-gradient-to-l from-red-600 via-red-400 to-red-800"
            >
              <FaUserSlash /> Deletar
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
            <label>Email</label>
            <input
              {...register("email")}
              defaultValue={watch("email")}
              placeholder="Ex: nome@email.com.br"
              disabled={!isEditing}
              className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
              type="email"
            />
          </div>

          <div className="flex flex-col">
            <label>Telefone de contato</label>
            <input
              {...register("phone")}
              defaultValue={watch("phone")}
              placeholder="Ex: 22998989622"
              disabled={!isEditing}
              className="flex-1 p-2 rounded outline-sky-700 bg-neutral-100 focus:bg-white"
              type="tel"
            />
          </div>
          {isEditing && (
            <>
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
            </>
          )}

          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={watch("admin")}
                {...register("admin")}
              />
              <label>Administrador</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={watch("workshop")}
                {...register("workshop")}
              />
              <label>Oficina</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={watch("frotas")}
                {...register("frotas")}
              />
              <label>Frota</label>
            </div>
          </div>
          {isEditing && (
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setIsEditing(false);
                }}
                className="w-1/2 rounded-md p-2 text-white font-semibold text-xl flex justify-center items-center gap-2 bg-size-200 bg-pos-0 hover:bg-pos-100 duration-500 bg-gradient-to-l from-red-600 via-red-400 to-red-800"
              >
                <FaTimes /> Cancelar
              </button>
              <button className="w-1/2 p-2 text-white font-semibold text-xl flex justify-center items-center gap-2 bg-size-200 bg-pos-0 hover:bg-pos-100 duration-500 bg-gradient-to-l from-blue-600 via-sky-400 to-blue-800 rounded-md">
                <FaPlus /> Cadastrar
              </button>
            </div>
          )}
        </form>
      </Modal>
    </>
  );
};

export default UserDetails;
