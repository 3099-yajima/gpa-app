import { useState } from "react";
import { Subject, calculateGPA } from "../utils/gpaCalculator";

export default function PredictionPage() {
  const [predictedSubjects, setPredictedSubjects] = useState<Subject[]>([]);
  const [form, setForm] = useState({
    name: "",
    credit: 1,
    score: 80,
    semester: "Future",
  });

  const addPrediction = () => {
    if (form.name.trim() === "") return;
    setPredictedSubjects([
      ...predictedSubjects,
      { ...form, id: crypto.randomUUID() },
    ]);
    setForm({ ...form, name: "", score: 80 });
  };

  const deletePrediction = (id: string) => {
    setPredictedSubjects(predictedSubjects.filter((s) => s.id !== id));
  };

  const predictedGPA = calculateGPA(predictedSubjects);

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h2>🔮 成績予測ツール</h2>

      <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <label>
          科目名:
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="例：経済学"
            style={{ marginLeft: "0.5rem" }}
          />
        </label>

        <label>
          単位数:
          <input
            type="number"
            value={form.credit}
            onChange={(e) => setForm({ ...form, credit: +e.target.value })}
            min={1}
            placeholder="例：2"
            style={{ marginLeft: "0.5rem", width: "60px" }}
          />
        </label>

        <label>
          点数:
          <input
            type="number"
            value={form.score}
            onChange={(e) => setForm({ ...form, score: +e.target.value })}
            min={0}
            max={100}
            placeholder="例：90"
            style={{ marginLeft: "0.5rem", width: "70px" }}
          />
        </label>

        <button onClick={addPrediction} style={{ padding: "0.3rem 0.7rem" }}>
          追加
        </button>
      </div>

      <h3>📊 予測GPA: {predictedGPA}</h3>

      <ul>
        {predictedSubjects.map((s) => (
          <li key={s.id}>
            {s.name} - {s.score}点（{s.credit}単位）
            <button
              onClick={() => deletePrediction(s.id)}
              style={{ marginLeft: "1rem", color: "red" }}
            >
              ❌削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
