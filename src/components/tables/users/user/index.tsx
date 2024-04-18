import { FaInfoCircle } from "react-icons/fa";
import { IUser } from "../../../../interfaces/user";

const UserTableRow = ({ user }: { user: IUser }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>
        <button className="px-2 py-1 rounded-md">
          detalhes <FaInfoCircle />
        </button>
      </td>
    </tr>
  );
};

export default UserTableRow;
