import "../styles/Form.css";
import type { Student } from "../types/student.types";
import React from "react";

interface Props {
  formData: Student;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function StudentForm({ formData, onChange, onSubmit }: Props) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <h2 className="form-title">Student Details</h2>

      {Object.keys(formData).map((key) => (
        key !== "_id" && (
          <input
            key={key}
            type="text"
            name={key}
            placeholder={key.replace(/([A-Z])/g, " $1")}
            value={(formData as any)[key]||""}
            onChange={onChange}
            className="form-input"
          />
        )
      ))}

      <button className="form-button" type="submit">Save</button>
    </form>
  );
}

export default StudentForm;
