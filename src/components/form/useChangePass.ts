import { useFormik } from "formik";
import * as yup from "yup";
import { changePasswordApi } from "../../service/apis/auth.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface changePasswordFormValues {
  password_old: string;
  password_new: string;
  cpassword: string;
}

export const useChangePass = () => {
  const navigate = useNavigate();
  const changePasswordFormik = useFormik<changePasswordFormValues>({
    initialValues: {
        password_old: "",
        password_new: "",
        cpassword: "",
    },
    validationSchema: yup.object({
        password_old: yup
            .string()
            .trim()
            .min(8, "Must be 8 or more than 8 characters")
            .required("Old password field is Required")
            .matches(/\w/, "Please enter valid password"),

        password_new: yup
            .string()
            .trim()
            .min(8, "Must be 8 or more than 8 characters")
            .required("New password field is Required")
            .matches(/\w/, "Please enter valid password"),

        cpassword: yup
            .string()
            .trim()
            .min(8, "Must be 8 or more than 8 characters")
            .required("Confirm Password field is Required")
            .oneOf([yup.ref("password_new")], "Passwords must match")
            .matches(/\w/, "Please enter valid password"),
    }),
    onSubmit: async (values) => {
      const bodyData = {
        password_old: values.password_old,
        password_new: values.password_new,
      };
      try {
        const response = await changePasswordApi(bodyData);
        toast.success("Password has been changed successfully");
        navigate('/');
      } catch (error) {
        toast.error("An error occurred while resetting the password." + error);
      }
    },
  });

  return {
    changePasswordFormik,
  };
};
