// GPA計算に使う関数とデータ型

export function scoreToGradePoint(score: number): number {
  if (score >= 90) return 4;
  if (score >= 80) return 3;
  if (score >= 70) return 2;
  if (score >= 60) return 1;
  return 0;
}

export type Subject = {
  id: string;
  name: string;
  credit: number;
  score: number;
  semester: string;
};

export function calculateRequiredAverage(
  currentGPA: number,
  currentCredits: number,
  targetGPA: number,
  futureCredits: number
): number {
  const totalRequiredPoints = targetGPA * (currentCredits + futureCredits);
  const alreadyEarnedPoints = currentGPA * currentCredits;
  const requiredFuturePoints = totalRequiredPoints - alreadyEarnedPoints;

  return futureCredits === 0 ? 0 : parseFloat((requiredFuturePoints / futureCredits).toFixed(2));
}


export function calculateGPA(subjects: Subject[]): number {
  let totalPoints = 0;
  let totalCredits = 0;

  for (const subject of subjects) {
    const gp = scoreToGradePoint(subject.score);
    totalPoints += gp * subject.credit;
    totalCredits += subject.credit;
  }

  return totalCredits === 0 ? 0 : parseFloat((totalPoints / totalCredits).toFixed(2));
}
