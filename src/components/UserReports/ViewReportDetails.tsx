import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link,useNavigate } from "react-router-dom";

import { IUserReportsTable } from "../../interfaces/Itable";
import classes from "../../components/edit/editCustomer/EditCustomer.module.scss";
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import { DetailsReportApi,UserReportCloseApi,deleteReportApi } from "../../service/apis/userReports.api";
import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { images } from "../../constants";
import Card from "../UI/card/Card";
import toast from "react-hot-toast";

function ViewReportDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [reportData, setReportData] = useState<IUserReportsTable | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState("2");
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const navigate=useNavigate();

  const capitalizeFirstLetter = (string: any) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchCustomerData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await DetailsReportApi(id);
      setReportData(response?.reportData || null);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchCustomerData();
    }
  }, [id, setReportData]);

  const handleClose = async () => {
    setLoading(true);
    try {
      const payload = {
        resolved: "false",
      };
      const response = await UserReportCloseApi(id,payload);
      if (response) {
        await fetchCustomerData();
        toast.success('Report marked as closed successfully!');
      }
    } catch (error) {
      console.error("Error marking item as closed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteReportApi(id);
      if (response) {
        toast.success('User Report Deleted successfully.');
        navigate("/admin/reports");
      }
    } catch (error) {
      console.error("Error deleting the report", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
          {loading && <LoadingSpinner />}
      {!loading && (
        <>
      <div className={classes.com_header_flex}>
        <h2 className='title'>{t("User Report Details")}</h2>
        <div className='btn-wrap-users'>
          <Link to='/admin/reports'>
            <button className={classes.back_btn}>Back</button>
          </Link>
          {reportData?.resolved === true && (
          <button className={classes.block_btn} onClick={handleClose}>Closed</button>
        )}
          <button className={classes.verify_btn}onClick={handleDelete} >Delete</button>
        </div>
      </div>

      <div className={classes.user_acc}>
        <div className={classes.edit__container}>
          <div className={classes.edit__left}>
            <Card>
              <div className={classes.account}>
                <div className={classes.img_wrapper}>
                  <img
                    className={classes.avatar}
                    src={reportData?.userId?.profileimageurl || images.noimage}
                    alt='avatar'
                  />
                </div>
                <div className={classes.account__info}>
                  <h4>Account Details</h4>
                  <div className={classes.account__info__userName}>
                    <Icon icon='majesticons:user-line' width='24' />
                    <div>{reportData?.userId?.fullName}</div>
                  </div>
                  <div className={classes.account__info__userName}>
                    <Icon icon='mdi:account-group' width='24' />
                    <div>
                      {reportData?.userId?.role
                        ? capitalizeFirstLetter(reportData?.userId?.role)
                        : ""}
                    </div>
                  </div>
                  <div className={classes.account__info__userName}>
                    <Icon
                      icon={
                        reportData?.userId?.isVerfied
                          ? "mdi:check-circle-outline"
                          : "mdi:close-circle-outline"
                      }
                      width='24'
                      color={reportData?.userId?.isVerfied ? "green" : "red"}
                    />
                    <div>
                      <span>
                        {reportData?.userId?.isVerfied
                          ? "Verified"
                          : "Not Verified"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={classes.account__info}>
                  <h4>Contacts</h4>
                  <div className={classes.account__contact__email}>
                    <Icon icon='fontisto:email' width='24' />
                    <div>{reportData?.userId?.email}</div>
                  </div>

                  <div style={{ marginLeft: "0px" }}>
                    {reportData?.userId?.about?.fullAddress && (
                      <Icon
                        icon='clarity:home-line'
                        width='26'
                        style={{ marginRight: "10px" }}
                      />
                    )}
                    {reportData?.userId?.about?.fullAddress && (
                      <span>{reportData?.userId?.about.fullAddress}</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <div className={classes.account}>
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        aria-label='lab API tabs example'
                        onChange={handleTabChange}
                      >
                        <Tab label='Reported User Details' value='2' />
                        <Tab label='Report Description' value='3' />
                      </TabList>
                    </Box>
                    <TabPanel value='2'>
                      <div className='verification-wrap'>
                        <div className='details-wrapper'>
                          <div className='dtls'>
                            <p>
                              <strong>Full Name:</strong>{" "}
                              {reportData?.reportedUserId?.fullName}
                            </p>
                            <p>
                              <strong>Email:</strong>{" "}
                              {reportData?.reportedUserId?.email}
                            </p>
                            <p>
                              <strong>Role:</strong>{" "}
                              {reportData?.reportedUserId?.role}
                            </p>
                            <p>
                              <strong>Location:</strong>{" "}
                              {reportData?.reportedUserId?.about?.fullAddress ||
                                "N/A"}
                            </p>
                          </div>
                          <></>
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel value='3'>
                      <div className='media-wrapper'>
                        <div className='media'>
                          {/*  */}
                          <p>
                            <strong>Note: </strong> 
                            {reportData?.report ||"N/A"}
                          </p>
                        </div>
                      </div>
                    </TabPanel>
                  </TabContext>
                </Box>
              </div>
            </Card>
          </div>
        </div>
      </div>
      </>
      )}
    </section>
  );
}

export default ViewReportDetails;
