import { ReactNode } from "react";

const Folder = ({
  children,
  folderName,
}: {
  children: ReactNode;
  folderName: string;
}) => {
  return (
    <div className="h-[95%] min-w-80 w-96 border m-2 rounded-lg shadow overflow-auto relative">
      <h3 className="bg-neutral-100 z-[1] capitalize sticky top-0 p-2 text-center text-xl font-bold text-neutral-800 drop-shadow-md rounded-tl-lg">
        {folderName}
      </h3>

      <div className="w-full p-2 my-4">
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </div>
  );
};

export { Folder };
