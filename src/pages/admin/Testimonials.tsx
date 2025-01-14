import { useEffect, useState } from "react";
import TestimonialTable from "../../components/tables/customTable/TestimonialTable";
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import { ITestTable } from "../../interfaces/Itable";
import tabwrap from "./tabwrap.module.scss";
import { testimonialHeader } from "../../constants/tables";
import withRole from "../withRole";
import { Box } from "@mui/material";
import ButtonBase from '@mui/material/ButtonBase';
import { useNavigate } from "react-router-dom";
import { testimonialList,deleteTestimonial } from "../../service/apis/testimonial.api";
import toast from "react-hot-toast";

function Testimonials() {
  const navigate = useNavigate();
  const [data, setData] = useState<ITestTable[]>([]);
  const [loading, setLoading] = useState(true); 
  const [totalTestimonial, setTotalTestimonial] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const limit = 10;

  // Fetch users based on selected tab (role)
  const getTestimonials = async () => {
    setLoading(true);
    try {
      let payload = {};
      if(searchTerm){
        payload ={
          search : searchTerm
        }
      }
      const response = await testimonialList(payload,currentPage,limit); 
      console.log(response);
      if (response?.status === 200) {
        if(response?.testimonials ?.testimonials.length==0 && response?.testimonials?.page>1){
          setCurrentPage(currentPage-1);
        }else{
          setData(response?.testimonials?.testimonials);
          setTotalTestimonial(response?.testimonials?.totalResults);
          setTotalPage(response?.testimonials?.totalPages);
        }
      }

    } catch (err) {
      console.error("Failed to fetch data", err);
      setLoading(false)
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handlePageChange = async (
    page: number)=>{
    setCurrentPage(page);
  }
  const handleDelete = async (id:string) =>{
    setLoading(true);
    try {
      const response = await deleteTestimonial(id); 
      toast.success(response);
      await getTestimonials();
    } catch (err) {
      console.error("Failed to fetch data", err);
      setLoading(false)
    } finally {
      setLoading(false); // Stop loading
    }
  }
  useEffect(() => {
    getTestimonials();
  }, [currentPage]);

  const handleSearchChange = (term:string)=>{
    setSearchTerm(term);
    setCurrentPage(1);
    getTestimonials();
  }

  return (
    <section className="editprofile">
      {/* Tab Navigation */}
      <Box className="addfaq mb-3">
        <ButtonBase className={tabwrap.adduserbtn} onClick={() => navigate('/admin/testimonial/add')}>ADD NEW</ButtonBase>
      </Box>
     
      {/* Conditional Rendering for Data */}
      {loading ? (
        <LoadingSpinner /> // Show loading spinner while data is loading
      ) : (
        <TestimonialTable
          title="Testimonial"
          limit={limit}
          headData={testimonialHeader}
          bodyData={data as ITestTable[]}
          totalData={totalTestimonial}
          totalPage={totalPage}
          searchTerm={searchTerm}
          dataCurrentPage={currentPage}
          changePage= {handlePageChange}
          deleteMessage="Are you sure you want to delete this testimonial?"
          handleDelete = {handleDelete}
          searchChange = {handleSearchChange}
          slug="testimonial"
        />
      )}
    </section>
  );
}

export default withRole(Testimonials, ["admin"]);
