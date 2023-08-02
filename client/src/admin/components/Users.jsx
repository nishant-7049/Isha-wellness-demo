import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import {
  deleteUser,
  editUser,
  getAllUsers,
  resetIsDeleted,
  resetIsUpdated,
} from "../../store/slices/allUserSlice";
import { useSelector, useDispatch } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import Loader from "../../auth/Loader";

const Users = () => {
  const dispatch = useDispatch();
  const cols = [
    {
      field: "avatar",
      headerName: "Avatar",
      minWidth: 100,
      flex: 0.3,
      headerClassName: "text-[#00286b] font-semibold",
      renderCell: (cellValues) => {
        return (
          <img
            src={cellValues.row.avatar}
            className="w-12 rounded-full mx-auto"
            alt=""
          />
        );
      },
    },
    {
      field: "id",
      headerName: "ID",
      minWidth: 100,
      flex: 0.3,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 0.3,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 100,
      flex: 0.3,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 100,
      flex: 0.3,
      renderCell: (cellValues) => {
        const updateUser = (e) => {
          const options = {
            id: cellValues.id,
            data: {
              name: cellValues.row.name,
              email: cellValues.row.email,
              role: e.target.value,
            },
          };
          dispatch(editUser(options));
        };
        return (
          <select className="bg-white" onChange={updateUser}>
            <option value={cellValues.row.role}>{cellValues.row.role}</option>
            <option value={"user"}>user</option>
            <option value={"admin"}>admin</option>
            <option value={"facilitator"}>facilitator</option>
            <option value={"therapist"}>therapist</option>
          </select>
        );
      },
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "action",
      headerName: "Actions",
      minWidth: 100,
      flex: 0.3,
      type: "number",
      headerClassName: "text-[#00286b] font-semibold",
      renderCell: (cellValues) => (
        <div className="flex text-2xl  justify-end">
          <Link to={`/admin/user/edit/${cellValues.id}`}>
            <BiEdit className="text-green-400" />
          </Link>
          <button
            onClick={() => {
              dispatch(deleteUser(cellValues.id));
            }}
          >
            <MdOutlineDeleteOutline className="text-red-700" />
          </button>
        </div>
      ),
    },
  ];
  const { users, loading, error, isDeleted, isUpdated } = useSelector(
    (state) => state.allUsers
  );
  const rows = [];
  users &&
    users.forEach((user) => {
      rows.push({
        avatar: user.avatar ? user.avatar.url : "/user.png",
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    });
  useEffect(() => {
    dispatch(getAllUsers());
    if (isUpdated) {
      dispatch(resetIsUpdated());
    }
    if (isDeleted) {
      dispatch(resetIsDeleted());
    }
  }, [dispatch, isUpdated, isDeleted]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex">
          <Sidebar />
          <div className="w-full mt-[6vmax]">
            <h1 className="text-3xl border-b-4 border-[#00286b] text-[#00286b] pb-2 font-bold w-fit text-center mx-auto sm:text-2xl sm:w-4/5">
              All Users
            </h1>
            <DataGrid
              className="my-8 w-4/5 mx-auto sm:w-[95%]"
              rows={rows}
              columns={cols}
              autoHeight
              rowSelection={false}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
