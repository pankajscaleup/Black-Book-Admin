import { useEffect, useState } from "react";
import CustomTableNew from "../../components/tables/customTable/CustomTableNew";
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import { IUsersRoleTable } from "../../interfaces/Itable";
import tabwrap from "./tabwrap.module.scss";
import { adminUsersHeader } from "../../constants/tables";
import { userApi } from "../../service/apis/user.api";
import withRole from "../withRole";
import { Tabs, Tab, Box } from "@mui/material";
import ButtonBase from '@mui/material/ButtonBase';
import { useNavigate } from "react-router-dom";

function Customers() {
  const navigate = useNavigate();
  const [data, setData] = useState<IUsersRoleTable[]>([]);
  const [loading, setLoading] = useState(true); 
  const [selectedTab, setSelectedTab] = useState("seeker");
  const [role, setRole] = useState('seeker');
  const [totalUser, setTotalUser] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const limit = 10;

  // Fetch users based on selected tab (role)
  const getCustomer = async (role: string) => {
    setLoading(true);

    try {
      const bodyData = {
        currentPage: 1,
        limit: 10,
        role: role,
      };
      const response = await userApi(bodyData);
      if (response?.status === 200) {
        setData(response?.users?.users);
        setTotalUser(response?.users?.totalResults);
        setTotalPage(response?.users?.totalPages);
        setCurrentPage(response?.users?.page);
      }
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
    const roleMapping: Record<string, string> = {
      seeker: 'seeker',
      model: 'model',
      admin: 'admin'
    };

    // Get the role based on the selected tab, or a default if not found
    const newRole = roleMapping[newValue] ?? '';
    setRole(newRole);
  };

  useEffect(() => {
    getCustomer(role);
  }, [role]);

  return (
    <section className="users-pages">
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
            label='Seeker'
            value='seeker'
            className={`${tabwrap.tablistw} ${tabwrap.btnyellow}`}
          />
          <Tab
            label='Model'
            value='model'
            className={tabwrap.tablistw}
          />
          <Tab
            label='Admin'
            value='admin'
            className={tabwrap.tablistw}
          />
          
        </Tabs>
        <ButtonBase className={`${tabwrap.adduserbtn} ${tabwrap.btnyellow}`} onClick={() => navigate('/admin/addUser')}>ADD USER</ButtonBase>
      </Box>
     
      {/* Conditional Rendering for Data */}
      {loading ? (
        <LoadingSpinner /> // Show loading spinner while data is loading
      ) : (
        <CustomTableNew
          limit={limit}
          headData={adminUsersHeader}
          bodyData={data as IUsersRoleTable[]}
          role={role}
          totalData={totalUser}
          totalPage={totalPage}
          dataCurrentPage={currentPage}
        />
      )}
    </section>
  );
}

export default withRole(Customers, ["admin"]);
