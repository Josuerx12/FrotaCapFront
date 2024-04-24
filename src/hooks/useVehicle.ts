/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from "../config/api";
import Cookies from "js-cookie";

export type VehicleCredentials = {
  name: string;
  providerId: number;
  plate: string;
};

export type EditCredentials = {
  id: number;
  credentials: {
    name: string;
    providerId: number;
    plate: string;
  };
};

const useVehicle = () => {
  const token = Cookies.get("refreshToken");

  async function CreateVehicle(
    credentials: VehicleCredentials
  ): Promise<string> {
    try {
      const res = await api(token).post("/vehicle", credentials);

      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function EditVehicle({
    id,
    credentials,
  }: EditCredentials): Promise<string> {
    try {
      const res = await api(token).patch("/vehicle/" + id, credentials);

      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function DeleteVehicle(id: number): Promise<string> {
    try {
      const res = await api(token).delete("/vehicle/" + id);

      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  return { CreateVehicle, EditVehicle, DeleteVehicle };
};

export { useVehicle };
