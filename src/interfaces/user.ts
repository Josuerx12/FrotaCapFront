import { IMaintenceRequest } from "./maintenanceRequest";

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  frotas: boolean;
  admin: boolean;
  requester: boolean;
  MaintenceRequest: IMaintenceRequest[];
}

export interface ICreateUserCredentials {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  admin: boolean;
  frotas: boolean;
}
