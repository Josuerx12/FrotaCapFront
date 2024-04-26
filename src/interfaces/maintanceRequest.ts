import { IUser } from "./user";

export interface IMaintenceRequest {
  id: number;
  plate: string;
  driverName: string;
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
  status: number;
  atendedBy?: string;
  atendedAt?: Date;
  scheduledAt?: string | Date;
  timeToSchedule?: number;
  finishedBy?: string;
  finishedAt?: Date;
  checkoutBy?: string;
  checkoutAt?: Date | string;
  budget?: IBudget[];
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
