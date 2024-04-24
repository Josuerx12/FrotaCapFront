/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import { api } from "../config/api";

export type CreateProviderCredentials = {
  name: string;
};

const useProvider = () => {
  const token = Cookies.get("refreshToken");

  async function create(
    credentials: CreateProviderCredentials
  ): Promise<string> {
    try {
      const res = await api(token).post("/provider", credentials);

      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function editProvider({
    id,
    credentials,
  }: {
    id: number;
    credentials: any;
  }): Promise<string> {
    try {
      const res = await api(token).patch("/provider/" + id, credentials);

      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function deleteProvider(id: number): Promise<string> {
    try {
      const res = await api(token).delete("/provider/" + id);

      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  return { create, editProvider, deleteProvider };
};

export { useProvider };
