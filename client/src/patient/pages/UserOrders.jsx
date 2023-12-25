import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { getAllPackages } from "../../store/slices/packageSlice";
import { getUserOrders } from "../../store/slices/bookingSlice";

const UserOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, bookings } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.user);
  const { packages } = useSelector((state) => state.package);
  const cols = [
    {
      field: "problem",
      headerName: "Problem",
      minWidth: 200,
      flex: 0.3,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "date",
      headerName: "Date",
      type: "Date",
      minWidth: 100,
      flex: 0.3,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "time",
      headerName: "Time",
      minWidth: 100,
      flex: 0.3,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "payment",
      headerName: "Payment Type",
      minWidth: 100,
      flex: 0.3,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "isPaid",
      headerName: "Is Paid",
      minWidth: 100,
      flex: 0.3,
      renderCell: (cellValues) => {
        return (
          <>
            {cellValues.row.isPaid == true ? (
              <p className="text-green-400">Paid</p>
            ) : (
              <p className="text-red-800">Unpaid</p>
            )}
          </>
        );
      },
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.3,
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
          <Link to={`/user/orderDetail/${cellValues.id}`}>
            <BiEdit className="text-green-400" />
          </Link>
        </div>
      ),
    },
  ];
  const rows = [];
  bookings &&
    bookings.map((ther) => {
      const pac =
        packages &&
        packages.filter((pack) => {
          return ther.packageAndDate.package == pack._id;
        });
      const date = new Date(ther.packageAndDate.dateAndTime);
      rows.push({
        name: ther.personal.name,
        date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
        time: `${date.getHours()}:${date.getMinutes()}-${
          date.getHours() + 2
        }:${date.getMinutes()}`,
        status: ther.status,
        problem: ther.complaints.problem,
        payment: pac && pac[0] && pac[0].paymentType,
        isPaid: ther.payment ? true : false,
        id: ther._id,
      });
    });
  useEffect(() => {
    dispatch(getUserOrders());
    if (!packages) {
      dispatch(getAllPackages());
    }
  }, [dispatch]);
  return (
    <div className="w-full mt-[6vmax]">
      <h1 className="text-3xl border-b-4 border-[#00286b] text-[#00286b] pb-2 font-bold w-fit text-center mx-auto sm:text-2xl sm:w-4/5">
        My Orders
      </h1>
      <DataGrid
        rows={rows}
        columns={cols}
        autoHeight
        className="w-[90%] mx-auto my-8"
      />
    </div>
  );
};

export default UserOrders;
