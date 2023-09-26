import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBooking,
  getAllBookings,
  resetIsBookingDeleted,
} from "../../store/slices/bookingSlice";
import { getAllPackages } from "../../store/slices/packageSlice";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const OrderList = () => {
  const dispatch = useDispatch();
  const { loading, error, bookings, payment, isBookingDeleted, isUpdated } =
    useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.user);
  const { packages } = useSelector((state) => state.package);

  const cols = [
    { field: "name", headerName: "Booked by", minWidth: 150, flex: 0.3 },
    { field: "problem", headerName: "Problem", minWidth: 200, flex: 0.3 },
    {
      field: "date",
      headerName: "Date",
      type: "Date",
      minWidth: 100,
      flex: 0.3,
    },
    { field: "time", headerName: "Time", minWidth: 100, flex: 0.3 },
    { field: "payment", headerName: "Payment Type", minWidth: 100, flex: 0.3 },
    { field: "isPaid", headerName: "Is Paid", minWidth: 100, flex: 0.3 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.3,
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
          {user.role == "admin" ? (
            <div className="flex gap-1">
              <Link to={`/admin/order/detail/${cellValues.id}`}>
                <BiEdit className="text-green-400" />
              </Link>
              <button
                onClick={() => {
                  dispatch(deleteBooking(cellValues.row.id));
                }}
              >
                <MdOutlineDeleteOutline className="text-red-700" />
              </button>
            </div>
          ) : (
            <Link to={`/incharge/orderDetail/${cellValues.id}`}>
              <BiEdit className="text-green-400" />
            </Link>
          )}
        </div>
      ),
    },
  ];
  const rows = [];
  let paymentType;
  bookings &&
    bookings.forEach((book) => {
      for (let i in packages) {
        if (book.package == packages[i].name) {
          paymentType = packages[i].paymentType;
          break;
        }
      }
      const date = new Date(book.date);
      rows.push({
        id: book._id,
        name: book.name,
        problem: book.problem,
        createdAt: book.createdAt,
        status: book.status,
        date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
        time: book.batch,
        payment: paymentType,
        isPaid: book.payment ? true : false,
      });
    });

  useEffect(() => {
    dispatch(getAllBookings());
    if (!packages) {
      dispatch(getAllPackages());
    }
    if (isBookingDeleted) {
      dispatch(resetIsBookingDeleted());
    }
  }, [isBookingDeleted, isUpdated]);
  return (
    <div className="w-full mt-[6vmax]">
      <h1 className="text-3xl border-b-4 border-[#00286b] text-[#00286b] pb-2 font-bold w-fit text-center mx-auto sm:text-2xl sm:w-4/5">
        Orders
      </h1>
      <DataGrid
        rows={rows}
        columns={cols}
        autoHeight
        className="w-4/5 mx-auto my-8"
      />
    </div>
  );
};

export default OrderList;
