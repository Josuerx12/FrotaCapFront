import { IUser } from "./user";
import { IWorkshop } from "./workShop";

export interface IMaintenceRequest {
  id: number;
  plate: string;
  driverName: string;
  driverPhone: string;
  protocol: string;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface IBudget {
  id: number;
  url: string;
  path: string;
  maintanceId: number;
  createdAt: Date;
  updatedAt: Date;
}
