import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { addUser } from "../../service/apis/user.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface FormValues {
  fullName: string;
  email: string;
  age: string;
  location: string;
  gender: { value: string; label: string } | null;
  interestedIn: { value: string; label: string } | null;
  password: string;
  role: { value: string; label: string } | null;
}
export const useAddUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form validation schema
  const validationSchema = yup.object({
    fullName: yup.string().required("Name is required"),
    email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email address is required"),
    age: yup.number().required("Age is required"),
    location: yup
      .string()
      .required("Location is required"),
    password: yup
      .string()
      .trim()
      .min(8, "Must be 8 or more characters")
      .required("Password field is required")
      .matches(/\w/, "Please enter a valid password"),
    gender: yup.object().nullable().required("Gender is required"),
    role: yup.object().nullable().required("Role is required"),
    interestedIn: yup.object().nullable().required("interested In is required"),
  });

  // Formik setup
  const addUserFormik = useFormik<FormValues>({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      role: null,
      age: "",
      location: "",
      gender: null,
      interestedIn: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const bodyData = {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        role: values.role?.value,
        about: {
          age: values.age,
          location: values.location,
          gender: values.gender?.value,
          interestedIn: values.interestedIn?.value,
        },
      };
      try {
        const response = await addUser(bodyData);
        if (response.status === 200) {
          toast.success(response.message);
          resetForm();
          navigate("/admin/users");
        }
      } catch (error) {
        toast.error("An error occurred while adding the user.");
      } finally {
        setLoading(false);
      }
    },
  });
  return {
    addUserFormik,
    loading,
  };
};
