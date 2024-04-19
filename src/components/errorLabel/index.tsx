import { ReactNode } from "react";

const ErrorLabel = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-red-600 bg-red-100 p-2 rounded-lg ">
      <span className="text-red-800 font-bold ">Error:</span> {children}
    </p>
  );
};

export default ErrorLabel;
