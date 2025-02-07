import { useEffect, useState } from "react";
import WalletsViewManagement from "./WithdrawalViewManagement";
import LoadingSpinner from "../UI/loadingSpinner/LoadingSpinner";
import { IWithdrawalTable } from "../../interfaces/Itable";
import { adminwithdrawalHeader } from "../../constants/tables";
import { WithdrawalListApi } from "../../service/apis/transactions.api";
import withRole from "../../pages/withRole";
import { useNavigate } from "react-router-dom";
import tabwrap from "../../pages/admin/tabwrap.module.scss";
import { Tabs, Tab, Box } from "@mui/material";

function WithdrawalView() {
  const [selectedTab, setSelectedTab] = useState("Pending");
  const [status, setStatus] = useState('Pending');
  const [data, setData] = useState<IWithdrawalTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalWithdrawal, setTotalwithdrawl] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const limit = 10;

  const getwithdrawal = async (status: string) => {
    setLoading(true);
    try {
      const bodyData = {
        currentPage: 1,
        limit: limit,
        status: status,
        search : "",
      };
      const response = await WithdrawalListApi(bodyData);
      if (response?.status === 200) {
        setData(response?.withdrawals?.withdrawals);
        setTotalwithdrawl(response?.withdrawals?.totalResults);
        setTotalPage(response?.withdrawals?.totalPages);
        setCurrentPage(response?.withdrawals?.page);
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
    const statusMapping: Record<string, string> = {
      Pending: 'Pending',
      Approved: 'Approved',
      Rejected:'Rejected',
    };
    // Get the status based on the selected tab, or a default if not found
    const newStatus = statusMapping[newValue] ?? '';
    setStatus(newStatus);
  };
  useEffect(() => {
    getwithdrawal(status);
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
            label='Approved'
            value='Approved'
            className={tabwrap.tablistw}
          />
            <Tab
            label='Rejected'
            value='Rejected'
            className={tabwrap.tablistw}
          />
          
        </Tabs>
      </Box>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <WalletsViewManagement
          limit={limit}
          headData={adminwithdrawalHeader}
          bodyData={data as IWithdrawalTable[]}
          statuss={status}
          totalData={totalWithdrawal}
          totalPage={totalPage}
          dataCurrentPage={currentPage}
        />
      )}
    </section>
  );
}
export default withRole(WithdrawalView, ["admin"]);
