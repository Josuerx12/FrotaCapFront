/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import Cookies from "js-cookie";
import { api } from "../config/api";
import { IMaintenceRequest } from "../interfaces/maintenanceRequest";
import { IUser } from "../interfaces/user";
import { IVehicle } from "../interfaces/vehicle";
import { IProvider } from "../interfaces/provider";
import { IWorkshop } from "../interfaces/workShop";

function useFetch() {
  const token = Cookies.get("refreshToken");
  const wsToken = Cookies.get("workshopToken");

  async function fetchAllMaintenceRequests(): Promise<IMaintenceRequest[]> {
    try {
      const res = (await api(token).get("/maintance-request")).data.requests;
      return res;
    } catch (error: any) {
      throw error.response.data;
    }
  }
  async function fetchUserMaintenceRequests(): Promise<IMaintenceRequest[]> {
    try {
      const res = (await api(token).get("/maintance-request/user")).data
        .requests;
      return res;
    } catch (error: any) {
      throw error.response.data;
    }
  }
  async function fetchWorkShopMaintenceRequests(): Promise<
    IMaintenceRequest[]
  > {
    try {
      const res = (await api(wsToken).get("/maintance-request/ws")).data
        .requests;

      return res;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function fetchUsers(): Promise<IUser[]> {
    try {
      const res = (await api(token).get("/user")).data.users;
      return res;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function fetchWorkshops(): Promise<IWorkshop[]> {
    try {
      const res = (await api(token).get("/workshop")).data.workshops;
      return res;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function fetchVehicles(): Promise<IVehicle[]> {
    try {
      const res = (await api(token).get("/vehicle")).data.vehicles;
      return res;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function fetchProviders(): Promise<IProvider[]> {
    try {
      const res = (await api(token).get("/provider")).data.providers;
      return res;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  return {
    fetchAllMaintenceRequests,
    fetchUserMaintenceRequests,
    fetchWorkShopMaintenceRequests,
    fetchUsers,
    fetchVehicles,
    fetchProviders,
    fetchWorkshops,
  };
}

export { useFetch };
