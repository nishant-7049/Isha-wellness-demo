import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBooking,
  getClusterBookings,
  resetIsBookingDeleted,
} from "../../store/slices/bookingSlice";
import { getAllPackages } from "../../store/slices/packageSlice";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import SearchAppointment from "./SearchAppointment";

const OrderList = () => {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    bookings,
    bookingsCount,
    payment,
    isBookingDeleted,
    isUpdated,
  } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.user);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState("");
  const { packages } = useSelector((state) => state.package);

  const cols = [
    {
      field: "name",
      headerName: "Patient Name",
      minWidth: 150,
      flex: 0.3,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "location",
      headerName: "Location",
      minWidth: 200,
      flex: 0.3,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "phone",
      headerName: "Phone No.",
      minWidth: 120,
      flex: 0.3,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "sessions",
      headerName: "Sessions Left",
      minWidth: 100,
      type: "number",
      flex: 0.3,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "valid",
      headerName: "Valid Till",
      minWidth: 120,
      flex: 0.3,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "date",
      headerName: "Scheduled Date",
      type: "Date",
      minWidth: 120,
      flex: 0.3,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "time",
      headerName: "Batch",
      minWidth: 120,
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
      headerClassName: "text-[#00286b] font-semibold",
      renderCell: (cellValues) => {
        return (
          <>
            {cellValues.row.isPaid ? (
              <p className="text-green-400 font-semibold">Paid</p>
            ) : (
              <p className="text-red-800 font-semibold">Unpaid</p>
            )}
          </>
        );
      },
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
      type: "number",
      flex: 0.3,
      headerClassName: "text-[#00286b] font-semibold",
      renderCell: (cellValues) => (
        <div className="flex text-2xl  justify-end">
          {user.role == "admin" ? (
            <Link to={`/admin/order/detail/${cellValues.id}`}>
              <BiEdit className="text-green-400" />
            </Link>
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
  bookings &&
    bookings.map((ther) => {
      const date = new Date(ther.packageAndDate.dateAndTime);
      rows.push({
        name: ther.personal.name,
        date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
        time: `${date.getHours()}:${date.getMinutes()}-${
          date.getHours() + 2
        }:${date.getMinutes()}`,
        status: ther.status,
        location: ther.personal.location + ": " + ther.personal.address,
        phone: ther.personal.phone,
        sessions: ther.sessions,
        valid: new Date(ther.validTill).toISOString().split("T")[0],
        payment: ther.paymentType,
        isPaid: ther.payment ? true : false,
        id: ther._id,
      });
    });

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 15,
    page: 0,
  });

  const submitHandler = () => {
    const options = {
      keyword,
      page: paginationModel.page + 1 || 1,
      limit: paginationModel.pageSize,
    };
    dispatch(getClusterBookings(options));
    setResults(keyword);
  };

  useEffect(() => {
    console.log(keyword);
    const options = {
      keyword,
      page: paginationModel.page + 1 || 1,
      limit: paginationModel.pageSize,
    };
    dispatch(getClusterBookings(options));
    if (!packages) {
      dispatch(getAllPackages());
    }
    if (isBookingDeleted) {
      dispatch(resetIsBookingDeleted());
    }
  }, [isBookingDeleted, isUpdated, paginationModel]);
  return (
    <div className="w-full my-8 flex flex-col gap-2">
      <h1 className="text-3xl border-b-4 border-[#00286b] text-[#00286b] pb-2 font-bold w-fit text-center mx-auto sm:text-2xl sm:w-4/5">
        Appointments
      </h1>
      <Link
        to="/enquiry"
        className="block text-[#00286b] cursor-pointer absolute right-24 font-bold sm:static sm:w-full sm:text-center"
      >
        view enquiries
      </Link>
      <SearchAppointment
        keyword={keyword}
        setKeyword={setKeyword}
        submitHandler={submitHandler}
      />
      {results && (
        <p className="w-[90%] mx-auto text-gray-400 text-sm">
          Showing Results for '{results}'
        </p>
      )}
      <DataGrid
        rows={rows}
        columns={cols}
        autoHeight
        className="w-[90%] mx-auto"
        rowCount={bookingsCount}
        loading={loading}
        pageSizeOptions={[15]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
      />
    </div>
  );
};

export default OrderList;
