/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { api } from "../config/api";
import Cookies from "js-cookie";
import { IWorkshop } from "../interfaces/workShop";

export type AuthCredentials = {
  email: string;
  password: string;
};

type State = {
  workshop?: IWorkshop;
};

type Actions = {
  login: (credentials: AuthCredentials) => Promise<string>;
  getWs: () => Promise<string>;
  logout: () => void;
};

const useAuthWs = create<State & Actions>((set) => ({
  workshop: undefined,
  login: async (credentials: AuthCredentials) => {
    try {
      const res = await api().post("/auth/login/ws", credentials);

      const token = res.data.token;

      Cookies.set("workshopToken", token);

      return "Login realizado com sucesso!";
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getWs: async () => {
    const token = Cookies.get("workshopToken");

    try {
      const res = await (
        await api(token).get("/workshop/detail")
      ).data.workshop;

      set(() => ({ workshop: res }));

      return "Dados da oficina coletado com sucesso!";
    } catch (error: any) {
      throw error.response.data;
    }
  },
  logout: () => {
    Cookies.remove("workshopToken");
    set(() => ({ workshop: undefined }));
  },
}));

export { useAuthWs };
