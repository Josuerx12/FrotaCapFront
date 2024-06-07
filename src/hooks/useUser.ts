/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../config/api";
import { ICreateUserCredentials } from "../interfaces/user";

const useUser = () => {
  async function create(credentials: ICreateUserCredentials): Promise<string> {
    try {
      const res = (await api.post("/user", credentials)).data;
      return res;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function deleteUser(id: string): Promise<string> {
    try {
      const res = (await api.delete("/user/" + id)).data;
      return res;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function editUser({
    id,
    credentials,
  }: {
    id: string;
    credentials: any;
  }): Promise<string> {
    try {
      const res = (await api.patch("/user/" + id, credentials)).data;
      return res;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  return { create, deleteUser, editUser };
};

export { useUser };
