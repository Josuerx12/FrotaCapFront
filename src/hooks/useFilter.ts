import { useMemo } from "react";
import { IMaintenceRequest } from "../interfaces/maintanceRequest";

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
  const waitingDelivery = useMemo(
    () => data?.filter((req) => req.status === 3),
    [data]
  );
  const waitingMaintence = useMemo(
    () => data?.filter((req) => req.status === 4),
    [data]
  );

  return {
    newRequests,
    schedulingRequests,
    deliverToTheWorkshop,
    waitingDelivery,
    waitingMaintence,
  };
}

export { useFilter };
