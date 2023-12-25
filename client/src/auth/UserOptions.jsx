import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { MdDashboard, MdExitToApp } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { TbPackages, TbPackage } from "react-icons/tb";
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

  const inchargeOrders = () => {
    navigate("/incharge/orders");
  };

  const therapistOrders = () => {
    navigate("/therapist/orders");
  };

  const facilitatorOrders = () => {
    navigate("/facilitator/orders");
  };

  const userOrders = () => {
    navigate("/user/orders");
  };

  const { message } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(logOut());
  };

  const options = [
    {
      icon: <TbPackages className="text-xl" />,
      name: "My Orders",
      func: userOrders,
    },
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
  if (user && user.isIncharge == true) {
    options.unshift({
      icon: <TbPackages className="text-xl" />,
      name: "Cluster Orders",
      func: inchargeOrders,
    });
  }
  if (user && user.role == "therapist") {
    options.unshift({
      icon: <TbPackage className="text-xl" />,
      name: "Therapist Orders",
      func: therapistOrders,
    });
  }
  if (user && user.role == "facilitator") {
    options.unshift({
      icon: <TbPackage className="text-xl" />,
      name: "Facilitator Orders",
      func: facilitatorOrders,
    });
  }

  useEffect(() => {
    {
      !isAuthenticated && navigate("/login");
    }
  }, [isAuthenticated]);

  const isSmallScreen = window.innerWidth < 600;
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
                src={user.avatar ? user.avatar.url : "/user.png"}
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
                tooltipOpen={isSmallScreen}
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
