import React, { useEffect, useState } from "react";
import {
  getDropoutsForTherapist,
  getTherapistPerformance,
} from "../../store/slices/dashboardSlice";
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
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { resetIsOutcomeReasonUpdated } from "../../store/slices/sessionSlice";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const MyPerformance = () => {
  const dispatch = useDispatch();
  const { loading, patientsData, dropouts } = useSelector(
    (state) => state.dashboard
  );
  const { loading: sessionLoading, isOutcomeReasonUpdated } = useSelector(
    (state) => state.session
  );
  const [mdNo, setMdNo] = useState(0);
  const [ndNo, setNdNo] = useState(0);
  const [ldNo, setLdNo] = useState(0);
  const [mdColor, setMdColor] = useState("");
  const [ndColor, setNdColor] = useState("");
  const [ldColor, setLdColor] = useState("");
  const [dropoutPatients, setDropoutPatients] = useState();
  const setData = (patientsData) => {
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
  };
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
  const cols = [
    {
      field: "name",
      headerName: "Patient Name",
      minWidth: 150,
      flex: 0.3,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "phone",
      headerName: "Phone No.",
      minWidth: 150,
      flex: 0.3,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "problem",
      headerName: "Problem",
      minWidth: 150,
      flex: 0.3,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "reason",
      headerName: "Reason of Dropout",
      minWidth: 300,
      flex: 0.3,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 80,
      flex: 0.3,
      headerClassName: "text-[#00286b] font-semibold",
      renderCell: (cellValues) => {
        return (
          <Link
            to={`/therapist/outcome/${cellValues.row.sessionId}`}
            className="text-lg text-green-400"
          >
            <AiFillEdit />
          </Link>
        );
      },
    },
  ];
  const rows = [];
  dropoutPatients &&
    dropoutPatients.map((drop) => {
      rows.push({
        id: drop.latestSession._id,
        name: drop.name,
        phone: drop.phone,
        problem: drop.problem,
        sessionId: drop.latestSession._id,
        reason:
          drop.latestSession &&
          drop.latestSession.outcome &&
          drop.latestSession.outcome.outcomeReason
            ? drop.latestSession.outcome.outcomeReason
            : "Not Filled",
      });
    });
  useEffect(() => {
    if (patientsData) {
      setData(patientsData);
    }
  }, [patientsData]);
  useEffect(() => {
    if (isOutcomeReasonUpdated) {
      dispatch(getDropoutsForTherapist());
      dispatch(resetIsOutcomeReasonUpdated());
    }
  }, [isOutcomeReasonUpdated]);
  useEffect(() => {
    if (dropouts) {
      const dp = dropouts.filter(
        (dp) =>
          new Date(dp?.latestSession?.createdAt).getTime() + 1 * 60 * 1000 <
          Date.now()
      );
      setDropoutPatients(dp);
    }
  }, [dropouts]);
  useEffect(() => {
    dispatch(getTherapistPerformance());
    dispatch(getDropoutsForTherapist());
  }, []);
  return (
    <div className="w-[90%] p-4 shadow-lg mx-auto my-8">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-[#00286b] text-xl text-center font-semibold mb-4">
            My Performance
          </h1>
          <div className="flex justify-center items-center gap-4">
            <div className="w-1/2 h-[50vh] my-12 md:w-full md:h-[40vh]">
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
            <div className="w-1/5">Incentive</div>
          </div>
          <h1 className="text-[#00286b] text-xl text-center font-semibold mb-4">
            Dropout List
          </h1>
          <DataGrid
            rows={rows}
            columns={cols}
            autoHeight
            pagination
            className="mx-auto"
          ></DataGrid>
        </>
      )}
    </div>
  );
};

export default MyPerformance;
