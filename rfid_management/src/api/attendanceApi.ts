
import type  { Student }  from "../types/student.types";

const BASE = "https://rfid-opvk.onrender.com/api/attendance";

export type AttendanceRecord = {
  _id: string;
  student: Student | string;
  status: "Present" | "Absent";
  date: string; 
};

export async function fetchAllAttendance(): Promise<AttendanceRecord[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch attendance");
  return res.json();
}

export async function markAttendanceById(id: string, status: "Present" | "Absent") {
  const res = await fetch(`${BASE}/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to mark attendance");
  return res.json();
}

