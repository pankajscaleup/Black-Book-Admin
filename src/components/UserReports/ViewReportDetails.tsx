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
  const { t } = useTranslation();
  const { id } = useParams();
  const [reportData, setReportData] = useState<IUserReportsTable | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [value, setValue] = useState('2');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchCustomerData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await userDetails(id);
        setReportData(response?.data || null);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCustomerData();
    }
  }, [id, setReportData]);

  return (
    <section>
      <div className={classes.com_header_flex}>
        <h2 className='title'>{t("User Report Details")}</h2>
        <div className='btn-wrap-users'>
          <Link to='/admin/reports'>
            <button className={classes.back_btn}>Back</button>
          </Link>
          <button className={classes.block_btn}>Closed</button>

          <button className={classes.verify_btn}>Delete</button>
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
                //   src={props.customer?.profileimageurl || images.noimage}
                  alt="avatar"
                />
              </div>
              <div className={classes.account__info}>
                <h4>Account Details</h4>
                <div className={classes.account__info__userName}>
                  <Icon icon='majesticons:user-line' width='24' />
                  <div>
                    {/* {props.customer?.fullName} */}
                  </div>
                </div>
                <div className={classes.account__info__userName}>
                  <Icon icon='mdi:account-group' width='24' />
                  <div>
                    {/* {props.customer?.role ? capitalizeFirstLetter(props.customer?.role):''} */}
                  </div>
                </div>
                <div className={classes.account__info__userName}>
                {/* <Icon
                    icon={props.customer?.isVerfied ? 'mdi:check-circle-outline' : 'mdi:close-circle-outline'}
                    width="24"
                    color={props.customer?.isVerfied ? 'green' : 'red'}
                  /> */}
                  <div>
                  {/* <span>{props.customer?.isVerfied ? 'Verified' : 'Not Verified'}</span> */}
                  </div>
                </div>
              </div>
              <div className={classes.account__info}> 
                <h4>Contacts</h4>
                <div className={classes.account__contact__email}>
                  <Icon icon='fontisto:email' width='24' />
                  {/* <div>{props.customer?.email}</div> */}
                </div>

                <div style={{ marginLeft: "0px" }}>
                  {/* {props.customer?.about?.location && (
                    <Icon
                      icon='clarity:home-line'
                      width='26'
                      style={{ marginRight: "10px" }}
                    />
                  )}
                  {props.customer?.about?.location && (
                    <span>{props.customer.about.location}</span>
                  )} */}
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className={classes.account}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList  aria-label="lab API tabs example"onChange={handleTabChange}>
                    <Tab label="Personal Details" value="2" />
                    <Tab label="Unlock Media" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="2">
                  <div className="verification-wrap">
                    <div className="details-wrapper">
                      <h4>Personal Details</h4>
                      <div className="dtls">
                        {/* <p><strong>Email :</strong>  {props.customer?.email} </p>
                        <p><strong>Age :</strong> {props.customer?.about?.age} </p>
                        <p><strong>Height :</strong> {props.customer?.about?.height} </p>
                        <p><strong>Gender :</strong> {props.customer?.about?.gender} </p>
                        <p><strong>Ethnicity :</strong> {props.customer?.about?.ethnicity?.name} </p>
                        <p><strong>Body Type :</strong> {props.customer?.about?.bodyType?.name} </p>
                        <p><strong>Kids :</strong> {props.customer?.about?.kids?.name} </p>
                        <p><strong>Education :</strong> {props.customer?.about?.education?.name} </p>
                        <p><strong>Occupation :</strong>  {props.customer?.about?.occupation} </p>
                        <p><strong>Location :</strong> {props.customer?.about?.location}</p>
                        <p><strong>Interested Gender :</strong> {props.customer?.about?.interestedIn}</p>
                        <p><strong>Smoking Cigarettes :</strong> {props.customer?.about?.smoking?.name} </p>
                        <p><strong>Drinking :</strong> {props.customer?.about?.drinking?.name} </p>
                        <p><strong>Relationship Status :</strong> {props.customer?.about?.relationshipStatus?.name} </p>
                        <p><strong>Interest :</strong> {props.customer?.about?.interest}</p>
                        <p className="w-100"><strong>Bio :</strong> {props.customer?.about?.bio} </p> */}
                         <p><strong>Email:</strong> testuser@example.com</p>
                    <p><strong>Age:</strong> 30</p>
                    <p><strong>Height:</strong> 5'9"</p>
                      </div>
                      <></>
                    </div>
                  </div>
                </TabPanel>

                <TabPanel value="3">
                <div className="media-wrapper">
                  <h4>Unlock Media</h4>
                  <div className="media">
                    {/*  */}
                    <p><strong>Profile Picture:</strong> Image of User</p>
                  <p><strong>Videos:</strong> 3 Videos uploaded</p>
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
    </section>
  );
}

export default ViewReportDetails;
