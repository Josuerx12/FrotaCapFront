import { IVehicle } from "./vehicle";

export interface IProvider {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  Vehicle: IVehicle[];
}
