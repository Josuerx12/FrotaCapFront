import { useMemo } from "react";
import { IMaintenceRequest } from "../interfaces/maintenanceRequest";

function useFilter(data?: IMaintenceRequest[]) {
  const newRequests = useMemo(
    () => data?.filter((req) => req.status === 0),
    [data]
  );
  const schedulingRequests = useMemo(
    () => data?.filter((req) => req.status === 1),
    [data]
  );
  const deliverToTheWorkshop = useMemo(
    () => data?.filter((req) => req.status === 2),
    [data]
  );
  const waitingBudget = useMemo(
    () => data?.filter((req) => req.status === 3),
    [data]
  );
  const waitingMaintenance = useMemo(
    () => data?.filter((req) => req.status === 4),
    [data]
  );
  const inMaintenance = useMemo(
    () => data?.filter((req) => req.status === 5),
    [data]
  );

  return {
    newRequests,
    schedulingRequests,
    deliverToTheWorkshop,
    waitingBudget,
    waitingMaintenance,
    inMaintenance,
  };
}

export { useFilter };
