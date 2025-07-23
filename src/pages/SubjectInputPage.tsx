import React, { useState } from "react"; 
import { v4 as uuidv4 } from "uuid"; 
import { useSubjectContext } from "../context/SubjectContext";
import { calculateGPA } from "../utils/gpaCalculator";

export default function SubjectInputPage() {
  const { subjects, setSubjects } = useSubjectContext();
  const [name, setName] = useState("");
  const [credit, setCredit] = useState(1);
  const [score, setScore] = useState(0);

  const handleAdd = () => {
    if (!name) return;
    setSubjects([
      ...subjects,
      {
        id: uuidv4(),
        name,
        credit,
        score,
        semester: "前期",
      },
    ]);
    setName("");
    setCredit(1);
    setScore(0);
  };

  const handleDelete = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>📘 成績入力フォーム</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        <label>
          科目名：
          <input
            type="text"
            placeholder="例：経済学"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          単位数：
          <input
            type="number"
            value={credit}
            onChange={(e) => setCredit(Number(e.target.value))}
            min={1}
          />
        </label>

        <label>
          点数：
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            min={0}
            max={100}
          />
        </label>

        <button onClick={handleAdd}>追加</button>
      </div>

      <ul>
        {subjects.map((s) => (
          <li key={s.id}>
            {s.name} - {s.credit}単位 - {s.score}点{" "}
            <button onClick={() => handleDelete(s.id)}>削除</button>
          </li>
        ))}
      </ul>

      <p>📊 GPA: {calculateGPA(subjects).toFixed(2)}</p>
    </div>
  );
}
