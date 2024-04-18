import { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

type Props = {
  children: ReactNode;
  modalName: string;
  isOpen: boolean;
  isClickOutHiddeble?: boolean;
  hidden: () => void;
};

const Modal = ({
  modalName,
  children,
  hidden,
  isOpen,
  isClickOutHiddeble,
}: Props) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div
      onClick={() => {
        if (isClickOutHiddeble) {
          hidden();
        }
      }}
      className="bg-[#6b6b6b91] z-10 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none"
    >
      <div
        className="mx-2 bg-white  max-w-screen-lg w-full rounded drop-shadow-lg"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between bg-gray-200 p-4 rounded-t">
          <h3 className="text-base md:text-xl font-bold capitalize">
            {modalName}
          </h3>
          <button title={`Fechar ${modalName}`} onClick={hidden}>
            <FaTimes size={25} />
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
