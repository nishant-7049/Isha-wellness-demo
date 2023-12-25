import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Loader from "../../auth/Loader";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const AdminPatientMeter = () => {
  const { loading, patientsData } = useSelector((state) => state.dashboard);
  const [regPat, setRegPat] = useState();
  const [curPat, setCurPat] = useState(0);
  const [droPat, setDroPat] = useState(0);
  const [enquiry, setEnquiry] = useState(0);
  const [mdNo, setMdNo] = useState(0);
  const [ndNo, setNdNo] = useState(0);
  const [ldNo, setLdNo] = useState(0);
  const [mdColor, setMdColor] = useState("");
  const [ndColor, setNdColor] = useState("");
  const [ldColor, setLdColor] = useState("");
  const [cluster, setCluster] = useState("");
  const setData = (patientsData) => {
    setRegPat(patientsData.length);
    let cur = 0;
    let dro = 0;
    let outcomeForm = 0;
    let outcome = 0;
    let md = 0;
    let nd = 0;
    let ld = 0;
    let mdRed = 0;
    let ndRed = 0;
    let ldRed = 0;
    let mdGreen = 0;
    let ndGreen = 0;
    let ldGreen = 0;
    let mdOrange = 0;
    let ndOrange = 0;
    let ldOrange = 0;
    for (let pd of patientsData) {
      if (pd.sessions[0] && pd.sessions[0].outcome) {
        if (pd.sessions[0].outcome.outcomeReason == "Cured") {
          cur++;
        } else {
          dro++;
        }
      }
      if (pd.sessions[0] && pd.sessions[0].isOutcomeFormSent) {
        outcomeForm++;
        if (pd.sessions[0].outcome) {
          outcome++;
        }
      }

      let psrs = [0, 0, 0];
      let psrLength = 0;
      for (let i = 0; i < pd.sessions.length; i++) {
        if (pd.sessions[i].questions.psr) {
          psrs[psrLength] = pd.sessions[i].questions.psr;
          psrLength++;
          if (psrLength >= 3) {
            break;
          }
        }
      }
      if (pd.problem == "Pain" || pd.problem == "Stiffness") {
        md++;
        if (psrLength == 1) {
          mdGreen++;
        } else if (psrLength == 2) {
          if (psrs[0] < psrs[psrLength - 1]) {
            mdGreen++;
          } else {
            mdOrange++;
          }
        } else if (psrLength == 3) {
          if (psrs[0] < psrs[psrLength - 1]) {
            mdGreen++;
          } else {
            mdRed++;
          }
        }
      } else if (pd.problem == "Lifestyle and Habits") {
        ld++;
        if (psrLength == 1) {
          ldGreen++;
        } else if (psrLength == 2) {
          if (psrs[0] < psrs[psrLength - 1]) {
            ldGreen++;
          } else {
            ldOrange++;
          }
        } else if (psrLength == 3) {
          if (psrs[0] < psrs[psrLength - 1]) {
            ldGreen++;
          } else {
            ldRed++;
          }
        }
      } else {
        nd++;
        if (psrLength == 1) {
          ndGreen++;
        } else if (psrLength == 2) {
          if (psrs[0] < psrs[psrLength - 1]) {
            ndGreen++;
          } else {
            ndOrange++;
          }
        } else if (psrLength == 3) {
          if (psrs[0] < psrs[psrLength - 1]) {
            ndGreen++;
          } else {
            ndRed++;
          }
        }
      }
    }
    let max = 0;
    if (mdRed >= max) {
      max = mdRed;
    }
    if (mdOrange >= max) {
      max = mdOrange;
    }
    if (mdGreen >= max) {
      max = mdGreen;
    }
    setMdColor(
      max == mdRed ? "#cc0000" : max == mdOrange ? "#ff6600" : "#009900"
    );
    max = 0;
    if (ndRed >= max) {
      max = ndRed;
    }
    if (ndOrange >= max) {
      max = ndOrange;
    }
    if (ndGreen >= max) {
      max = ndGreen;
    }
    setNdColor(
      max == ndRed ? "#cc0000" : max == ndOrange ? "#ff6600" : "#009900"
    );
    max = 0;
    if (ldRed >= max) {
      max = ldRed;
    }
    if (ldOrange >= max) {
      max = ldOrange;
    }
    if (ldGreen >= max) {
      max = ldGreen;
    }
    setLdColor(
      max == ldRed ? "#cc0000" : max == ldOrange ? "#ff6600" : "#009900"
    );
    setMdNo(md);
    setNdNo(nd);
    setLdNo(ld);
    setCurPat(cur);
    setDroPat(dro);
    setEnquiry((outcome / outcomeForm) * 100);
  };
  const clusterChange = (e) => {
    if (e.target.value) {
      const pd = patientsData.filter((pd) => pd.cluster == e.target.value);
      setData(pd);
    } else {
      setData(patientsData);
    }
  };
  useEffect(() => {
    if (patientsData) {
      setData(patientsData);
    }
  }, [patientsData]);
  const data = {
    labels: ["All Active cases"],
    datasets: [
      {
        label: "MD cases",
        data: [mdNo],
        backgroundColor: mdColor,
      },
      {
        label: "ND cases",
        data: [ndNo],
        backgroundColor: ndColor,
      },
      {
        label: "LD cases",
        data: [ldNo],
        backgroundColor: ldColor,
      },
    ],
  };
  return (
    <div className="shadow-xl w-4/5 mx-auto mt-4 mb-12 p-4 sm:w-[90%]">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-[#00286b] font-semibold text-xl text-center">
            Patient Meter
          </h1>

          <div className="flex justify-center gap-6 my-4 flex-wrap">
            <div className="shadow-lg w-1/5 py-12 flex flex-col justify-center items-center bg-gradient-to-br from-[#00286b] to-[#005595]  text-white font-semibold md:w-2/5 sm:w-4/5">
              <p className="">{regPat}</p>
              <p>Registered Patients</p>
            </div>
            <div className="shadow-lg w-1/5 py-12 flex flex-col justify-center items-center bg-gradient-to-br from-[#00286b] to-[#005595] text-white font-semibold md:w-2/5 sm:w-4/5">
              <p className="">{curPat}</p>
              <p>Cured Patients</p>
            </div>
            <div className="shadow-lg w-1/5 py-12 flex flex-col justify-center items-center bg-gradient-to-br from-[#00286b] to-[#005595] text-white font-semibold md:w-2/5 sm:w-4/5">
              <p className="">{droPat}</p>
              <p>Dropout Patients</p>
            </div>
            <div className="shadow-lg w-1/5 py-12 flex flex-col justify-center items-center bg-gradient-to-br from-[#00286b] to-[#005595] text-white font-semibold md:w-2/5 sm:w-4/5">
              <p className="">{enquiry + "%"}</p>
              <p>Enquiries converted</p>
            </div>
          </div>
          <div className="flex gap-8 justify-center md:flex-col-reverse md:gap-0">
            <div className="w-3/5 h-[50vh] my-12 md:w-full md:h-[40vh]">
              <Bar
                key={9}
                data={data}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,

                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Cases based on PSR value.",
                    },
                  },
                }}
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-2 w-1/5 md:w-full">
              <p className="text-[#00286b] text-xl font-semibold">Cluster:</p>
              <select
                className="bg-white border-2 p-1"
                value={cluster}
                onChange={(e) => {
                  setCluster(e.target.value);
                  clusterChange(e);
                }}
              >
                <option value="">All</option>
                <option value="Indore">Indore</option>
                <option value="Ratlam">Ratlam</option>
                <option value="Jaora">Jaora</option>
                <option value="Ahmedabad">Ahmedabad</option>
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPatientMeter;
