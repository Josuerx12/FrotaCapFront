/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import { api } from "../config/api";

export type CreateMaintanceCredentials = {
  driverName: string;
  km: number;
  plate: string;
  service: string;
};

export type EditMaintanceCredentials = {
  status: number;
  workshopId?: string;
  deadlineToDeliver?: string | Date;
};

const useMaintance = () => {
  const token = Cookies.get("refreshToken");
  const wsToken = Cookies.get("workshopToken");

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
    const formData = new FormData();

    if (credentials.status) {
      formData.append("status", String(credentials.status));
    }
    if (credentials.deadlineToDeliver) {
      formData.append("status", String(credentials.deadlineToDeliver));
    }
    if (credentials.workshopId) {
      formData.append("status", String(credentials.workshopId));
    }

    try {
      const res = await api(token ? token : wsToken).patch(
        "/maintance-request/" + id,
        formData
      );

      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  return { createMaintance, editMaintance };
};

export { useMaintance };
