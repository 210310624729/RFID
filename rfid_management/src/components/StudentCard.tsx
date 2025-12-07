import React from "react";
import "../styles/StudentCard.css";

interface Props {
  student: any;
  onEdit: () => void;
  onDelete: () => void;
}

function StudentCard({ student, onEdit, onDelete }: Props) {
  return (
    <div className="student-card">
      <div className="info">
        <h3>{student.firstName} {student.lastName}</h3>
        <p>Grade: {student.grade}</p>
        <p>Roll: {student.roll}</p>
      </div>

      <div className="actions">
        <button onClick={onEdit} className="edit-btn">Edit</button>
        <button onClick={onDelete} className="delete-btn">Delete</button>
      </div>
    </div>
  );
}

export default StudentCard;
