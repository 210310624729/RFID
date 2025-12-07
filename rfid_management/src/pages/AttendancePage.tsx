import React, { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchStudents } from "../api/studentApi";
import {
  fetchAllAttendance,
  markAttendanceById,
  type AttendanceRecord,
} from "../api/attendanceApi";
import StudentAttendanceCard from "../components/StudentAttendanceCard";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "../styles/AttendancePage.css";

function startOfDayTime(msOrDate: string | number | Date) {
  const d = new Date(msOrDate);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export default function AttendancePage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const studentsQuery = useQuery({
    queryKey: ["students", page, limit, debouncedSearch],
    queryFn: ({ queryKey }) => {
      const [, pg, lm, sr] = queryKey;
      return fetchStudents(pg as number, lm as number, sr as string);
    },
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });

  const attendanceQuery = useQuery<AttendanceRecord[]>({
    queryKey: ["attendanceAll"],
    queryFn: fetchAllAttendance,
  });

  const markMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "Present" | "Absent" }) =>
      markAttendanceById(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendanceAll"] });
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  const loading = studentsQuery.isLoading || attendanceQuery.isLoading;
  const studentData = studentsQuery.data?.data ?? [];
  const total = studentsQuery.data?.total ?? 0;
  const totalPages = Math.ceil(total / limit);
  const attendance = attendanceQuery.data ?? [];

  const todayMap = useMemo(() => {
    const map = new Map<string, AttendanceRecord>();
    const todayTs = startOfDayTime(Date.now());

    for (const rec of attendance) {
      if (!rec || !rec.student) continue;

      const sid =
        typeof rec.student === "string"
          ? rec.student
          : (rec.student as any)._id ?? null;

      if (!sid) continue;

      const recDateTs = startOfDayTime(rec.date);
      if (recDateTs === todayTs) map.set(sid, rec);
    }
    return map;
  }, [attendance]);

  const { presentCount, absentCount } = useMemo(() => {
    let p = 0,
      a = 0;

    for (const s of studentData) {
      const rec = todayMap.get(s._id);
      if (rec) rec.status === "Present" ? p++ : a++;
      else a++;
    }

    return { presentCount: p, absentCount: a };
  }, [studentData, todayMap]);

  const chartOptions: Highcharts.Options = {
    chart: { type: "pie" },
    title: { text: "Attendance (Today)" },
    series: [
      {
        type: "pie",
        name: "Count",
        data: [
          { name: "Present", y: presentCount },
          { name: "Absent", y: absentCount },
        ],
      },
    ],
  };

  if (loading && !studentData.length)
    return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div className="attendance-page">
      <h2 className="attendance-title">Attendance</h2>

      <input
        type="text"
        value={search}
        placeholder="Search by first name..."
        onChange={(e) => setSearch(e.target.value)}
        className="attendance-search"
      />

      <div className="attendance-container">
        <div className="student-list">
          {studentData.map((s: any) => {
            const rec = todayMap.get(s._id);
            const status = rec ? rec.status : "NotMarked";
            return (
              <StudentAttendanceCard
                key={s._id}
                student={s}
                status={status}
                onMark={(st) => markMutation.mutate({ id: s._id, status: st })}
              />
            );
          })}

          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              Prev
            </button>
            <span>
              Page {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>

        <div className="attendance-chart">
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          <div className="attendance-counts">
            <div>
              <strong>Present:</strong> {presentCount}
            </div>
            <div>
              <strong>Absent:</strong> {absentCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
