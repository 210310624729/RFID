import type { Student } from "../types/student.types";

const BASE_URL = "http://localhost:2000/api/users";

export const fetchStudents = async (page = 1, limit = 10, search = "") => {
  const res = await fetch(
    `${BASE_URL}?page=${page}&limit=${limit}&search=${search}`
  );

  if (!res.ok) throw new Error("Failed to fetch students");
  return res.json();   
};

export const fetchStudentById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

export const createStudent = async (student: Student) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  return res.json();
};

export const updateStudent = async (id: string, student: Student) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  return res.json();
};

export const deleteStudent = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return res.json();
};
