/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { AuthCredentials } from "../../store/useAuth";
import { useAuthWs } from "../../store/useAuthWs";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import ErrorLabel from "../errorLabel";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

type MutationError = {
  email?: string;
  password?: string;
  message?: string;
};

const LoginWs = () => {
  const { register, handleSubmit, reset } = useForm<AuthCredentials>();

  const { login, getWs } = useAuthWs();

  const { mutateAsync, error, isLoading } = useMutation<
    any,
    MutationError,
    AuthCredentials
  >("login", login, {
    onSuccess: (data) =>
      Promise.all([
        toast.success(data),
        getWs()
          .then((res) => toast.success(res))
          .catch((err) => {
            toast.error("Error ao coletar os dados do usuário!");
            console.log(err.message);
          }),
        reset(),
      ]),
  });

  async function onAuth(data: AuthCredentials) {
    await mutateAsync(data);
  }

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <form
      className="w-full bg-gradient-to-br from-orange-600 to-orange-500 p-6 flex flex-col gap-6 rounded-lg"
      onSubmit={handleSubmit(onAuth)}
    >
      <h3 className="text-xl uppercase text-center text-white">Oficinas</h3>

      <div className="flex flex-col gap-4">
        <label className="text-2xl text-white font-bold">E-mail</label>
        <input
          className="p-2 rounded outline-orange-700"
          type="email"
          {...register("email")}
          placeholder="johndoe@email.com.br"
        />
        {error?.email && <ErrorLabel>{error.email}</ErrorLabel>}
      </div>
      <div className="flex flex-col gap-4">
        <label className="text-lg text-white font-bold">Senha</label>
        <div className="flex-1 flex gap-1 items-center">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="********"
            {...register("password")}
            className="w-full p-2 rounded outline-orange-700"
          />
          <div
            className="bg-gray-800 p-2 rounded cursor-pointer group"
            title="Vizualizar a senha"
            onClick={() => setPasswordVisible((prev) => !prev)}
          >
            {passwordVisible ? (
              <FaEyeSlash
                className="text-white group-hover:text-orange-400 "
                size={20}
              />
            ) : (
              <FaEye
                className="text-white group-hover:text-orange-400 "
                size={20}
              />
            )}
          </div>
        </div>
        {error?.password && <ErrorLabel>{error.password}</ErrorLabel>}
      </div>
      {error?.message && <ErrorLabel>{error.message}</ErrorLabel>}
      <button
        disabled={isLoading}
        type="submit"
        className="text-2xl flex  items-center justify-center gap-2 bg-gray-800 hover:bg-gray-600 duration-200 ease-linear w-fit mx-auto py-2 px-3 rounded-lg text-white"
      >
        {isLoading ? (
          <>
            <FaSpinner className="animate-spin" /> Autenticando
          </>
        ) : (
          <>Acessar</>
        )}
      </button>
    </form>
  );
};

export default LoginWs;
