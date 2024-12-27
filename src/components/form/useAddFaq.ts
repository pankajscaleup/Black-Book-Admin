import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { faqDetails,addFaq,updateFaq } from "../../service/apis/faq.api";
interface FormValues {
  question: string;
  answer:string
}
export const useAddFaq = () => {
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
  const getFaqDetails = async(id:any) =>{
    try {
      const response = await faqDetails(id); 
      setData(response.data);
    } catch (err) {
    } finally {
    }
  }
  useEffect(() => {
    if(id){
      getFaqDetails(id);
    }
    
  }, [id]);
  // Form validation schema
  const validationSchema = yup.object({
    question: yup.string().required("Question is required"),
    answer: yup.string().required("Answer is required"),
  });
  // Formik setup
  const addFaqFormik = useFormik<FormValues>({
    initialValues: {
      question: data?.question || "",
      answer: data?.answer ? decodeHtml(data.answer) : "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const bodyData = {
        question: values.question,
        answer:values.answer
      };
      try {
        let response;
        if(id){
          response = await updateFaq(bodyData,id);
        }else{
          response = await addFaq(bodyData);
        }
        
        toast.success(response.message);
        resetForm();
        navigate("/admin/Faqs");
      } catch (error) {
        toast.error("An error occurred while adding the company.");
      } finally {
        setLoading(false);
      }
    },
  });
  return {
    addFaqFormik,
    loading,
  };
};
