import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CommonTable from "../../components/tables/customTable/CommonTable";
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import { IFaqTable } from "../../interfaces/Itable";
import tabwrap from "./tabwrap.module.scss";
import {faqsHeader} from "../../constants/tables";
import withRole from "../withRole";
import { Tabs, Tab, Box } from "@mui/material";
import ButtonBase from '@mui/material/ButtonBase';
import { useNavigate } from "react-router-dom";
import { faqList,deleteFaq } from "../../service/apis/faq.api";
import toast from "react-hot-toast";

function Faqs() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState<IFaqTable[]>([]);
  const [loading, setLoading] = useState(true); 
  const [totalFaq, setTotalFaq] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const limit = 10;

  // Fetch users based on selected tab (role)
  const getFaqs = async () => {
    
    setLoading(true);
    try {
      let payload = {};
      if(searchTerm){
        payload ={
          search : searchTerm
        }
      }
      const response = await faqList(payload,currentPage,limit); 
      if (response?.status === 200) {
        if(response?.faqs?.faqs.length==0 && response?.faqs?.page>1){
          setCurrentPage(currentPage-1);
        }else{
          setData(response?.faqs?.faqs);
          setTotalFaq(response?.faqs?.totalResults);
          setTotalPage(response?.faqs?.totalPages);
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
      const response = await deleteFaq(id); 
      toast.success(response);
      await getFaqs();
    } catch (err) {
      console.error("Failed to fetch data", err);
      setLoading(false)
    } finally {
      setLoading(false); // Stop loading
    }
  }
  useEffect(() => {
    getFaqs();
  }, [currentPage]);

  const handleSearchChange = (term:string)=>{
    setSearchTerm(term);
    setCurrentPage(1);
    getFaqs();
  }

  return (
    <section className="editprofile">
      {/* Tab Navigation */}
      <Box className="addfaq mb-3">
        <ButtonBase className={tabwrap.adduserbtn} onClick={() => navigate('/admin/faq/add')}>ADD FAQ</ButtonBase>
      </Box>
     
      {/* Conditional Rendering for Data */}
      {loading ? (
        <LoadingSpinner /> // Show loading spinner while data is loading
      ) : (
        <CommonTable
          title="Faq"
          limit={limit}
          headData={faqsHeader}
          bodyData={data as IFaqTable[]}
          totalData={totalFaq}
          totalPage={totalPage}
          searchTerm={searchTerm}
          dataCurrentPage={currentPage}
          changePage= {handlePageChange}
          deleteMessage="Are you sure you want to delete this Faq?"
          handleDelete = {handleDelete}
          searchChange = {handleSearchChange}
          slug="faq"
        />
      )}
    </section>
  );
}

export default withRole(Faqs, ["admin"]);
