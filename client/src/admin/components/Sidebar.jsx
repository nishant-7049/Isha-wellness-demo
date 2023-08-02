import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaPager, FaUsers } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sticky top-[5rem] mt-20 left-0 h-[100vh] border-r-2 flex flex-col py-[2vmax] px-[4vmax] w-1/3 gap-8 sm:w-full sm:static sm:h-fit ">
      <Link to="/">
        <img
          src="/images/Isha Logo final.jpg"
          alt="logo"
          className="w-[7vmax] mx-auto"
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
    </div>
  );
};

export default Sidebar;
