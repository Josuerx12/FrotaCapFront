/* eslint-disable @typescript-eslint/no-explicit-any */
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
  protocol?: string;
  evidences?: FileList;
  osDocument?: FileList;
};

const useMaintance = () => {
  async function createMaintance(credentials: CreateMaintanceCredentials) {
    try {
      credentials.os = Number(credentials.os);
      const res = await api.post("/maintance-request", credentials);

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

    const { evidences } = credentials;

    if (credentials.budget) {
      formData.append("files", credentials.budget[0]);
    }
    if (credentials.osDocument) {
      formData.append("files", credentials.osDocument[0]);
    }
    if (evidences) {
      console.log(evidences);
      for (let i = 0; i < evidences.length; i++) {
        formData.append("files", evidences[i]);
      }
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
    if (credentials.protocol) {
      formData.append("protocol", String(credentials.protocol));
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
      const res = await api.patch("/maintance-request/" + id, formData);

      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function deleteMaintanance(id: string) {
    try {
      const res = await api.delete("/maintance-request/" + id);
      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  return { createMaintance, editMaintance, deleteMaintanance };
};

export { useMaintance };
