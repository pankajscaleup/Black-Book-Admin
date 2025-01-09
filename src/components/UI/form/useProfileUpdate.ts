import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { updateProfile } from "../../../service/apis/user.api";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/auth.store";

interface FormValues {
  fullName: string;
  email: string;
  age: string;
  location: string;
  gender: { value: string; label: string } | null;
  interestedIn: { value: string; label: string } | null;
}
export const useProfileUpdate = () => {
  const dispatch = useDispatch();

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
    gender: yup.object().nullable().required("Gender is required"),
    interestedIn: yup.object().nullable().required("interested In is required"),
  });

  // Formik setup
  const addProfileFormik = useFormik<FormValues>({
    initialValues: {
      fullName: "",
      email: "",
      age: "",
      location: "",
      gender: null,
      interestedIn: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const bodyData = {
        fullName: values.fullName,
        email: values.email,
        about: {
          age: values.age,
          location: values.location,
          gender: values.gender?.value,
          interestedIn: values.interestedIn?.value,
        },
      };
      try {
        const response = await updateProfile(bodyData);
        toast.success("Profile updated successfully");
        console.log(response);
        dispatch(setUser(response.userData));
      } catch (error) {
        toast.error("An error occurred while updating the profile.");
      } finally {
       
      }
    },
  });
  return {
    addProfileFormik
  };
};
