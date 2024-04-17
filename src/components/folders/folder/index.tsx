import { ReactNode } from "react";

const Folder = ({
  children,
  folderName,
}: {
  children: ReactNode;
  folderName: string;
}) => {
  return (
    <div className="h-[95%] w-96 border m-2 rounded-lg shadow overflow-auto relative">
      <h3 className="bg-neutral-100 capitalize sticky top-0 p-2 text-center text-xl font-bold text-neutral-800 drop-shadow-md rounded-tl-lg">
        {folderName}
      </h3>

      <div className="w-full p-2">
        <div>{children}</div>
      </div>
    </div>
  );
};

export { Folder };
