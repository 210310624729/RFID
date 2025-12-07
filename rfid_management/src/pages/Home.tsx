import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchStudents, deleteStudent } from "../api/studentApi";
import StudentCard from "../components/StudentCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); 
    }, 1000); 
    return () => clearTimeout(handler);
  }, [search]);

  const studentsQuery = useQuery({
    queryKey: ["students", page, limit, debouncedSearch],
    queryFn: ({ queryKey }) => {
      const [, pg, lm, sr] = queryKey;
      return fetchStudents(pg as number, lm as number, sr as string);
    },
    
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  const loading = studentsQuery.isLoading;
  const students = studentsQuery.data?.data ?? [];
  const total = studentsQuery.data?.total ?? 0;
  const totalPages = Math.ceil(total / limit);

  if (loading && !students.length) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Students</h2>

      <input
        type="text"
        placeholder="Search by first name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: 8,
          marginBottom: 20,
          width: "50%",
          borderRadius: 6,
          border: "1px solid #ddd",
        }}
      />

      <button
        onClick={() => navigate("/add")}
        style={{
          marginBottom: 20,
          padding: "8px 14px",
          borderRadius: 6,
          cursor: "pointer",
           border: "none",
            background: "#1976d2",
           color: "white"
        }}
      >
        + Add New Student
      </button>

      {students.map((student: any) => (
        <StudentCard
          key={student._id}
          student={student}
          onEdit={() => navigate(`/edit/${student._id}`)}
          onDelete={() => deleteMutation.mutate(student._id)}
        />
      ))}

      <div className="pagination" style={{ marginTop: 20, display: "flex", gap: 8 }}>
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
