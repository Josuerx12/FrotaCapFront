/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../config/api";

export type CreateWorkshopCredentials = {
  email: string;
  name: string;
  phone: string;
  password: string;
  address: {
    cep: number;
    street: string;
    number: number;
    city: string;
    state: string;
    country: string;
  };
};

export type EditWorkshopCredentials = {
  email?: string;
  name?: string;
  phone?: string;
  password?: string;
};

function useWorkshop() {
  async function createWorkshop(
    credentials: CreateWorkshopCredentials
  ): Promise<string> {
    try {
      const res = (await api.post("/workshop", credentials)).data;

      return res;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function deleteWorkshop(id: number): Promise<string> {
    try {
      const res = (await api.delete("/workshop/" + id)).data;

      return res;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function editWorkshop({
    id,
    credentials,
  }: {
    id: number;
    credentials: EditWorkshopCredentials;
  }): Promise<string> {
    try {
      const res = (await api.patch("/workshop/" + id, credentials)).data;

      return res;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  return { createWorkshop, deleteWorkshop, editWorkshop };
}

export { useWorkshop };
