import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../auth/Loader";
import ErrorAlert from "../../auth/ErrorAlert";
import { AiOutlineUser, AiFillMail } from "react-icons/ai";
import {
  clearUser,
  editUser,
  getUser,
  resetIsUpdated,
} from "../../store/slices/allUserSlice";

const EditUser = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState();
  const [cluster, setCluster] = useState();

  const { id } = useParams();

  const { user, isUpdated, loading, error } = useSelector(
    (state) => state.allUsers
  );
  const submitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.set("name", name);
    formdata.set("email", email);
    formdata.set("role", role);
    formdata.set("cluster", cluster);

    const options = {
      id,
      data: formdata,
    };
    dispatch(editUser(options));
  };

  useEffect(() => {
    if (!user || id !== user._id) {
      dispatch(getUser(id));
    }
    if (isUpdated) {
      dispatch(resetIsUpdated());
      dispatch(getUser(id));
    }
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setCluster(user.cluster);
    }
  }, [dispatch, isUpdated, user]);

  return (
    <>
      <div className="flex sm:flex-col">
        <Sidebar />
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full h-[100vh] flex justify-center items-center ">
            <form
              onSubmit={submitHandler}
              className="flex flex-col relative top-[2vmax] gap-8 shadow-lg shadow-[#00286b] border-2 p-[2vmax] items-center w-2/5 sm:shadow-none sm:w-[95%] sm:p-[1vmax]"
            >
              <h1 className="text-2xl font-bold border-b-4 text-[#00286b] border-[#00286b] w-3/5 text-center mx-auto">
                Edit User
              </h1>
              <div className="flex gap-4 items-center w-4/5 ">
                <AiOutlineUser className="text-xl" />
                <input
                  className=" px-[1vmax] py-[0.5vmax] bg-white border-2 w-full  "
                  type="text"
                  placeholder="Enter User name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="flex gap-4 items-center w-4/5 ">
                <AiFillMail className="text-xl" />
                <input
                  className=" px-[1vmax] py-[0.5vmax] bg-white border-2 w-full "
                  type="text"
                  placeholder="Enter User email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <select
                className="bg-white"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option value={role}>{role}</option>
                <option value="user">user</option>
                <option value="admin">admin</option>
                <option value="facilitator">facilitator</option>
                <option value="therapist">therapist</option>
              </select>

              <select
                className="bg-white"
                onChange={(e) => {
                  setCluster(e.target.value);
                }}
              >
                <option value={cluster}>{cluster}</option>
                <option value="Indore">Indore</option>
                <option value="Ratlam">Ratlam</option>
                <option value="Jaora">Jaora</option>
                <option value="Ahmedabad">Ahmedabad</option>
              </select>

              <input
                type="submit"
                className="py-[0.8vmax] bg-[#00286b] w-3/5 text-white font-semibold cursor-pointer"
              />
            </form>
          </div>
        )}
      </div>
      {error && <ErrorAlert message={error} alert={true} />}
      {isUpdated && (
        <ErrorAlert message={"User updated successfully."} alert={false} />
      )}
    </>
  );
};

export default EditUser;
