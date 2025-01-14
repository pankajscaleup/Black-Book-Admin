import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from "../../components/UI/card/Card";
import classes from "../../components/edit/editCustomer/EditCustomer.module.scss";
import withRole from "../withRole";
import Avatar from "../../assets/images/avatar.jpg";
import { useState, useEffect } from "react";
import { getsettings, updateHeaderLogo, updateFooterLogo, savesettings } from "../../service/apis/setting.api";
import toast from 'react-hot-toast';

function Settings() {
  const [value, setValue] = React.useState("1");
  const [headerlogopreview, setHeaderlogopreview] = useState(Avatar);
  const [footerlogopreview, setFooterlogopreview] = useState(Avatar);
  const [id, setId] = useState('');
  const [copyright, setCopyright] = useState('');
  const [adminEmail, setAdminEmail] = useState('');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const getDetails = async () => {
    try {
      const response = await getsettings();
      if(response?.status === 200){
        setHeaderlogopreview(response?.settings.headerLogo);
        setFooterlogopreview(response?.settings.footerLogo);
        setId(response?.settings._id);
        setCopyright(response?.settings.copyright || '');
        setAdminEmail(response?.settings.adminEmail || '');
    }
    }catch (error) {
      toast.error("An error occurred while updating the profile.");
  } finally {
   
  }
}
useEffect(() => {
  getDetails();
}, []);

const handleHeaderFileChange = (event:any) => {
  const file = event.target.files[0];
  if (file) {
    setHeaderlogopreview(URL.createObjectURL(file));
    handleHeaderLogoUpload(file);
  }
};

const handleHeaderLogoUpload = async (file:any) => {
  if (!file) {
    alert("Please select an image file first.");
    return;
  }
  const formData = new FormData();
    formData.append("headerLogo", file);
  try {
    const response = await updateHeaderLogo(formData, id);
    if(response?.status === 200){
      setHeaderlogopreview(response?.settings.headerLogo);
      toast.success("Header logo updated successfully");
    }
  } catch (error) {
      toast.error("An error occurred while updating the header logo.");
  } finally {
  }
}

const handleFooterFileChange = (event:any) => {
  const file = event.target.files[0];
  if (file) {
    setFooterlogopreview(URL.createObjectURL(file));
    handleFooterLogoUpload(file);
  }
};

const handleFooterLogoUpload = async (file:any) => {
  if (!file) {
    alert("Please select an image file first.");
    return;
  }
  const formData = new FormData();
    formData.append("footerLogo", file);
  try {
    const response = await updateFooterLogo(formData, id);
    if(response?.status === 200){
      console.log(response);
      setFooterlogopreview(response?.settings.footerLogo);
      toast.success("Footer logo updated successfully");
    }
  } catch (error) {
      toast.error("An error occurred while updating the footer logo.");
  } finally {
  }
}

const handleSaveSettings = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!copyright.trim()) {
    toast.error("Copyright text cannot be empty.");
    return;
  }
  if (!adminEmail.trim() || !/^\S+@\S+\.\S+$/.test(adminEmail)) {
    toast.error("Please provide a valid email address.");
    return;
  }
  try {
    const bodyData = {
      copyright: copyright,
      adminEmail: adminEmail
    }
    const response = await savesettings(bodyData, id);
    if (response?.status === 200) {
      toast.success("Settings saved successfully.");
    }
  } catch (error) {
    toast.error("An error occurred while saving the settings.");
  }
};

  return (
    <div className='setting-form'>
    <div className={classes.user_acc}>
      <div className={classes.edit__container}>
        <div className={classes.edit__left}>
          <Card>
            <div className={classes.account}>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                      <Tab label="Site Logo" value="1" />
                      <Tab label="Footer Content" value="2" />
                    </TabList>
                  </Box>

                  <TabPanel value="1">
                    <div className="header-wrap">
                      <form  className='upload-setting-logo'>
                        <label>Header Logo</label>
                        <div className="upload-logo-file">

                        <div className="uploadimage">
                            <div className="upload-logo">
                              <img src={headerlogopreview || Avatar} alt="Avatar" />
                            </div>
                            <div className="upbtn">
                              <input
                                className="choosefile"
                                type="file"
                                accept="image/*"
                                onChange={handleHeaderFileChange}
                              />
                              <button className="btn upbtn">
                                Upload Picture
                              </button>
                            </div>
                          </div>

                        </div>
                        <label>Footer Logo</label>
                        <div className="upload-logo-file">
                        <div className="uploadimage">
                            <div className="upload-logo">
                              <img src={footerlogopreview || Avatar} alt="Avatar" />
                            </div>
                            <div className="upbtn">
                              <input
                                className="choosefile"
                                type="file"
                                accept="image/*"
                                onChange={handleFooterFileChange}
                              />
                              <button className="btn upbtn">
                                Upload Picture
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </TabPanel>

                  <TabPanel value="2">
                    <div className="footer-wrap">
                      <form onSubmit={handleSaveSettings} className="upload-setting-logo">
                        <label>Bottom Copyright</label>
                        <div className="formgrp">
                          <input
                            type="text"
                            placeholder="Copyright text"
                            value={copyright}
                            onChange={(e) => setCopyright(e.target.value)}
                          />
                        </div>
                        <label>Admin Email</label>
                        <div className="formgrp">
                          <input
                            type="text"
                            placeholder="Admin email"
                            value={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                          />
                        </div>
                        <button type="submit" className={classes.upbtn}>Save</button>
                      </form>
                    </div>
                  </TabPanel>
                </TabContext>
              </Box>
            </div>
          </Card>
        </div>
      </div>
    </div>
    </div>
  );
}

export default withRole(Settings, ["admin"]);
