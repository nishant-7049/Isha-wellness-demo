import React, { useEffect, useState } from "react";
import NoOfPatientChart from "./NoOfPatientChart";
import PatientNumberLineChart from "./PatientNumberLineChart";
import CollectionLineChart from "./CollectionLineChart";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../auth/Loader";
import { getCentreData } from "../../store/slices/dashboardSlice";

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
  const [interval, setInterval] = useState("year");
  const [month, setMonth] = useState(12);
  const [years, setyears] = useState();
  const [year, setYear] = useState(2023);
  const [patientsAtCentre, setPatientsAtCentre] = useState();
  const [patientsAtVisit, setPatientsAtVisit] = useState();
  const [collectionCentre, setCollectionCentre] = useState();
  const [collectionVisit, setCollectionVisit] = useState();
  const [totalCentreCollection, setTotalCentreCollection] = useState();
  const [totalVisitCollection, setTotalVisitCollection] = useState();
  const { loading, centreData } = useSelector((state) => state.dashboard);

  useEffect(()=>{
    if(interval == "year"){let years = []
      let totalCentre = 0
      let totalVisit = 0
      for(let cd of centreData){
        if(!years.includes(cd._id.year)){
          years.push(cd._id.year)
        }
        if(cd._id.location === "Visit Address"){
          totalVisit+=cd.collectionAmt
        }else if(cd._id.location === "Center"){
          totalCentre+=cd.collectionAmt
        }
      }
      years = years.sort()
      setyears(years)
      setTotalCentreCollection(totalCentre)
      setTotalVisitCollection(totalVisit)
      let patientsCentre = new Array(years.length).fill(0)
      let patientsVisit = new Array(years.length).fill(0)
      let collectionCentre = new Array(years.length).fill(0)
      let collectionVisit = new Array(years.length).fill(0)
      console.log("patientsCentre :" , patientsCentre)
      for(let cd of centreData){
        for(let y in years){
          if(years[y]== cd._id.year){
            if(cd._id.location === "Visit Address"){
              patientsVisit[y] = cd.count,
              collectionVisit[y] = cd.collectionAmt
            }else{
              patientsCentre[y] = cd.count,
              collectionCentre[y] = cd.collectionAmt
            }
          }
        }
      }
      console.log("patientsCentre :" , patientsCentre)
      setPatientsAtCentre(patientsCentre)
      setPatientsAtVisit(patientsVisit)
      setCollectionCentre(collectionCentre)
      setCollectionVisit(collectionVisit)
    }
    else if(interval == "month"){
      {
        let totalCentre = 0
        let totalVisit = 0
        for(let cd of centreData){
          if(cd._id.location === "Visit Address"){
            totalVisit+=cd.collectionAmt
          }else if(cd._id.location === "Center"){
            totalCentre+=cd.collectionAmt
          }
        }
        setTotalCentreCollection(totalCentre)
        setTotalVisitCollection(totalVisit)
        let patientsCentre = new Array(12).fill(0)
        let patientsVisit = new Array(12).fill(0)
        let collectionCentre = new Array(12).fill(0)
        let collectionVisit = new Array(12).fill(0)
        console.log("patientsCentre :" , patientsCentre)
        for(let cd of centreData){
          for(let m = 0; m<=12; m++){
            if(m== cd._id.month){
              if(cd._id.location === "Visit Address"){
                patientsVisit[m-1] = cd.count,
                collectionVisit[m-1] = cd.collectionAmt
              }else{
                patientsCentre[m-1] = cd.count,
                collectionCentre[m-1] = cd.collectionAmt
              }
            }
          }
        }
        console.log("patientsCentre :" , patientsCentre)
        setPatientsAtCentre(patientsCentre)
        setPatientsAtVisit(patientsVisit)
        setCollectionCentre(collectionCentre)
        setCollectionVisit(collectionVisit)
    }
    }
    else if(interval == "day"){
      {
        let totalCentre = 0
        let totalVisit = 0
        for(let cd of centreData){
          if(!years.includes(cd._id.year)){
            years.push(cd._id.year)
          }
          if(cd._id.location === "Visit Address"){
            totalVisit+=cd.collectionAmt
          }else if(cd._id.location === "Center"){
            totalCentre+=cd.collectionAmt
          }
        }
        setTotalCentreCollection(totalCentre)
        setTotalVisitCollection(totalVisit)
        let patientsCentre = new Array(31).fill(0)
        let patientsVisit = new Array(31).fill(0)
        let collectionCentre = new Array(31).fill(0)
        let collectionVisit = new Array(31).fill(0)
        console.log("patientsCentre :" , patientsCentre)
        for(let cd of centreData){
          for(let d = 1; d<=31; d++){
            if(d== cd._id.day){
              if(cd._id.location === "Visit Address"){
                patientsVisit[d-1] = cd.count,
                collectionVisit[d-1] = cd.collectionAmt
              }else{
                patientsCentre[d-1] = cd.count,
                collectionCentre[d-1] = cd.collectionAmt
              }
            }
          }
        }
        console.log("patientsCentre :" , patientsCentre)
        setPatientsAtCentre(patientsCentre)
        setPatientsAtVisit(patientsVisit)
        setCollectionCentre(collectionCentre)
        setCollectionVisit(collectionVisit)
    }
    }
  },[centreData])

  
  const dispatch = useDispatch()
  useEffect(()=>{
    const options = {
      interval,
      cluster,
      year,
      month,
    }
    console.log(options)
    dispatch(getCentreData(options))
  },[cluster, interval, month, year])
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
                <option value="day">Day</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
            </div>
            {interval == "day" && (
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
                      <option key={index} value={index+1}>
                        {month}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
            {(interval == "day" || interval == "month") && (
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
