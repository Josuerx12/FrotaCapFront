import { IMaintenceRequest } from "./maintanceRequest";

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string[];
  MaintenceRequest: IMaintenceRequest[];
}
