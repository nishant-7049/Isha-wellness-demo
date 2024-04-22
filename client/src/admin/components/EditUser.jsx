import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../auth/Loader";
import ErrorAlert from "../../auth/ErrorAlert";
import { AiOutlineUser, AiFillMail } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";

import {
  clearUser,
  editUser,
  getUser,
  resetIsUpdated,
} from "../../store/slices/allUserSlice";

const clusters = ["Indore", "Ratlam", "Jaora", "Ahmedabad"];
const EditUser = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState();
  const [selectedClusters, setSelectedClusters] = useState([]);
  const [isSelectingClusters, setIsSelectingClusters] = useState(false);

  const { id } = useParams();

  const { user, isUpdated, loading, error } = useSelector(
    (state) => state.allUsers
  );
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      role,
      cluster: selectedClusters,
    };

    const options = {
      id,
      data,
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
      setSelectedClusters(user.cluster);
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

              <div>
                <div
                  className="flex gap-6 justify-center items-center"
                  onClick={() => setIsSelectingClusters(!isSelectingClusters)}
                >
                  <div className="text-md cursor-default">Clusters</div>
                  <FaChevronDown className="text-xs" />
                </div>

                {isSelectingClusters && (
                  <div className="border-[1px] shadow-lg rounded-lg absolute bg-white">
                    {clusters.map((cluster) => (
                      <div
                        key={cluster}
                        className={`${
                          selectedClusters.includes(cluster)
                            ? "bg-[#00286b] text-white"
                            : ""
                        } p-1 text-md pointer-default`}
                        onClick={() => {
                          setSelectedClusters((prevClusters) => {
                            if (prevClusters.includes(cluster)) {
                              return prevClusters.filter(
                                (clus) => clus != cluster
                              );
                            } else {
                              return [...prevClusters, cluster];
                            }
                          });
                        }}
                      >
                        {cluster}
                      </div>
                    ))}
                  </div>
                )}
              </div>

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
