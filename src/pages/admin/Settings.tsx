import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from "../../components/UI/card/Card";
import classes from "../../components/edit/editCustomer/EditCustomer.module.scss";
import Avatar from "../../assets/images/avatar.jpg";
import { getsettings, updateHeaderLogo, updateFooterLogo, savesettings, getFeaturedModels, updateFeaturedModels,updateBannerLogo } from "../../service/apis/setting.api";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { IUsersRoleTable } from '../../interfaces/Itable';
import { userApi } from '../../service/apis/user.api';
import CustomTableModelSettings from "../../components/tables/customTable/CustomTableModelSettings";
import { RiDragMove2Line } from 'react-icons/ri';
import noImage from "../../assets/images/no-images.svg";

function Settings() {
  const [value, setValue] = useState("1");
  const [headerlogopreview, setHeaderlogopreview] = useState(Avatar);
  const [footerlogopreview, setFooterlogopreview] = useState(Avatar);
  const [id, setId] = useState('');
  const [copyright, setCopyright] = useState('');
  const [adminEmail, setAdminEmail] = useState('');

  const [pContentCost, setPContentCost] = useState<string>('10');

  const [data, setData] = useState<IUsersRoleTable[]>([]);
  const [loading, setLoading] = useState(true); 
  const [totalUser, setTotalUser] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [items, setItems] = useState<any>([]);

  const limit = 10;
  const [bannerLeftImagepreview, setBannerLeftImagepreview] = useState(Avatar);
  const [bannerLeftPersonName, setBannerLeftPersonName] = useState('');
  const [bannerLeftPersonEvent, setBannerLeftPersonEvent] = useState('');
  const [bannerRightImagepreview, setBannerRightImagepreview] = useState(Avatar);
  const [bannerRightPersonName, setBannerRightPersonName] = useState('');
  const [bannerRighttPersonEvent, setBannerRighttPersonEvent] = useState('');

  // Fetch users based on selected tab (role)
  const getCustomer = async (role: string) => {
    setLoading(true);

    try {
      const bodyData = {
        currentPage: 1,
        limit: limit,
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

  // const handleCheckboxClick = async (event: any) => {
  //   if (event.target.checked) {
  //     setItems((prev:any) => [
  //       ...prev,
  //       {
  //         userId: event.target.value,
  //         name: event.target.dataset.name,
  //         image: event.target.dataset.img,
  //         id:items.length
  //       },
  //     ]);
  //   }
  //   else
  //   {
  //     setItems((prev: any) => prev.filter((cur: any) => cur.userId !== event.target.value));      
  //   }
  // };
  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value, dataset } = event.target;
  
    setItems((prev: any) => {
      // console.log(checked, value, dataset, 955);
  
      if (checked) {
        // Check if the item already exists in the list
        const exists = prev.some((item: any) => item.userId === value);
  
        if (!exists) {
          return [
            ...prev,
            {
              userId: value,
              name: dataset.name,
              image: dataset.img,
              id: items.length
            },
          ];
        }
        return prev; // Return unchanged list if item already exists
      } else {
        // Remove unchecked item from the list
        return prev
        .filter((item: any) => item.userId !== value)
        .map((item: any, index: number) => ({ ...item, id: index }));
      }
    });
  };
  
  

  useEffect(() => {
    getCustomer('model');
  }, []);
  

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
        setBannerLeftImagepreview(response?.settings.bannerLeftPersonImage || '');
        setBannerLeftPersonName(response?.settings.bannerLeftPersonName || '');
        setBannerLeftPersonEvent(response?.settings.bannerLeftPersonEvent || '');
        setBannerRightImagepreview(response?.settings.bannerRightPersonImage || '');
        setBannerRightPersonName(response?.settings.bannerRightPersonName || '');
        setBannerRighttPersonEvent(response?.settings.bannerRighttPersonEvent || '');
      }
    } catch (error) {
      toast.error("An error occurred while updating the profile.");
    }
  };

  useEffect(() => {
    getDetails();
    getModelSettings();
  }, []);

  const handleHeaderFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setHeaderlogopreview(URL.createObjectURL(file));
      handleHeaderLogoUpload(file);
    }
  };

  const handleHeaderLogoUpload = async (file: File) => {
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
    }
  };

  const handleFooterFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFooterlogopreview(URL.createObjectURL(file));
      handleFooterLogoUpload(file);
    }
  };

  const handleFooterLogoUpload = async (file: File) => {
    if (!file) {
      alert("Please select an image file first.");
      return;
    }
    const formData = new FormData();
    formData.append("footerLogo", file);
    try {
      const response = await updateFooterLogo(formData, id);
      if(response?.status === 200){
        setFooterlogopreview(response?.settings.footerLogo);
        toast.success("Footer logo updated successfully");
      }
    } catch (error) {
      toast.error("An error occurred while updating the footer logo.");
    }
  };

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



  const handleBannerLeftUpload = async (file: File) => {
    if (!file) {
      toast.error("Please select an image file first.");
      return;
    }
    const formData = new FormData();
    formData.append("bannerLeftPersonImage", file);
    try {
      const response = await updateBannerLogo(formData, id);
      if(response?.status === 200){
        setBannerLeftImagepreview(response?.settings.bannerLeftPersonImage);
        toast.success("Banner left image updated successfully");
      }
    } catch (error) {
      toast.error("An error occurred while updating the banner left imageo.");
    }
  };
  const handleBannerLeftFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBannerLeftImagepreview(URL.createObjectURL(file));
      handleBannerLeftUpload(file);
    }
  };

  const handleBannerRightFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBannerRightImagepreview(URL.createObjectURL(file));
      handleBannerRightUpload(file);
    }
  };

  const handleBannerRightUpload = async (file: File) => {
    if (!file) {
      toast.error("Please select an image file first.");
      return;
    }
    const formData = new FormData();
    formData.append("bannerRightPersonImage", file);
    
    try {
      const response = await updateBannerLogo(formData, id);
      if (response?.status === 200) {
        setBannerRightImagepreview(response?.settings.bannerRightPersonImage);
        toast.success("Banner right image updated successfully");
      }
    } catch (error) {
      toast.error("An error occurred while updating the banner right image.");
    }
  };
  
  

  // Drag-and-drop state and functions

  const getModelSettings = async () => {
    const response = await getFeaturedModels();
    if(response?.status==200)
    {
      const allItems:any=[];
      response?.fmData.forEach((user:object,index:number)=>{
        allItems[index] = { ...user, id: index };
      })     
      
      setItems(allItems);
    }
  }
  const [draggingItem, setDraggingItem] = useState<any>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: any) => {
    setDraggingItem(item);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetItem: any) => {
    e.preventDefault();
    if (!draggingItem) return;

    const updatedItems = [...items];
    const currentIndex = updatedItems.findIndex((i) => i.id === draggingItem.id);
    const targetIndex = updatedItems.findIndex((i) => i.id === targetItem.id);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const [removed] = updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, removed);
      setItems(updatedItems);
    }

    setDraggingItem(null);
  };

 const handleModelSettings = async () => {
  let updatable:any=[];
  items.map((item:any,index:number)=>{
    // updatable[index]={"userId":item.userId,"name": item.name,"image": item.image};

    const { id, ...itemwithOutId } = item; 
    updatable[index] = { ...itemwithOutId,'sequence':index };
  });

  const response = await updateFeaturedModels(updatable);
  
  if(response.status==200)
  {
    toast.success("Featured Models Updated successfully.");
    
  }
  // console.log(response,1565);
 }
 

  const handleSaveCommonSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pContentCost.trim()) {
      toast.error("Cost Cannot be empty.");
      return;
    }
    try {
      const bodyData = {
        privateContentCost: pContentCost
      }
      const response = await savesettings(bodyData, id);
      if (response?.status === 200) {
        toast.success("Settings saved successfully.");
      }
    } catch (error) {
      toast.error("An error occurred while saving the settings.");
    }
  };

  const handleHomeBannerSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerLeftPersonName.trim()) {
      toast.error("Left Person Name cannot be empty.");
      return;
    }
    if (!bannerLeftPersonEvent.trim()) {
      toast.error("Left Person Event Description cannot be empty.");
      return;
    }
    if (!bannerRightPersonName.trim()) {
      toast.error("Right Person Name cannot be empty.");
      return;
    }
    if (!bannerRighttPersonEvent.trim()) {
      toast.error("Left Person Name cannot be empty.");
      return;
    }
    try {
      const bodyData = {
        bannerLeftPersonName: bannerLeftPersonName,
        bannerLeftPersonEvent: bannerLeftPersonEvent,
        bannerRightPersonName: bannerRightPersonName,
        bannerRighttPersonEvent: bannerRighttPersonEvent
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
                      <Tab label="Featured Models" value="3" />
                      <Tab label="Default Price Setup" value="4" />
                      <Tab label="Home Banner Setup" value="5" />
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
                              <button className="btn upbtn">Upload Picture</button>
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
                              <button className="btn upbtn">Upload Picture</button>
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

                  <TabPanel value="3">
                    <div className="row customflex">
                      <div className="col-md-6 customflex-left">
                        <CustomTableModelSettings
                          limit={limit}
                          headData={["Featured","Profile (age, state)"]}
                          bodyData={data as IUsersRoleTable[]}
                          totalData={totalUser}
                          totalPage={totalPage}
                          dataCurrentPage={currentPage}
                          onClickCheckBox={handleCheckboxClick}
                          items={items}
                          setitems={setItems}
                        />
                      </div>
                      <div className="col-md-6 customflex-left">
                        <div className="sortable-list">
                          {items.map((item:any) => (
                            <div
                              key={item.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, item)}
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, item)}
                              className="sortable-item"
                              data-userid={item.userId}
                            >
                              
                              <div className="sortable-item-content ">
                                <div className='wrapholder'>
                              <div className='sortable-item-content-img'><img src={item.image || noImage} alt="Profile Image" className={classes.customimg}/></div>
                                <div className='sortable-item-content-title'>
                                  <h3>
                                    {item?.name.includes(",") 
                                      ? item?.name 
                                      : `${item?.name}, ${item?.age}, ${item?.state}`}
                                  </h3>
                                  </div>
                                </div>
                                <div className='dragbox'><RiDragMove2Line className="drag-icon" /></div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button type="button" className={`${classes.upbtn} ms-0`} onClick={handleModelSettings}>Save</button>

                      </div>
                    </div>
                  </TabPanel>


                  <TabPanel value="4">                    
                    <div className="footer-wrap">
                      <form onSubmit={handleSaveCommonSettings} className="upload-setting-logo">
                        <label>Private Content Cost (Default)</label>
                        <div className="formgrp">
                          <input
                            type="text"
                            placeholder="$10"
                            value={pContentCost}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d*$/.test(value)) {
                                setPContentCost(value);
                              }
                            }}
                          />
                        </div>
                        <button type="submit" className={classes.upbtn}>Save</button>
                      </form>
                    </div>
                  </TabPanel>

                  <TabPanel value="5"> 
                      <form onSubmit={handleHomeBannerSettings} className="upload-setting-logo">
                      <label>Left Person Image</label>
                        <div className="upload-logo-file">
                          <div className="uploadimage">
                            <div className="upload-logo">
                              <img src={bannerLeftImagepreview || Avatar} alt="Avatar" />
                            </div>
                            <div className="upbtn">
                              <input
                                className="choosefile"
                                type="file"
                                accept="image/*"
                                onChange={handleBannerLeftFileChange}
                              />
                              <button className="btn upbtn">Upload Picture</button>
                            </div>
                          </div>
                        </div>
                        <label>Name of Left Person</label>
                        <div className="formgrp">
                          <input
                            type="text"
                            placeholder="Molly Amy"
                            value={bannerLeftPersonName}
                            onChange={(e) => setBannerLeftPersonName(e.target.value)}
                          />
                        </div>
                        <label>Event Description of Left Person</label>
                        <div className="formgrp">
                          <textarea
                            placeholder="Someone please take ot me disneyland and buy me all the princess outfits for Lorem Ipsum is simply dummy."
                            value={bannerLeftPersonEvent}
                            onChange={(e) => setBannerLeftPersonEvent(e.target.value)}
                          />
                        </div>
                      <label>Right Person Image</label>
                        <div className="upload-logo-file">
                          <div className="uploadimage">
                            <div className="upload-logo">
                              <img src={bannerRightImagepreview || Avatar} alt="Avatar" />
                            </div>
                            <div className="upbtn">
                              <input
                                className="choosefile"
                                type="file"
                                accept="image/*"
                                onChange={handleBannerRightFileChange}
                              />
                              <button className="btn upbtn">Upload Picture</button>
                            </div>
                          </div>
                        </div>
                        <label>Name of Right Person</label>
                        <div className="formgrp">
                          <input
                            type="text"
                            placeholder="Michael Williams"
                            value={bannerRightPersonName}
                            onChange={(e) => setBannerRightPersonName(e.target.value)}
                          />
                        </div>
                        
                        <label>Event Description of Right Person</label>
                        <div className="formgrp">
                          <textarea
                            placeholder="Someone please take ot me disneyland and buy me all the princess outfits for Lorem Ipsum is simply dummy."
                            value={bannerRighttPersonEvent}
                            onChange={(e) => setBannerRighttPersonEvent(e.target.value)}
                          />
                        </div>
                        <button type="submit" className={classes.upbtn}>Save</button>
                      </form>
                  </TabPanel>
                </TabContext>
              </Box>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Settings;
