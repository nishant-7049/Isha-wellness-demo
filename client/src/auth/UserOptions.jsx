import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { MdDashboard, MdExitToApp } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { AiFillLayout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../store/slices/userSlice";
import ErrorAlert from "./ErrorAlert";

const UserOptions = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const orders = () => {
    navigate("/orders");
  };

  const account = () => {
    navigate("/account");
  };

  const dashboard = () => {
    navigate("/admin/dashboard");
  };

  const { message } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(logOut());
  };

  const options = [
    {
      icon: <FaUserAlt className="text-xl" />,
      name: "Profile",
      func: account,
    },
    {
      icon: <MdExitToApp className="text-xl" />,
      name: "LogOut",
      func: logoutUser,
    },
  ];

  if (user && user.role == "admin") {
    options.unshift({
      icon: <MdDashboard className="text-xl" />,
      name: "DashBoard",
      func: dashboard,
    });
  }

  useEffect(() => {
    {
      !isAuthenticated && navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="w-fit fixed right-[2vmax] top-[6vmax] z-10 sm:top-[14vmax]">
      {isAuthenticated ? (
        <>
          <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            direction="down"
            icon={
              <img
                className="rounded-full w-fit "
                src={user && user.avatar ? user.avatar.url : "/user.png"}
                alt="profile"
              />
            }
          >
            {options.map((data) => (
              <SpeedDialAction
                key={data.name}
                icon={data.icon}
                tooltipTitle={data.name}
                onClick={data.func}
              />
            ))}
          </SpeedDial>
        </>
      ) : (
        <>
          {message ? (
            <ErrorAlert className="absolute" message={message} alert={false} />
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default UserOptions;
