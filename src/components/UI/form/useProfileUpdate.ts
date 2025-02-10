import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { updateProfile } from "../../../service/apis/user.api";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/auth.store";
import { updateProfileImage } from "../../../service/apis/user.api";

interface FormValues {
  fullName: string;
  email: string;
  age: string;
  fullAddress:string;
 state:string;
 lat:string;
 lng:string;
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
    state: yup.string().required("Location is required and please select address from the dropdown"),
    gender: yup.object().nullable().required("Gender is required"),
    interestedIn: yup.object().nullable().required("interested In is required"),
  });

  // Formik setup
  const addProfileFormik = useFormik<FormValues>({
    initialValues: {
      fullName: "",
      email: "",
      age: "",
      fullAddress: "",
      gender: null,
      interestedIn: null,
      state:"",
      lat:"",
      lng:"",
    },
    validationSchema,
    onSubmit: async (values) => {
      const bodyData = {
        fullName: values.fullName,
        email: values.email,
        about: {
        fullAddress : values.fullAddress,
        state :values.state ,
        location : {
            coordinates : [
              values.lat,
              values.lng
            ],
            type : "Point"
        },
          age: values.age,
          gender: values.gender?.value,
          interestedIn: values.interestedIn?.value,
        },
      };
      try {
        const response = await updateProfile(bodyData);
        toast.success("Profile updated successfully");
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
