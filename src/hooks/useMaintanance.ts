/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import { api } from "../config/api";

export type CreateMaintanceCredentials = {
  os: number;
  driverName: string;
  driverPhone: string;
  km: number;
  plate: string;
  service: string;
};

export type EditMaintanceCredentials = {
  status: number;
  workShopId?: number;
  deadlineToDeliver?: string | Date;
  deadlineToForward?: string | Date;
  budget?: FileList;
  checkoutBy?: string;
};

const useMaintance = () => {
  const token = Cookies.get("refreshToken");
  const wsToken = Cookies.get("workshopToken");

  async function createMaintance(credentials: CreateMaintanceCredentials) {
    try {
      credentials.os = Number(credentials.os);
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

    if (credentials.budget) {
      formData.append("budget", credentials.budget[0]);
    }
    if (credentials.status) {
      formData.append("status", String(credentials.status));
    }
    if (credentials.deadlineToForward) {
      formData.append(
        "deadlineToForward",
        String(credentials.deadlineToForward)
      );
    }
    if (credentials.deadlineToDeliver) {
      formData.append(
        "deadlineToDeliver",
        String(credentials.deadlineToDeliver)
      );
    }
    if (credentials.workShopId) {
      formData.append("workShopId", String(credentials.workShopId));
    }
    if (credentials.checkoutBy) {
      formData.append("checkoutBy", String(credentials.checkoutBy));
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
