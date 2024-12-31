import React, { useState } from "react";
import Card from "../../UI/card/Card";
import classes from "./EditCustomer.module.scss";
import { IUsersRoleTable } from "../../../interfaces/Itable";
import { Icon } from "@iconify/react";
import LoadingSpinner from "../../UI/loadingSpinner/LoadingSpinner";
import Select from "react-select";
import form from "../../form/formcus.module.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateStatus } from "../../../service/apis/user.api";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import toast from "react-hot-toast";


const EditCustomer: React.FC<{ customer?: IUsersRoleTable }> = (props) => {
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

  const [loading, setLoading] = useState(false);
 /* const uid = props.customer?.id;

    // Form validation schema
    const validationSchema = yup.object({
      isVerfied: yup.object().nullable().required("Status is required"),
    });*/

  // Formik setup
  /*const formik = useFormik({
    initialValues: {
      isVerfied: null
    },
    validationSchema,
    onSubmit: async (values:any) => {
      setLoading(true);
      console.log(values.isVerfied?.value);
      try {
        const bodyData = {
          isVerfied: values.isVerfied?.value
        }
        const response = await updateStatus(uid, bodyData);
        if (response.status === 200) {
          toast.success(response.message);
        }
      } catch (error) {
        toast.error("An error occurred while adding the status.");
      } finally {
        setLoading(false);
      }
    },
  }); */
  
  
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
                <h4>Account Details</h4>
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
                <h4>Contacts</h4>
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
                  { /*<Tab label="Manage Status" value="5" /> */ }
                  </TabList>
                </Box>

                <TabPanel value="1">
                  <div className="verification-wrap">
                    <div className="img-wrapper">
                      <h4>User ID</h4>
                        <img
                          className="id-image"
                          src={props.customer?.verification?.verificationId ? props.customer?.verification?.verificationId: ''}/>
                    </div>
                    <div className="selfie-wrapper">
                      <h4>Selfie</h4>
                      <div className={classes.img_wrapper}>
                          <img
                            className={classes.avatar}
                            src={props.customer?.verification?.selfie ? props.customer?.verification?.selfie: ''}/>
                      </div>
                    </div>
                    <div className="social-wrapper">
                      <h4>Social Links</h4>
                      <div className={classes.account__contact__email}>
                        <Icon icon="fontisto:facebook" width="24" />
                        <a 
                          href={props.customer?.socialLinks?.facebooklink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {props.customer?.socialLinks?.facebooklink}
                        </a>
                      </div>
                      <div className={classes.account__contact__email}>
                        <Icon icon="fontisto:instagram" width="24" />
                        <a 
                          href={props.customer?.socialLinks?.instagramlink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {props.customer?.socialLinks?.instagramlink}
                        </a>
                      </div>
                      <div className={classes.account__contact__email}>
                        <Icon icon="fontisto:twitter" width="24" />
                        <a 
                          href={props.customer?.socialLinks?.twitterlink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {props.customer?.socialLinks?.twitterlink}
                        </a>
                      </div>
                    </div>
                  </div>
                </TabPanel>

                <TabPanel value="2">
                  <div className="verification-wrap">
                    <div className="details-wrapper">
                      <h4>Personal Details</h4>
                      <div className="dtls">
                        <p><strong>Email :</strong>  {props.customer?.email} </p>
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
                        <p><strong>Bio :</strong> {props.customer?.about?.bio} </p>
                      </div>
                      <></>
                    </div>
                  </div>
                </TabPanel>

                <TabPanel value="3">
                <div className="media-wrapper">
                  <h4>Intro Media</h4>
                  <div className="media">
                    {props.customer?.introImages?.map((media:any) => {
                      const fileExtension = media.introImage.split('.').pop().toLowerCase();

                      if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
                        return (
                          <div key={media._id} className="media-item">
                            <img src={media.introImage} alt="Intro Media" width="300" />
                          </div>
                        );
                      }

                      if (["mp4", "webm", "ogg"].includes(fileExtension)) {
                        return (
                          <div key={media._id} className="media-item">
                            <video controls width="300">
                              <source src={media.introImage} type={`video/${fileExtension}`} />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
                </TabPanel>

                <TabPanel value="4">
                <div className="contnet-wrapper">
                  <h4>Private Content</h4>
                  <div className="private-content">
                    {props.customer?.privatemedia?.map((media:any) => {
                      const fileExtension = media.privatemedia.split('.').pop().toLowerCase();

                      if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
                        return (
                          <div key={media._id} className="media-item">
                            <img src={media.privatemedia} alt="Intro Media" width="300" />
                          </div>
                        );
                      }

                      if (["mp4", "webm", "ogg"].includes(fileExtension)) {
                        return (
                          <div key={media._id} className="media-item">
                            <video controls width="300">
                              <source src={media.privatemedia} type={`video/${fileExtension}`} />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
                </TabPanel>

                { /*<TabPanel value="5">

                <div className="status-wrapper">
                  <h4>Model Verify<span style={{ color: "red" }}>*</span></h4>
                  <div className="status-verify">
                  <form onSubmit={formik.handleSubmit} autoComplete="off">
                  <div className={form.profileform}>
                    <div className={form.profileformcol}>
                      <div className="formgrp">
                        <Select
                          placeholder="Select Status"
                          options={[
                            { value: true, label: "Verify" },
                            { value: false, label: "Not Verify" },
                          ]}
                          name="isVerfied"
                          value={formik.values.isVerfied}
                          onChange={(option) => formik.setFieldValue("isVerfied", option)}
                          styles={{
                            control: (base) => ({
                              ...base,
                              boxShadow: "none",
                              border: "1px solid #c7c7c7",
                              height: "58px",
                              borderRadius: "100px",
                              padding: "10px 12px",
                            }),
                          }}
                        />
                        {formik.touched.isVerfied && formik.errors.isVerfied && (
                          <div className="error">{formik.errors.isVerfied}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    <button type="submit" className={form.upbtn}>
                      Save
                    </button>
                  )}
                </form>

                    </div>
                  </div> 
                </TabPanel> */ }
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
