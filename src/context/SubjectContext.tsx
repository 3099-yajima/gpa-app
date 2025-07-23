import React, { createContext, useContext, useState, ReactNode } from "react";

export type Subject = {
  id: string;
  name: string;
  credit: number;
  score: number;
  semester: string;
};

type SubjectContextType = {
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
};

const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

export const useSubjectContext = () => {
  const context = useContext(SubjectContext);
  if (!context) {
    throw new Error("useSubjectContext must be used within SubjectProvider");
  }
  return context;
};

export const SubjectProvider = ({ children }: { children: ReactNode }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  return (
    <SubjectContext.Provider value={{ subjects, setSubjects }}>
      {children}
    </SubjectContext.Provider>
  );
};
