import "../styles/Form.css";
import type { Student } from "../types/student.types";
import React, { useState } from "react";

interface Props {
  formData: Student;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function StudentForm({ formData, onChange, onSubmit }: Props) {
   const [instruction] = useState({
age: "Age: ≤ 100",
  contact: "Contact : Numbers only",
  roll: "Roll No: Numbers, max 10 digits",
  grade: "Grade: 1–12",
  section: "Section: A–Z only",
  firstName: "First Name",
  lastName: "Last Name",
  address: "Address",
  });
  return (
    <form className="form" onSubmit={onSubmit}>
      <h2 className="form-title">Student Details</h2>

      {Object.keys(formData).map((key) => (
        key !== "_id" && (
          <>
            <br />
           <span
            style={{
             fontSize: "12px",
             color: "#777", 
             display: "block",
             marginBottom: "4px",
  }} 
           > {instruction[key as keyof typeof instruction]}</span>
          <input
            key={key}
            type="text"
            name={key}
            placeholder={key.replace(/([A-Z])/g, " $1")}
            value={(formData as any)[key]||""}
            onChange={onChange}
            className="form-input"
          />
          </>
        )
      ))}

      <button className="form-button" type="submit">Save</button>
    </form>
  );
}

export default StudentForm;
