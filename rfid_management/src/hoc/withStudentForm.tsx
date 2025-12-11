import { useState } from "react";
import type { Student } from "../types/student.types";
import React from "react";

function withStudentForm(WrappedComponent: React.ComponentType<any>) {
  return function FormWrapper() {
   
    const [formData, setFormData] = useState<Student>(
       {
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

    return (
      <WrappedComponent
        formData={formData}
        setFormData={setFormData}  
        onChange={handleChange}
      />
    );
  };
}

export default withStudentForm;
