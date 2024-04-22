import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaPager, FaUsers } from "react-icons/fa";
import { GiBodyBalance } from "react-icons/gi";
import { GoPackage } from "react-icons/go";
import { BsFillCartFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

import { useState } from "react";

const Sidebar = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  return (
    <>
      {sidebarToggle == true ? (
        <div className="fixed top-0 left-0 backdrop-blur-lg h-[100vh] flex flex-col py-[2vmax] px-[3vmax]  gap-8">
          <GiHamburgerMenu
            className="text-xl absolute text-[#00286b] cursor-pointer"
            onClick={() => {
              setSidebarToggle(!sidebarToggle);
            }}
          />

          <Link to="/" className="w-fit mx-auto">
            <img
              src="/images/IWC_logo_dark blue 1.png"
              alt="logo"
              className="w-[5vmax]"
            />
          </Link>
          <Link
            to="/admin/dashboard"
            className="flex gap-2 text-[#00286b] hover:translate-x-4 ease-in-out items-center"
          >
            <MdDashboard className="text-xl" />
            <h2 className="text-lg font-bold">Dashboard</h2>
          </Link>
          <Link
            to="/admin/edit/frontend"
            className="flex gap-2 text-[#00286b] hover:translate-x-4 ease-in-out items-center"
          >
            <FaPager className="text-xl" />
            <h2 className="text-lg font-bold">Frontpage</h2>
          </Link>
          <Link
            to="/admin/users"
            className="flex gap-2 text-[#00286b] hover:translate-x-4 ease-in-out items-center"
          >
            <FaUsers className="text-xl" />
            <h2 className="text-lg font-bold">Users</h2>
          </Link>
          <Link
            to="/admin/exercises"
            className="flex gap-2 text-[#00286b] hover:translate-x-4 ease-in-out items-center"
          >
            <GiBodyBalance className="text-xl" />
            <h2 className="text-lg font-bold">Exercises</h2>
          </Link>
          <Link
            to="/admin/packages"
            className="flex gap-2 text-[#00286b] hover:translate-x-4 ease-in-out items-center"
          >
            <GoPackage className="text-xl" />
            <h2 className="text-lg font-bold">Packages</h2>
          </Link>
          <Link
            to="/admin/orders"
            className="flex gap-2 text-[#00286b] hover:translate-x-4 ease-in-out items-center"
          >
            <BsFillCartFill className="text-xl" />
            <h2 className="text-lg font-bold">Appointments</h2>
          </Link>
        </div>
      ) : (
        <div className="fixed top-0  left-0 backdrop-blur-lg w-fit h-[100vh] flex flex-col py-4 px-4  gap-8 sm:h-fit ">
          <GiHamburgerMenu
            className="text-2xl text-[#00286b] cursor-pointer "
            onClick={() => {
              setSidebarToggle(!sidebarToggle);
            }}
          />
          <Link
            to="/admin/dashboard"
            className="flex gap-2 text-[#00286b] hover:translate-x-1 ease-in-out items-center"
          >
            <MdDashboard className="text-2xl" />
          </Link>
          <Link
            to="/admin/edit/frontend"
            className="flex gap-2 text-[#00286b] hover:translate-x-1 ease-in-out items-center"
          >
            <FaPager className="text-2xl" />
          </Link>
          <Link
            to="/admin/users"
            className="flex gap-2 text-[#00286b] hover:translate-x-1 ease-in-out items-center"
          >
            <FaUsers className="text-2xl" />
          </Link>
          <Link
            to="/admin/exercises"
            className="flex gap-2 text-[#00286b] hover:translate-x-1 ease-in-out items-center"
          >
            <GiBodyBalance className="text-2xl" />
          </Link>
          <Link
            to="/admin/packages"
            className="flex gap-2 text-[#00286b] hover:translate-x-1 ease-in-out items-center"
          >
            <GoPackage className="text-2xl" />
          </Link>
          <Link
            to="/admin/orders"
            className="flex gap-2 text-[#00286b] hover:translate-x-1 ease-in-out items-center"
          >
            <BsFillCartFill className="text-2xl" />
          </Link>
        </div>
      )}
    </>
  );
};

export default Sidebar;
