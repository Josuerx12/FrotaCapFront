/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../config/api";
import Cookies from "js-cookie";

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
  password?: string;
};

function useWorkshop() {
  const token = Cookies.get("refreshToken");

  async function createWorkshop(
    credentials: CreateWorkshopCredentials
  ): Promise<string> {
    try {
      const res = (await api(token).post("/workshop", credentials)).data;

      return res;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function deleteWorkshop(id: number): Promise<string> {
    try {
      const res = (await api(token).delete("/workshop/" + id)).data;

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
      const res = (await api(token).patch("/workshop/" + id, credentials)).data;

      return res;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  return { createWorkshop, deleteWorkshop, editWorkshop };
}

export { useWorkshop };
