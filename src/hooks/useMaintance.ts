/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import { api } from "../config/api";

export type CreateMaintanceCredentials = {
  driverName: string;
  km: number;
  plate: string;
};

export type EditMaintanceCredentials = {
  status: number;
};

export const useMaintance = () => {
  const token = Cookies.get("refreshToken");

  async function createMaintance(credentials: CreateMaintanceCredentials) {
    try {
      const res = await api(token).post("/maintance-request", credentials);

      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function editMaintance({
    id,
    credentials,
  }: {
    id: number;
    credentials: EditMaintanceCredentials;
  }): Promise<string> {
    try {
      const res = await api(token).patch(
        "/maintance-request/" + id,
        credentials
      );

      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  return { createMaintance, editMaintance };
};
