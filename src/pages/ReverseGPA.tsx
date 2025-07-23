import React, { useState } from "react";
import { useSubjectContext } from "../context/SubjectContext";
import { calculateGPA } from "../utils/gpaCalculator";

export default function ReverseGPA() {
  const { subjects } = useSubjectContext();
  const [targetGPA, setTargetGPA] = useState(3.5);
  const [futureCredits, setFutureCredits] = useState(20);

  const currentGPA = calculateGPA(subjects);
  const currentCredits = subjects.reduce((sum, s) => sum + s.credit, 0);

  const totalNeededPoints = targetGPA * (currentCredits + futureCredits);
  const requiredFutureGPA = futureCredits > 0
    ? (totalNeededPoints - currentGPA * currentCredits) / futureCredits
    : 0;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>🎯 目標GPA逆算ツール</h2>

      <label>
        目標GPA：
        <input
          type="number"
          value={targetGPA}
          onChange={(e) => setTargetGPA(parseFloat(e.target.value))}
          step={0.1}
          max={4.0}
        />
      </label>

      <br />

      <label>
        これからの単位数：
        <input
          type="number"
          value={futureCredits}
          onChange={(e) => setFutureCredits(parseInt(e.target.value))}
        />
      </label>

      <hr />

      <p>🎓 現在のGPA: {currentGPA.toFixed(2)}</p>
      <p>📘 現在の単位数: {currentCredits}</p>
      <p>📌 目標GPA: {targetGPA}</p>
      <p>📍 これから必要な平均GPA: <b>{requiredFutureGPA.toFixed(2)}</b></p>
    </div>
  );
}
