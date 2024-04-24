import { IProvider } from "./provider";

export interface IVehicle {
  id: number;
  name: string;
  plate: string;
  providerId: number;
  createdAt: string;
  updatedAt: string;
  provider: IProvider;
}
