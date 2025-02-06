import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";

import { IUserReportsTable } from "../../interfaces/Itable";
import classes from "../../components/edit/editCustomer/EditCustomer.module.scss";
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import {
  userDetails,
  updateActiveStatus,
  updateVerificationStatus,
} from "../../service/apis/user.api";
import { Icon } from "@iconify/react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { images } from "../../constants";
import Card from "../UI/card/Card";
import toast from "react-hot-toast";

function ViewReportDetails() {
//   const { t } = useTranslation();
//   const { id } = useParams();
//   const [reportData, setReportData] = useState<IUserReportsTable | null>(
//     null
//   );
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await userDetails(id);
//         setReportData(response?.data || null);
//       } catch (err) {
//         setError("Failed to fetch data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchCustomerData();
//     }
//   }, [id, setReportData]);

  return (
    <section>
    
    </section>
  );
}

export default ViewReportDetails;
