import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { QueryKey } from '@tanstack/react-query'
import { createStudent } from "../api/studentApi";
import withStudentForm from "../hoc/withStudentForm";
import StudentForm from "../components/StudentForm";
import { useNavigate } from "react-router-dom";
import React from "react";

function AddStudentPage({ formData, onChange, onSubmit }: any) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"] as QueryKey,
      }),
      navigate("/");
    },
    onError:(err)=>{
      console.log(err)
    }
  });

  const handleFormSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  mutation.mutate(formData);
};


  return (
    <StudentForm formData={formData} onChange={onChange} onSubmit={handleFormSubmit} />
  );
}

export default withStudentForm(AddStudentPage);
