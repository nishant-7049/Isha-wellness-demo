import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEnquiries } from "../../store/slices/enquirySlice";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import Loader from "../../auth/Loader";
import { DataGrid } from "@mui/x-data-grid";

const Enquiries = () => {
  const dispatch = useDispatch();
  const { loading, enquiries } = useSelector((state) => state.enquiry);
  const { user } = useSelector((state) => state.user);

  const cols = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "phone",
      headerName: "Phone",
      minWidth: 150,
      flex: 1,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "city",
      headerName: "City",
      minWidth: 150,
      flex: 1,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "location",
      headerName: "Location Preferance",
      minWidth: 150,
      flex: 1,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "action",
      headerName: "Resolve",
      minWidth: 150,
      flex: 1,
      headerClassName: "text-[#00286b] font-semibold",
      type: "number",
      renderCell: (cellValues) => {
        return (
          <div>
            <Link to={`/enquiry/${cellValues.row.id}`}>
              <BiEdit className=" text-green-400 text-2xl" />
            </Link>
          </div>
        );
      },
    },
  ];

  const rows = [];
  enquiries &&
    enquiries.map((enquiry) => {
      rows.push({
        id: enquiry._id,
        name: enquiry.name,
        phone: enquiry.phone,
        city: enquiry.city,
        location: enquiry.location,
      });
    });
  useEffect(() => {
    dispatch(getEnquiries());
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full mt-24">
          <div className="w-[90%] p-4 shadow-lg mx-auto ">
            <h1 className="text-[#00286b] text-xl text-center font-semibold mb-4">
              Enquiries
            </h1>
            <div className="h-[80vh] w-full">
              <DataGrid
                rows={rows}
                columns={cols}
                getRowHeight={() => {
                  "10";
                }}
                className=" mx-auto "
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Enquiries;
