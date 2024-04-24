/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import { api } from "../config/api";
import { ICreateUserCredentials } from "../interfaces/user";

const useUser = () => {
  const token = Cookies.get("refreshToken");
  async function create(credentials: ICreateUserCredentials): Promise<string> {
    try {
      const res = (await api(token).post("/user", credentials)).data;
      return res;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function deleteUser(id: string): Promise<string> {
    try {
      const res = (await api(token).delete("/user/" + id)).data;
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
      const res = (await api(token).patch("/user/" + id, credentials)).data;
      return res;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  return { create, deleteUser, editUser };
};

export { useUser };
