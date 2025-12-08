import { useState } from "react";
import type { Student } from "../types/student.types";
import React from "react";

interface Props {
  initialData?: Student;
  onSubmit: (formData: Student) => void;
}

function withStudentForm<T extends Props>(WrappedComponent: React.ComponentType<T>) {
  return function FormWrapper(props: T) {
    const [errors, setErrors] = useState<any>({});

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

       const { name, value } = e.target;

   if (!validateField(name, value)) {
    return;
  }
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };

    function validateField(key: string, value: string) {
  switch (key) {
    case "contact":
      return /^[0-9]{0,10}$/.test(value); 

    case "roll":
      return /^[0-9]*$/.test(value); 

    case "grade":
      return /^(1[0-2]|[1-9])$/.test(value) || value === ""; 
    case "section":
      return /^[A-Z]$/.test(value) || value === ""; 

    case "age":
      return /^[0-9]*$/.test(value) && Number(value) <= 100;

    default:
      return true; 
  }
}


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
