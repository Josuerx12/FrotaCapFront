import { IUser } from "./user";
import { IWorkshop } from "./workShop";

export interface IMaintenceRequest {
  id: number;
  os: number;
  plate: string;
  driverName: string;
  driverPhone: string;
  protocol?: string;
  km: number;
  service: string;
  serviceEndAt?: string | Date;
  serviceStartAt?: string | Date;
  serviceTime?: number;
  Owner: IUser;
  ownerId: string;
  observation?: string;
  deadlineToForward?: Date | string;
  deadlineToDeliver?: Date | string;
  delivered: boolean;
  deliveredAt?: Date | string;
  Workshop?: IWorkshop;
  status: number;
  atendedBy?: string;
  atendedAt?: Date;
  scheduledAt?: string | Date;
  timeToSchedule?: number;
  finishedBy?: string;
  finishedAt?: Date;
  checkoutBy?: string;
  checkoutAt?: Date | string;
  budgets?: IBudget[];
  osDocuments?: IOsDocument[];
  createdAt: Date;
  updatedAt: Date;
  evidence?: IEvidence[];
}

export interface IOsDocument {
  id: number;
  url: string;
  maintanceId: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IBudget {
  id: number;
  url: string;
  maintanceId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEvidence {
  id: number;
  key: string;
  url: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  maintenanceId: number;
}
