import { ReactNode } from "react";

const ErrorLabel = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-red-300 bg-red-950 p-2 rounded-lg">
      <span className="text-red-500 font-bold ">Error:</span> {children}
    </p>
  );
};

export default ErrorLabel;
