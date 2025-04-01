import { useEffect, useState } from "react";
import UserReportsManagement from "../../components/UserReports/UserReportsManagement";
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import { IUserReportsTable } from "../../interfaces/Itable";
import { adminReportsHeader } from "../../constants/tables";
import { UserReportsListApi } from "../../service/apis/userReports.api";
import withRole from "../../pages/withRole";
import tabwrap from "../../pages/admin/tabwrap.module.scss";
import { Tabs, Tab, Box } from "@mui/material";

function UserReportsList() {
  const [data, setData] = useState<IUserReportsTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalReports, setTotalReports] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState("Pending");
  const [status, setStatus] = useState<boolean>(false);

  const limit = 10;

  const getReports = async (status: boolean) => {
    setLoading(true);
    try {
      const bodyData = {
        currentPage: 1,
        limit: 10,
        resolve: status,
      };
      const response = await UserReportsListApi(bodyData);
      if (response) {
        setData(response?.reportData?.reportData);
        setTotalReports(response?.reportData?.totalResults);
        setTotalPage(response?.reportData?.totalPages);
        setCurrentPage(response?.reportData?.page);
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    const statusMapping: Record<string, boolean> = {
        Pending: false,
        Closed: true,
    };
    // Get the status based on the selected tab, or a default if not found
    const newStatus = statusMapping[newValue] ?? '';
    setStatus(newStatus);
  };

  useEffect(() => {
    getReports(status);
  }, [status]);

  return (
    <section className='users-pages'>
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
      {loading ? (
        <LoadingSpinner />
      ) : (
        <UserReportsManagement
          limit={limit}
          headData={adminReportsHeader}
          bodyData={data as IUserReportsTable[]}
          statuss={status ? "false" : "true"}
          totalData={totalReports}
          totalPage={totalPage}
          dataCurrentPage={currentPage}
        />
      )}
    </section>
  );
}
export default withRole(UserReportsList, ["admin"]);
