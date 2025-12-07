import { useState } from "react";
import type { Student } from "../types/student.types";
import React from "react";

interface Props {
  initialData?: Student;
  onSubmit: (formData: Student) => void;
}

function withStudentForm<T extends Props>(WrappedComponent: React.ComponentType<T>) {
  return function FormWrapper(props: T) {
    const [formData, setFormData] = useState<Student>(
      props.initialData || {
        firstName: "",
        lastName: "",
        age: "",
        grade: "",
        roll: "",
        contact: "",
        address: "",
        section: "",
      }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      props.onSubmit(formData);
    };

    return (
      <WrappedComponent
        {...props}
        formData={formData}
        setFormData={setFormData}  
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    );
  };
}

export default withStudentForm;
