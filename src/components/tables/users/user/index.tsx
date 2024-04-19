import { FaInfoCircle } from "react-icons/fa";
import { IUser } from "../../../../interfaces/user";
import { useState } from "react";
import UserDetails from "../../../modals/users/details";

const UserTableRow = ({ user }: { user: IUser }) => {
  const [isDetailing, setIsDetaling] = useState(false);

  console.log(user);
  return (
    <>
      <UserDetails
        show={isDetailing}
        handleClose={() => setIsDetaling((prev) => !prev)}
        user={user}
      />
      <tr className="border">
        <td className="border">
          <span className="flex justify-center items-center">{user.id}</span>
        </td>
        <td className="border">
          <span className="flex justify-center items-center">{user.name}</span>
        </td>
        <td className="border">
          <span className="flex justify-center items-center">{user.email}</span>
        </td>
        <td className="border">
          <span className="flex justify-center items-center">{user.phone}</span>
        </td>
        <td className="border">
          <div
            title={`Detalhes do usuário: ${user.name}`}
            className="flex justify-center items-center py-2"
          >
            <button
              onClick={() => setIsDetaling(true)}
              className="px-2 py-2 bg-size-200 bg-pos-0 hover:bg-pos-100 bg-gradient-to-r from-cyan-500 via-blue-400 to-cyan-700 duration-200 capitalize text-white font-bold rounded-md flex items-center gap-2"
            >
              detalhes <FaInfoCircle />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default UserTableRow;
