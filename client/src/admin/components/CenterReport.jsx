import React, { useEffect, useState } from "react";
import NoOfPatientChart from "./NoOfPatientChart";
import PatientNumberLineChart from "./PatientNumberLineChart";
import CollectionLineChart from "./CollectionLineChart";
import { useSelector } from "react-redux";
import Loader from "../../auth/Loader";

const months = [
  "Jan",
  "Fab",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CenterReport = () => {
  const [cluster, setCluster] = useState("");
  const [interval, setInterval] = useState("Day");
  const [month, setMonth] = useState();
  const [years, setyears] = useState();
  const [year, setYear] = useState(2023);
  const [patientsAtCentre, setPatientsAtCentre] = useState();
  const [patientsAtVisit, setPatientsAtVisit] = useState();
  const [collectionCentre, setCollectionCentre] = useState();
  const [collectionVisit, setCollectionVisit] = useState();
  const [totalCentreCollection, setTotalCentreCollection] = useState();
  const [totalVisitCollection, setTotalVisitCollection] = useState();
  const { loading, centreData } = useSelector((state) => state.dashboard);

  const setData = (cd) => {
    if (interval == "Year") {
      let NoPatientCentre = 0;
      let NoPatientVisit = 0;
      let collectionAtCentre = 0;
      let collectionAtVisit = 0;
      let patientsAtCentre = [];
      let patientsAtVisit = [];
      let collectionCentre = [];
      let collectionVisit = [];
      let year = years[0];
      for (let i = cd.length - 1; i >= 0; i--) {
        if (year == new Date(cd[i].createdAt).getFullYear()) {
          cd[i].location == "Center" ? NoPatientCentre++ : NoPatientVisit++;
          cd[i].location == "Center"
            ? (collectionAtCentre += cd[i].price)
            : (collectionAtVisit += cd[i].price);
        } else {
          patientsAtCentre.push(NoPatientCentre);
          patientsAtVisit.push(NoPatientVisit);
          collectionCentre.push(collectionAtCentre);
          collectionVisit.push(collectionAtVisit);
          NoPatientCentre =
            NoPatientVisit =
            collectionAtCentre =
            collectionAtVisit =
              0;
          year = new Date(cd[i].createdAt).getFullYear();
          cd[i].location == "Center" ? NoPatientCentre++ : NoPatientVisit++;
          cd[i].location == "Center"
            ? (collectionAtCentre += cd[cd.length - 1].price)
            : (collectionAtVisit += cd[cd.length - 1].price);
        }
      }
      patientsAtCentre.push(NoPatientCentre);
      patientsAtVisit.push(NoPatientVisit);

      collectionCentre.push(collectionAtCentre);
      collectionVisit.push(collectionAtVisit);
      setPatientsAtCentre(patientsAtCentre);
      setPatientsAtVisit(patientsAtVisit);
      setCollectionCentre(collectionCentre);
      setCollectionVisit(collectionVisit);
    } else if (interval == "Month") {
      let NoPatientCentre = 0;
      let NoPatientVisit = 0;
      let collectionAtCentre = 0;
      let collectionAtVisit = 0;
      let patientsAtCentre = [];
      let patientsAtVisit = [];
      let collectionCentre = [];
      let collectionVisit = [];
      let month = 0;
      cd = cd.filter((cd) => new Date(cd.createdAt).getFullYear() == year);
      for (let i = cd.length - 1; i >= 0; i--) {
        if (month == new Date(cd[i].createdAt).getMonth()) {
          cd[i].location == "Center" ? NoPatientCentre++ : NoPatientVisit++;
          cd[i].location == "Center"
            ? (collectionAtCentre += cd[i].price)
            : (collectionAtVisit += cd[i].price);
        } else {
          patientsAtCentre.push(NoPatientCentre);
          patientsAtVisit.push(NoPatientVisit);
          collectionCentre.push(collectionAtCentre);
          collectionVisit.push(collectionAtVisit);
          NoPatientCentre =
            NoPatientVisit =
            collectionAtCentre =
            collectionAtVisit =
              0;
          month = new Date(cd[i].createdAt).getMonth();
          cd[i].location == "Center" ? NoPatientCentre++ : NoPatientVisit++;
          cd[i].location == "Center"
            ? (collectionAtCentre += cd[cd.length - 1].price)
            : (collectionAtVisit += cd[cd.length - 1].price);
        }
      }
      patientsAtCentre.push(NoPatientCentre);
      patientsAtVisit.push(NoPatientVisit);
      collectionCentre.push(collectionAtCentre);
      collectionVisit.push(collectionAtVisit);

      while (patientsAtCentre.length < 12) {
        patientsAtCentre.unshift(0);
        collectionCentre.unshift(0);
      }
      while (patientsAtVisit.length < 12) {
        patientsAtVisit.unshift(0);
        collectionVisit.unshift(0);
      }
      setPatientsAtCentre(patientsAtCentre);
      setPatientsAtVisit(patientsAtVisit);
      setCollectionCentre(collectionCentre);
      setCollectionVisit(collectionVisit);
    } else if (interval == "Day") {
      let NoPatientCentre = 0;
      let NoPatientVisit = 0;
      let collectionAtCentre = 0;
      let collectionAtVisit = 0;
      let patientsAtCentre = [];
      let patientsAtVisit = [];
      let collectionCentre = [];
      let collectionVisit = [];
      let date = 1;
      cd = cd.filter(
        (cd) =>
          new Date(cd.createdAt).getMonth() == month &&
          new Date(cd.createdAt).getFullYear() == year
      );
      for (let i = cd.length - 1; i >= 0; ) {
        if (date == new Date(cd[i].createdAt).getDate()) {
          cd[i].location == "Center" ? NoPatientCentre++ : NoPatientVisit++;
          cd[i].location == "Center"
            ? (collectionAtCentre += cd[cd.length - 1].price)
            : (collectionAtVisit += cd[cd.length - 1].price);
          i--;
        } else {
          patientsAtCentre.push(NoPatientCentre);
          patientsAtVisit.push(NoPatientVisit);
          collectionCentre.push(collectionAtCentre);
          collectionVisit.push(collectionAtVisit);
          NoPatientCentre =
            NoPatientVisit =
            collectionAtCentre =
            collectionAtVisit =
              0;
          date++;
        }
      }
      patientsAtCentre.push(NoPatientCentre);
      patientsAtVisit.push(NoPatientVisit);
      collectionCentre.push(collectionAtCentre);
      collectionVisit.push(collectionAtVisit);
      setPatientsAtCentre(patientsAtCentre);
      setPatientsAtVisit(patientsAtVisit);
      setCollectionCentre(collectionCentre);
      setCollectionVisit(collectionVisit);
    }
  };
  useEffect(() => {
    if (centreData && centreData[0]) {
      let cd = centreData;
      let totalCentreCollection = 0;
      const cdCentre = cd.filter((cd) => cd.location == "Center");
      for (let cd of cdCentre) {
        totalCentreCollection += cd.price;
      }
      setTotalCentreCollection(totalCentreCollection);
      let totalVisitCollection = 0;
      const cdVisit = cd.filter((cd) => cd.location == "Visit Address");
      for (let cd of cdVisit) {
        totalVisitCollection += cd.price;
      }
      setTotalVisitCollection(totalVisitCollection);
      if (cluster) {
        cd = centreData.filter((cd) => cd.cluster == cluster);
      }
      const y = [new Date(cd[cd.length - 1].createdAt).getFullYear()];
      if (
        new Date(cd[cd.length - 1].createdAt).getFullYear() !=
        new Date(cd[0].createdAt).getFullYear()
      ) {
        for (
          let i = new Date(cd[cd.length - 1].createdAt).getFullYear() + 1;
          i <= new Date(cd[0].createdAt).getFullYear();
          i++
        ) {
          y.push(i);
        }
      }
      setyears(y);
      setData(cd);
    }
  }, [cluster, interval, month, year, centreData]);
  useEffect(() => {}, [centreData]);
  return (
    <div className="shadow-xl w-4/5 mx-auto mt-4 mb-12 p-4 sm:w-[90%] sm:p-0">
      {loading == true ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-[#00286b] font-semibold text-xl text-center">
            Center Report
          </h1>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <div className="w-1/3 md:w-full sm:w-full">
              <NoOfPatientChart />
            </div>
            <div className="w-1/2 flex justify-center gap-4 md:w-full">
              <div className="shadow-lg py-16 px-8 flex flex-col justify-center items-center bg-gradient-to-br from-[#00286b] to-[#005595] text-white font-semibold sm:py-8">
                <p className="">{totalCentreCollection}</p>
                <p className="text-center">Total Centre collection</p>
              </div>
              <div className="shadow-lg py-16 px-8 flex flex-col justify-center items-center bg-gradient-to-br from-[#00286b] to-[#005595] text-white font-semibold sm:py-8">
                <p className="">{totalVisitCollection}</p>
                <p className="text-center">Total Visit collection</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-6 my-4 flex-wrap">
            <div className="flex flex-col">
              <label className="text-[#00286b] font-semibold">Cluster:</label>
              <select
                className="px-2 py-1 bg-white border-2"
                value={cluster}
                onChange={(e) => {
                  setCluster(e.target.value);
                }}
              >
                <option value="">All</option>
                <option value="Indore">Indore</option>
                <option value="Ratlam">Ratlam</option>
                <option value="Jaora">Jaora</option>
                <option value="Ahemdabad">Ahemdabad</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-[#00286b] font-semibold">Interval:</label>
              <select
                className="px-2 py-1 bg-white border-2"
                value={interval}
                onChange={(e) => {
                  setInterval(e.target.value);
                }}
              >
                <option value="Day">Day</option>
                <option value="Month">Month</option>
                <option value="Year">Year</option>
              </select>
            </div>
            {interval == "Day" && (
              <div className="flex flex-col">
                <label className="text-[#00286b] font-semibold">Month:</label>
                <select
                  className="px-2 py-1 bg-white border-2"
                  value={month}
                  onChange={(e) => {
                    setMonth(e.target.value);
                  }}
                >
                  {months.map((month, index) => {
                    return (
                      <option key={index} value={index}>
                        {month}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
            {(interval == "Day" || interval == "Month") && (
              <div className="flex flex-col">
                <label className="text-[#00286b] font-semibold">Year:</label>
                <select
                  className="px-2 py-1 bg-white border-2"
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                >
                  {years &&
                    years.map((year) => {
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                </select>
              </div>
            )}
          </div>
          <div className="flex gap-12 justify-center md:flex-col">
            <div className="w-2/5 h-[40vh] md:w-full">
              <PatientNumberLineChart
                interval={interval}
                year={year}
                month={month}
                months={months}
                years={years}
                patientsAtCentre={patientsAtCentre}
                patientsAtVisit={patientsAtVisit}
              />
            </div>
            <div className="w-2/5 h-[40vh] md:w-full">
              <CollectionLineChart
                interval={interval}
                year={year}
                month={month}
                months={months}
                years={years}
                collectionCentre={collectionCentre}
                collectionVisit={collectionVisit}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CenterReport;
