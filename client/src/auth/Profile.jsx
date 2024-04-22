import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const Profile = () => {
  const { loading, user } = useSelector((state) => state.user);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="w-[100%] min-h-[100vh] flex sm:flex-col  ">
            <div className="w-full flex flex-col p-[8vmax] gap-8">
              <h1 className="text-3xl font-bold sm:text-center">My Profile</h1>
              <img
                src={user.avatar ? user.avatar.url : "/user.png"}
                alt="profile"
                className="h-[50vh] w-fit rounded-full mx-auto"
              />
              <Link
                to="/me/update"
                className="mx-auto bg-[#00286b] px-[1.5vmax] py-[0.6vmax] w-[50%] text-center text-white font-semibold"
              >
                Change Profile
              </Link>
            </div>
            <div className="w-full flex flex-col justify-evenly p-[6vmax] sm:gap-8">
              <div className="flex flex-col">
                <h4 className="text-xl font-semibold">Full Name</h4>
                <p className="text-gray-400">{user.name}</p>
              </div>
              <div className="flex flex-col">
                <h4 className="text-xl font-semibold">Email</h4>
                <p className="text-gray-400">{user.email}</p>
              </div>
              <div className="flex flex-col">
                <h4 className="text-xl font-semibold">Role</h4>
                <p className="text-gray-400">{user.role}</p>
              </div>
              <div className="flex flex-col">
                <h4 className="text-xl font-semibold">Joined At</h4>
                <p className="text-gray-400">
                  {String(user.createdAt).substring(0, 10)}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <Link
                  to="/user/orders"
                  className=" bg-gray-400 px-[1.5vmax] py-[0.6vmax] w-[80%] text-center text-white font-semibold sm:mx-auto"
                >
                  My Orders
                </Link>
                <Link
                  to="/password/update"
                  className=" bg-gray-400 px-[1.5vmax] py-[0.6vmax] w-[80%] text-center text-white font-semibold sm:mx-auto"
                >
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
