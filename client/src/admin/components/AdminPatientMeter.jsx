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
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getClusterProgress } from "../../store/slices/dashboardSlice";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const AdminPatientMeter = () => {
  const dispatch = useDispatch()
  const { loading, patientsData } = useSelector((state) => state.dashboard);
  const [regPat, setRegPat] = useState();
  const [curPat, setCurPat] = useState(0);
  const [droPat, setDroPat] = useState(0);
  const [enquiry, setEnquiry] = useState(0);
  const [mdNo, setMdNo] = useState(0);
  const [ndNo, setNdNo] = useState(0);
  const [ldNo, setLdNo] = useState(0);
  const [cluster, setCluster] = useState("");
  const [totalImprovedPsr, setTotalImprovedPsr] = useState(0)
  const [totalWorsenedPsr, setTotalWorsenedPsr] = useState(0)
  const [start, setStart] = useState("2023-01-01")
  const [end, setEnd] = useState(`${new Date().getFullYear()}-${new Date().getMonth()+1>9?new Date().getMonth()+1:`0${new Date().getMonth()+1}`}-${new Date().getDate()}`)

  const {clusterProgress} = useSelector(state=> state.dashboard)

  const setData = (patientsData) => {
    setRegPat(patientsData.length);
    let cur = 0;
    let dro = 0;
    let outcomeForm = 0;
    let outcome = 0;
    let md = 0;
    let nd = 0;
    let ld = 0;
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
      } else if (pd.problem == "Lifestyle and Habits") {
        ld++;
      } else {
        nd++;
      }
    }
    setMdNo(md);
    setNdNo(nd);
    setLdNo(ld);
    setCurPat(cur);
    setDroPat(dro);
    setEnquiry(((outcome / outcomeForm) * 100).toFixed(2));
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
        backgroundColor: "#00286b",
      },
      {
        label: "ND cases",
        data: [ndNo],
        backgroundColor: "#00286b",
      },
      {
        label: "LD cases",
        data: [ldNo],
        backgroundColor: "#00286b",
      },
    ],
  };
  const clusterProgressData = {
    labels: ["Patients PSR change"],
    datasets: [
      {
        label: "Total Improved PSR",
        data: [totalImprovedPsr],
        backgroundColor: "#2ebd3c"
      },
      {
        label: "Total Worsened PSR",
        data: [totalWorsenedPsr],
        backgroundColor: "#b32424"
      }
    ]
  }

  useEffect(()=>{
    if(clusterProgress){
      let totalImprovedPsr = 0
      let totalWorsenedPsr = 0
      for(let progress of clusterProgress){
        if(progress.finalPsr && progress.finalPsr != -999){
          if(progress.finalPsr >=0){
            totalImprovedPsr+=progress.finalPsr
          }else{
            totalWorsenedPsr-=progress.finalPsr
          }
        }
      }
      setTotalImprovedPsr(totalImprovedPsr)
      setTotalWorsenedPsr(totalWorsenedPsr)
    }
  },[clusterProgress])
  useEffect(()=>{
    const options = {
      cluster,
      start: new Date(start).getTime(),
      end: new Date(end).getTime()
    }
    dispatch(getClusterProgress(options))
  },[cluster, start, end])
  return (
    <div className="shadow-xl w-4/5 mx-auto mt-4 mb-12 p-4 sm:w-[90%]">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-[#00286b] font-semibold text-xl text-center relative">
            Patient Meter
            <Link
              to="/admin/enquiry"
              className="absolute right-24 text-[#00286b] font-semibold text-base sm:static sm:pl-4"
            >
              visit enquiries
            </Link>
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
          <div className="flex flex-col my-8 gap-4 items-center justify-center md:flex-col-reverse md:gap-0">
          <div className="flex gap-4 justify-between">
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
          <div className="flex flex-col justify-center items-center gap-2 w-1/5 md:w-full">
              <p className="text-[#00286b] text-xl font-semibold">Start:</p>
              <input
                className="bg-white border-2 p-1"
                type="date"
                value={start}
                onChange={(e) => {
                  setStart(e.target.value);
                }}
              />
            </div>
          <div className="flex flex-col justify-center items-center gap-2 w-1/5 md:w-full">
              <p className="text-[#00286b] text-xl font-semibold">End:</p>
              <input
                className="bg-white border-2 p-1"
                type="date"
                value={end}
                onChange={(e) => {
                  setEnd(e.target.value);
                }}
              />
            </div>
          </div>
            <div className="flex gap-8 w-full justify-center md:flex-col">
              
            <div className="w-2/5 h-[50vh] md:w-full md:h-[40vh]">
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
            <div className="w-2/5 h-[50vh] md:w-full md:h-[40vh]">
              <Bar
                key={1}
                data={clusterProgressData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,

                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Progress of Cluster based on patient's PSR.",
                    },
                  },
                }}
              />
            </div>

            </div>
            
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPatientMeter;
