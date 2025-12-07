import React from "react";
import "../styles/StudentCard.css";

type Status = "Present" | "Absent" | "NotMarked";

interface Props {
  student: any;
  status: Status | string;
  onMark: (status: "Present" | "Absent") => void;
}

const badgeStyle = (status: Status) => {
  if (status === "Present") return { background: "#2ecc71", color: "#fff" };
  if (status === "Absent") return { background: "#e74c3c", color: "#fff" };
  return { background: "#95a5a6", color: "#fff" }; 
};

const StudentAttendanceCard: React.FC<Props> = ({ student, status, onMark }) => {
  const s = status === undefined ? "NotMarked" : (status as Status);

  return (
    <div className="student-card attendance-card">
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: 6, background: "#f3f3f3", display: "flex", alignItems: "center", justifyContent: "center" }}>
          
          <span style={{ fontSize: 14, color: "#666" }}>{(student.firstName || "").charAt(0)}</span>
        </div>

        <div>
          <div style={{ fontWeight: 600 }}>{student.firstName} {student.lastName}</div>
          <div style={{ fontSize: 13, color: "#555" }}>Grade: {student.grade} • Roll: {student.roll}</div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ padding: "6px 10px", borderRadius: 18, fontWeight: 600, ...badgeStyle(s as Status) }}>
          {s === "NotMarked" ? "Not marked" : s}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => onMark("Present")}
            className="small-btn present"
            aria-label="Mark present"
          >
            P
          </button>
          <button
            onClick={() => onMark("Absent")}
            className="small-btn absent"
            aria-label="Mark absent"
          >
            A
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceCard;
