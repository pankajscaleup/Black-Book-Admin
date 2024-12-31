import { useEffect } from "react";
import Input from "../input/Input";
import form from "./formcus.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from "../../../store/store";
import { useProfileUpdate } from "./useProfileUpdate";
import Select from "react-select";

const FormCus = () => {
      const { addProfileFormik } = useProfileUpdate();
    const user = useSelector((state: RootState) => state.authSlice.user);
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
      }
    }, [user]);

  return (
    <div className={form.myprofilewrapper}>
      <div className='profile-card profileform'>
        <form onSubmit={addProfileFormik.handleSubmit} autoComplete='off'>
          <div className={form.profileform}>
            <div className={form.profileformcol}>
              <div className='formgrp'>
                <label htmlFor='Name'>
                  Full Name <span style={{ color: "red" }}>*</span>
                </label>
                <Input
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
                <Select
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
                <Select
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
