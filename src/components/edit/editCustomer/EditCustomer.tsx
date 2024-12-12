import React from "react";
import Card from "../../UI/card/Card";
import { useTranslation } from "react-i18next";
import classes from "./EditCustomer.module.scss";
import { IUsersRoleTable } from "../../../interfaces/Itable";
import { Icon } from "@iconify/react";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


const EditCustomer: React.FC<{ customer?: IUsersRoleTable }> = (props) => {
  const { t } = useTranslation();
  console.log(props);
  const capitalizeFirstLetter = (string:any) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [value, setValue] = React.useState(
    props.customer?.role === "model" ? "1" : "2"
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  
  return (
    <div className={classes.user_acc}>
      <div className={classes.edit__container}>
        <div className={classes.edit__left}>
          <Card>
            <div className={classes.account}>
              <div className={classes.img_wrapper}>
                  <img
                    className={classes.avatar}
                    src={props.customer?.profileimageurl ? props.customer?.profileimageurl: ''}/>
              </div>
              <div className={classes.account__info}>
                <p>{t("AccountDetails")}</p>
                <div className={classes.account__info__userName}>
                  <Icon icon='majesticons:user-line' width='24' />
                  <div>
                    {props.customer?.fullName}
                  </div>
                </div>
                <div className={classes.account__info__userName}>
                  <Icon icon='mdi:account-group' width='24' />
                  <div>
                    {props.customer?.role ? capitalizeFirstLetter(props.customer?.role):''}
                  </div>
                </div>
                <div className={classes.account__info__userName}>
                <Icon
                    icon={props.customer?.isVerfied ? 'mdi:check-circle-outline' : 'mdi:close-circle-outline'}
                    width="24"
                    color={props.customer?.isVerfied ? 'green' : 'red'}
                  />
                  <div>
                  <span>{props.customer?.isVerfied ? 'Verified' : 'Not Verified'}</span>
                  </div>
                </div>
              </div>
              <div className={classes.account__info}> 
                <p>{t("contacts")}</p>
                <div className={classes.account__contact__email}>
                  <Icon icon='fontisto:email' width='24' />
                  <div>{props.customer?.email}</div>
                </div>

                <div style={{ marginLeft: "0px" }}>
                  {props.customer?.about?.location && (
                    <Icon
                      icon='clarity:home-line'
                      width='26'
                      style={{ marginRight: "10px" }}
                    />
                  )}
                  {props.customer?.about?.location && (
                    <span>{props.customer.about.location}</span>
                  )}
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className={classes.account}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                  {props.customer?.role==='model' && (
                    <Tab label="Verification" value="1" />
                  )}
                    <Tab label="Personal Details" value="2" />
                    <Tab label="Intro Media" value="3" />
                    {props.customer?.role==='model' && (
                    <Tab label="Private Content" value="4" />
                  )}
                    <Tab label="Manage Status" value="5" />
                  </TabList>
                </Box>

                <TabPanel value="1">
                  Item One
                </TabPanel>

                <TabPanel value="2">
                  Item Two
                </TabPanel>

                <TabPanel value="3">
                  Item Three
                </TabPanel>

                <TabPanel value="4">
                  Item Four
                </TabPanel>

                <TabPanel value="5">
                  Item Five
                </TabPanel>

              </TabContext>
            </Box>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
