import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { pageDetails,updatePage } from "../../service/apis/page.api";
interface FormValues {
  title: string;
  description:string
}
export const useAddPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FormValues | null>(null);
  const decodeHtml = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  const getPageDetails = async(id:any) =>{
    try {
      const response = await pageDetails(id); 
      setData(response.pageData);
    } catch (err) {
    } finally {
    }
  }
  useEffect(() => {
    if(id){
      getPageDetails(id);
    }
    
  }, [id]);
  // Form validation schema
  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
  });
  // Formik setup
  const addPageFormik = useFormik<FormValues>({
    initialValues: {
      title: data?.title || "",
      description: data?.description ? decodeHtml(data.description) : "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const bodyData = {
        title: values.title,
        description:values.description
      };
      try {
        let response;
        if(id){
          response = await updatePage(bodyData,id);
        }else{
          //response = await addPage(bodyData);
        }
        
        toast.success(response.message);
        resetForm();
        navigate("/admin/pages");
      } catch (error) {
        toast.error("An error occurred while adding the company.");
      } finally {
        setLoading(false);
      }
    },
  });
  return {
    addPageFormik,
    loading,
  };
};
