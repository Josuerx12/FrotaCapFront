import { IMaintenceRequest } from "./maintanceRequest";

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  frotas: boolean;
  workshop: boolean;
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
  workshop: boolean;
}
