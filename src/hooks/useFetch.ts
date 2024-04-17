/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import Cookies from "js-cookie";
import { api } from "../config/api";
import { IMaintenceRequest } from "../interfaces/maintanceRequest";

function useFetch() {
  const token = Cookies.get("refreshToken");
  async function fetchAllMaintenceRequests(): Promise<IMaintenceRequest[]> {
    try {
      const res = (await api(token).get("/maintance-request")).data.requests;
      return res;
    } catch (error: any) {
      throw error;
    }
  }
  async function fetchUserMaintenceRequests(): Promise<IMaintenceRequest[]> {
    try {
      const res = (await api(token).get("/maintance-request/user")).data
        .requests;
      return res;
    } catch (error: any) {
      throw error;
    }
  }
  async function fetchWorkShopMaintenceRequests(): Promise<
    IMaintenceRequest[]
  > {
    try {
      const res = (await api(token).get("/maintance-request/workshop")).data
        .requests;
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  return {
    fetchAllMaintenceRequests,
    fetchUserMaintenceRequests,
    fetchWorkShopMaintenceRequests,
  };
}

export { useFetch };
