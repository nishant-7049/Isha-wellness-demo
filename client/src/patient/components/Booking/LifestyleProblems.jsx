import React, { useEffect, useState } from "react";

const LifestyleProblems = ({
  problem,
  problemSinceWhen,
  setProblemSinceWhen,
  problemOnMed,
  setProblemOnMed,
  problemCause,
  setProblemCause,
}) => {
  const [months, setMonths] = useState();
  const [onMedication, setOnMedication] = useState();
  const [cause, setCause] = useState();

  useEffect(() => {
    if (months) {
      let p;
      for (p = 0; p < Object.keys(problemSinceWhen).length; p++) {
        if (problemSinceWhen[p].problem == problem) {
          const temp = { ...problemSinceWhen };
          temp[p] = months;
          setProblemSinceWhen(temp);
          break;
        }
      }
      if (p == Object.keys(problemSinceWhen).length || p == 0) {
        const temp = { ...problemSinceWhen };
        temp[p] = months;
        setProblemSinceWhen(temp);
      }
    }
  }, [months]);
  useEffect(() => {
    if (onMedication) {
      let p;
      for (p = 0; p < Object.keys(problemOnMed).length; p++) {
        if (problemOnMed[p].problem == problem) {
          const temp = { ...problemOnMed };
          temp[p] = onMedication;
          setProblemOnMed(temp);
          break;
        }
      }
      if (p == Object.keys(problemOnMed).length) {
        const temp = { ...problemOnMed };
        temp[p] = onMedication;
        setProblemOnMed(temp);
      }
    }
  }, [onMedication]);
  useEffect(() => {
    if (cause) {
      let p;
      for (p = 0; p < Object.keys(problemCause).length; p++) {
        if (problemCause[p].problem == problem) {
          const temp = { ...problemCause };
          temp[p] = cause;
          setProblemCause(temp);
          break;
        }
      }
      if (p == Object.keys(problemCause).length) {
        const temp = { ...problemCause };
        temp[p] = cause;
        setProblemCause(temp);
      }
    }
  }, [cause]);
  return (
    <div className="input-container mx-auto my-4" key={problem}>
      <label className="label-head">{problem} Questions:</label>
      <div className="flex flex-col gap-2">
        <label className="label-head">Since When? (in months)</label>
        <input
          className="book-input"
          type="number"
          min={0}
          max={100}
          placeholder="Since when have you been feeling this problem? (in months) "
          required
          value={months && months.sinceWhen ? months.sinceWhen : {}}
          onChange={(e) => {
            setMonths({ problem, sinceWhen: e.target.value });
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="label-head">Are you on Medication?</label>
        <select
          className="book-input mx-auto"
          value={onMedication && onMedication.onMed ? onMedication.onMed : ""}
          onChange={(e) => {
            setOnMedication({ problem, onMed: e.target.value });
          }}
          required
        >
          <option value="">Choose</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="label-head">
          Possible cause for this problem according to patient?
        </label>
        <textarea
          value={cause && cause.cause ? cause.cause : ""}
          onChange={(e) => {
            setCause({ problem, cause: e.target.value });
          }}
          className="book-input"
          type="text"
          placeholder="Enter the cause of problem?"
          required
          maxLength={100}
        />
      </div>
    </div>
  );
};

export default LifestyleProblems;
