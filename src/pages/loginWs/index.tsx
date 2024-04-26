/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { AuthCredentials } from "../../store/useAuth";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { FaCar, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { useState } from "react";
import ErrorLabel from "../../components/errorLabel";
import { useAuthWs } from "../../store/useAuthWs";

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
    <section className="w-full h-full  min-h-screen flex flex-col justify-center items-center">
      <h3 className="text-3xl font-bold text-neutral-800 py-3 flex gap-2 items-center">
        Autentique-se <FaCar />
      </h3>
      <form
        className="max-w-screen-md w-11/12  bg-gradient-to-br from-sky-600 to-sky-500 p-6 flex flex-col gap-6 rounded-lg"
        onSubmit={handleSubmit(onAuth)}
      >
        <div className="flex flex-col gap-4">
          <label className="text-2xl text-white font-bold">E-mail</label>
          <input
            className="p-2 rounded outline-sky-700"
            type="email"
            {...register("email")}
            placeholder="johndoe@email.com.br"
          />
          {error?.email && <ErrorLabel>{error.email}</ErrorLabel>}
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-lg text-white font-bold">Senha</label>
          <div className="flex gap-1 items-center">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="********"
              {...register("password")}
              className="flex-1 p-2 rounded outline-sky-700"
            />
            <div
              className="bg-gray-800 p-2 rounded cursor-pointer group"
              title="Vizualizar a senha"
              onClick={() => setPasswordVisible((prev) => !prev)}
            >
              {passwordVisible ? (
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
          {error?.password && <ErrorLabel>{error.password}</ErrorLabel>}
        </div>
        {error?.message && <ErrorLabel>{error.message}</ErrorLabel>}
        <button
          disabled={isLoading}
          type="submit"
          className="text-2xl flex gap-2 bg-gray-800 hover:bg-gray-600 duration-200 ease-linear w-fit mx-auto py-2 px-3 rounded-lg text-white"
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
    </section>
  );
};

export default LoginWs;
