/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { api } from "../config/api";
import Cookies from "js-cookie";
import { IUser } from "../interfaces/user";

export type AuthCredentials = {
  email: string;
  password: string;
};

type State = {
  user?: IUser;
};

type Actions = {
  login: (credentials: AuthCredentials) => Promise<string>;
  getUser: () => Promise<string>;
  logout: () => void;
};

const useAuth = create<State & Actions>((set) => ({
  user: undefined,
  login: async (credentials: AuthCredentials) => {
    try {
      const res = await api().post("/auth/login", credentials);

      const token = res.data.token;

      Cookies.set("refreshToken", token);

      return "Login realizado com sucesso!";
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getUser: async () => {
    const token = Cookies.get("refreshToken");

    try {
      const res = await (
        await api(token).get("/user/profile/detail")
      ).data.user;

      set(() => ({ user: res, errors: null }));

      return "Dados do usuário coletado com sucesso!";
    } catch (error: any) {
      throw error.response.data;
    }
  },
  logout: () => {
    Cookies.remove("refreshToken");
    set(() => ({ user: undefined }));
  },
}));

export { useAuth };
