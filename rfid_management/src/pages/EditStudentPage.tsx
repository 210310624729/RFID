import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchStudentById, updateStudent } from "../api/studentApi";
import withStudentForm from "../hoc/withStudentForm";
import StudentForm from "../components/StudentForm";
import type { Student } from "../types/student.types";

function EditStudentPage({ formData, setFormData, onChange }: any) {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["student", id],
    queryFn: () => fetchStudentById(id!),
    enabled: !!id,
  });

useEffect(() => {
  if (data) {
    setFormData((prev: Student) => ({ ...prev, ...data })); 
  }
}, [data]);

  const mutation = useMutation({
    mutationFn: (updated: any) => updateStudent(id!, updated),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["students"]}),
      navigate("/")
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  mutation.mutate(formData);
};


  if (isLoading) return <h2>Loading...</h2>;

  return (
    <StudentForm
      formData={formData}
      onChange={onChange}
      onSubmit={handleSubmit}
    />
  );
}

export default withStudentForm(EditStudentPage);
