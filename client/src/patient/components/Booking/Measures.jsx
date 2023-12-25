import React, { useEffect, useState } from "react";
import Container from "./BookingForm";
import Consent from "./Consent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateMeasures } from "../../../store/slices/bookingSlice";

const Measures = () => {
  const { measures } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [sugar, setSugar] = useState("");
  const [bp, setBp] = useState("");

  const measureSubmit = (e) => {
    e.preventDefault();
    const data = {
      weight,
      height,
      sugar,
      bp,
    };
    localStorage.setItem("measures", JSON.stringify(data));
    dispatch(updateMeasures());
    navigate("/book/lifestyle");
  };
  useEffect(() => {
    if (measures && measures.weight) {
      setWeight(measures.weight);
      setHeight(measures.height);
      setSugar(measures.sugar);
      setBp(measures.bp);
    }
  }, [measures]);
  return (
    <Container>
      <div className="container">
        <Consent />
        <div className="form-with-head">
          <h1 className="book-head">Measures</h1>
          <form className="book-form" onSubmit={measureSubmit}>
            <div className="book-input-container">
              <div className="input-container mx-auto my-4">
                <label className="label-head">Weight (in kg.):</label>
                <input
                  type="number"
                  max={200}
                  min={0}
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                  className="book-input"
                  required
                  placeholder="Enter Patients weight in kgs."
                />
              </div>
              <div className="input-container mx-auto my-4">
                <label className="label-head">Height (in cm.):</label>
                <input
                  type="number"
                  max={300}
                  min={0}
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value);
                  }}
                  className="book-input"
                  required
                  placeholder="Enter Patients height in cms."
                />
              </div>
              <div className="input-container mx-auto my-4">
                <label className="label-head">Sugar:</label>
                <select
                  className="book-input"
                  value={sugar}
                  onChange={(e) => {
                    setSugar(e.target.value);
                  }}
                  required
                >
                  <option value="">Choose</option>
                  <option value="RBS">RBS</option>
                  <option value="FBS">FBS</option>
                  <option value="PPBS">PPBS</option>
                  <option value="HBA1C">HBA1C</option>
                </select>
              </div>
              <div className="input-container mx-auto my-4">
                <label className="label-head">Blood Pressure:</label>
                <select
                  className="book-input"
                  value={bp}
                  onChange={(e) => {
                    setBp(e.target.value);
                  }}
                  required
                >
                  <option value="">Choose</option>
                  <option value="Normal">Normal (Below 120/80)</option>
                  <option value="Elevated">
                    Elevated (120 to 129/less than 80)
                  </option>
                  <option value="Stage 1 high blood pressure">
                    Stage 1 high blood pressure (130 to 139/80 to 89)
                  </option>
                  <option value="Stage 2 high blood pressure">
                    Stage 2 high blood pressure (140 and above/90 and above)
                  </option>
                  <option value="Hypertension Crisis">
                    Hypertension Crisis (Above 180/above 120)
                  </option>
                </select>
              </div>
            </div>
            <input
              type="submit"
              className="book-submit"
              value="Save and Continue"
            />
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Measures;
