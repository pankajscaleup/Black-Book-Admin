import { useEffect, useState } from "react";
import Input from "../input/Input";
import form from "./formcus.module.scss";
import { useSelector } from 'react-redux';
import { RootState } from "../../../store/store";
import { useProfileUpdate } from "./useProfileUpdate";
import Select from "react-select";
import Avatar from "../../../../src/assets/images/avatar.jpg";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/auth.store";
import toast from "react-hot-toast";
import { updateProfileImage } from "../../../service/apis/user.api";

const FormCus = () => {
  const { addProfileFormik } = useProfileUpdate();
  const user = useSelector((state: RootState) => state.authSlice.user);
  const [preview, setPreview] = useState(Avatar);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      addProfileFormik.setValues({
        fullName: user.fullName || "",
        email: user.email || "",
        age: user.about?.age || "",
        location: user.about?.location || "",
        gender: user.about?.gender
          ? { value: user.about.gender, label: user.about.gender }
          : null,
        interestedIn: user.about?.interestedIn
          ? { value: user.about.interestedIn, label: user.about.interestedIn }
          : null,
      });
      setPreview(user.profileimageurl);
    }
  }, [user]);

  const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Update preview
      handleUpload(file);
    }
  };

  const handleUpload = async (file:any) => {
    console.log(file);
    if (!file) {
      alert("Please select an image file first.");
      return;
    }
    const formData = new FormData();
    formData.append("profileimageurl", file);
    try {
      const response = await updateProfileImage(formData);
      console.log(response);
      toast.success("Profile image updated successfully");
      dispatch(setUser(response.userData));
    } catch (error) {
      toast.error("An error occurred while updating the profile.");
    } finally {
    }
  }

  return (
    <div id="editprofile" className={form.myprofilewrapper}>
      <div className='profile-card profileform'>

        <div className="profile-picture-upload">
          <div className="uploadimage">
            <div className="upimg">
              <img src={preview} alt="Avatar" />
            </div>
            <div className="upbtn">
              <input
                className="choosefile"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <button className="btn upbtn">
                Upload Picture
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={addProfileFormik.handleSubmit} autoComplete='off'>
          <div className={form.profileform}>
            <div className={form.profileformcol}>
              <div className='formgrp'>
                <label htmlFor='Name'>
                  Full Name <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                classes="passwordlabel"
                  type={"text"}
                  id='fullName'
                  placeholder={"Enter your full name"}
                  name='fullName'
                  onChange={addProfileFormik.handleChange}
                  value={addProfileFormik.values.fullName}
                />
                {addProfileFormik.touched.fullName &&
                  addProfileFormik.errors.fullName && (
                    <div className='error'>
                      {addProfileFormik.errors.fullName}
                    </div>
                  )}
              </div>
            </div>

            <div className={form.profileformcol}>
              <div className='formgrp'>
                <label htmlFor='Name'>
                  Email <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                classes="passwordlabel"
                  type={"text"}
                  id='email'
                  placeholder={"Enter your email address"}
                  name='email'
                  onChange={addProfileFormik.handleChange}
                  value={addProfileFormik.values.email}
                />
                {addProfileFormik.touched.email && addProfileFormik.errors.email && (
                  <div className='error'>{addProfileFormik.errors.email}</div>
                )}
              </div>
            </div>

            <div className={form.profileformcol}>
              <div className='formgrp'>
                <label htmlFor='Name'>
                  Age <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                classes="passwordlabel"
                  type={"text"}
                  id='age'
                  placeholder={"Enter your age"}
                  name='age'
                  onChange={addProfileFormik.handleChange}
                  value={addProfileFormik.values.age}
                />
                {addProfileFormik.touched.age && addProfileFormik.errors.age && (
                  <div className='error'>{addProfileFormik.errors.age}</div>
                )}
              </div>
            </div>

            <div className={form.profileformcol}>
              <div className='formgrp'>
                <label htmlFor='Name'>
                  Location <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                classes="passwordlabel"
                  type={"text"}
                  id='location'
                  placeholder={"Enter your location"}
                  name='location'
                  onChange={addProfileFormik.handleChange}
                  value={addProfileFormik.values.location}
                />
                {addProfileFormik.touched.location &&
                  addProfileFormik.errors.location && (
                    <div className='error'>{addProfileFormik.errors.location}</div>
                  )}
              </div>
            </div>

            <div className={form.profileformcol}>
              <div className='formgrp'>
                <label htmlFor='Name'>
                  Gender <span style={{ color: "red" }}>*</span>
                </label>                
                <Select className="custom-select"
                  placeholder='Select Gender'
                  options={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "All", label: "All" },
                  ]}
                  name="gender"
                  value={addProfileFormik.values.gender}
                  onChange={(option) => addProfileFormik.setFieldValue("gender", option)}
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
                {addProfileFormik.touched.gender && addProfileFormik.errors.gender && (
                  <div className='error'>{addProfileFormik.errors.gender}</div>
                )}
              </div>
            </div>

            <div className={form.profileformcol}>
              <div className='formgrp'>
                <label htmlFor='Name'>
                  Interested In <span style={{ color: "red" }}>*</span>
                </label>
                <Select className="custom-select"
                  placeholder='Interested In'
                  options={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "All", label: "All" },
                  ]}
                  name="interestedIn"
                  value={addProfileFormik.values.interestedIn}
                  onChange={(option) => addProfileFormik.setFieldValue("interestedIn", option)}
                  styles={{
                    control: (base) => ({
                      ...base,
                      boxShadow: "none",
                      border: "1px solid #c7c7c7",
                      height: "58px",
                      borderRadius: "100px",
                      padding: "10px 12px",
                      color: "#000000" ,
                    }),
                  }}
                />
                {addProfileFormik.touched.interestedIn &&
                  addProfileFormik.errors.interestedIn && (
                    <div className='error'>
                      {addProfileFormik.errors.interestedIn}
                    </div>
                  )}
              </div>
            </div>
          </div>
          <button className={form.upbtn}>Save</button>
        </form>
      </div>
    </div>
  );
};

export default FormCus;
