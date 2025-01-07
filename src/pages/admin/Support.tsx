import { useEffect, useState } from "react";
import CustomTableNewSupport from "../../components/tables/customTable/CustomTableNewSupport";
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import { IUsersSupportTable } from "../../interfaces/Itable";
import tabwrap from "./tabwrap.module.scss";
import { adminSupportHeader } from "../../constants/tables";
import { supportList } from "../../service/apis/support.api";
import withRole from "../withRole";
import { Tabs, Tab, Box } from "@mui/material";

function Support() {
  const [data, setData] = useState<IUsersSupportTable[]>([]);
  const [loading, setLoading] = useState(true); 
  const [selectedTab, setSelectedTab] = useState("Pending");
  const [status, setStatus] = useState('Pending');
  const [totalSupport, setTotalSupport] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const limit = 10;

  // Fetch users based on selected tab (status)
  const getSupport = async (status: string) => {
    setLoading(true);
    try {
      const bodyData = {
        currentPage: 1,
        limit: 10,
        status: status,
      };
      const response = await supportList(bodyData);
        console.log(response);
        setData(response?.supportData?.viewSupport);
        setTotalSupport(response?.supportData?.totalResults);
        setTotalPage(response?.supportData?.totalPages);
        setCurrentPage(response?.supportData?.page);
    } catch (err) {
      console.error("Failed to fetch data", err);
      setLoading(false)
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    const statusMapping: Record<string, string> = {
      Pending: 'Pending',
      Closed: 'Closed',
    };

    // Get the status based on the selected tab, or a default if not found
    const newStatus = statusMapping[newValue] ?? '';
    setStatus(newStatus);
  };

  useEffect(() => {
    getSupport(status);
  }, [status]);

  return (
    <section>
      {/* Tab Navigation */}
      <Box className={tabwrap.boxWrap}>
        <Tabs
          className={tabwrap.tabwrapper}
          value={selectedTab}
          onChange={handleTabChange}
          aria-label='role tabs'
          sx={{
            "& .MuiTab-root": { background: "var(--dark)" },
            "& .Mui-selected": {
              background: "#b37a4f!important",
              color: "#fff !important",
            },
            "& .MuiTabs-indicator": { display: "none" },
          }}
        >
          <Tab
            label='Pending'
            value='Pending'
            className={`${tabwrap.tablistw} ${tabwrap.btnyellow}`}
          />
          <Tab
            label='Closed'
            value='Closed'
            className={tabwrap.tablistw}
          />
          
        </Tabs>
      </Box>
     
      {/* Conditional Rendering for Data */}
      {loading ? (
        <LoadingSpinner /> // Show loading spinner while data is loading
      ) : (
        <CustomTableNewSupport
          limit={limit}
          headData={adminSupportHeader}
          bodyData={data as IUsersSupportTable[]}
          status={status}
          totalData={totalSupport}
          totalPage={totalPage}
          dataCurrentPage={currentPage}
        />
      )}
    </section>
  );
}

export default withRole(Support, ["admin"]);
