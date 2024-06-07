/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../config/api";

export type CreateProviderCredentials = {
  name: string;
};

const useProvider = () => {
  async function create(
    credentials: CreateProviderCredentials
  ): Promise<string> {
    try {
      const res = await api.post("/provider", credentials);

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
      const res = await api.patch("/provider/" + id, credentials);

      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function deleteProvider(id: number): Promise<string> {
    try {
      const res = await api.delete("/provider/" + id);

      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  return { create, editProvider, deleteProvider };
};

export { useProvider };
