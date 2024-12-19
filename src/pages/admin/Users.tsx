import { useEffect, useState } from "react";
import CustomTableNew from "../../components/tables/customTable/CustomTableNew";
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import { IUsersRoleTable } from "../../interfaces/Itable";
import tabwrap from "./tabwrap.module.scss";
import { adminUsersHeader } from "../../constants/tables";
import { userApi } from "../../service/apis/user.api";
import withRole from "../withRole";
import { Tabs, Tab, Box } from "@mui/material";
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
      console.log(response);
      if (response?.status === 200) {
        console.log(response.users);
        setData(response?.users?.users);
        setTotalUser(response?.users?.totalResults);
        setTotalPage(response?.users?.totalPages);
        setCurrentPage(response?.data?.page);
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
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
    };

    // Get the role based on the selected tab, or a default if not found
    const newRole = roleMapping[newValue] ?? '';
    setRole(newRole);
  };

  useEffect(() => {
    getCustomer(role);
  }, [role]);

  return (
    <section>
      {/* Tab Navigation */}
      <Box sx={{ width: "100%" }}>
        <Tabs
          className={tabwrap.tabwrapper}
          value={selectedTab}
          onChange={handleTabChange}
          aria-label='role tabs'
          sx={{
            "& .MuiTab-root": { backgroundColor: "lightgray" },
            "& .Mui-selected": {
              backgroundColor: "#E4AF5F !important",
              color: "#fff !important",
            },
            "& .MuiTabs-indicator": { display: "none" },
          }}
        >
          <Tab
            label='Seeker'
            value='seeker'
            className={tabwrap.tablistw}
          />
          <Tab
            label='Model'
            value='model'
            className={tabwrap.tablistw}
          />
          <button className={tabwrap.adduserbtn} onClick={() => navigate('/admin/addUser')}>ADD USER</button>
        </Tabs>
      
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
