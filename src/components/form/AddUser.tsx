import { useEffect, useState } from "react";
import Input from "../UI/input/Input";
import form from "./formcus.module.scss";
import { useAddUser } from "./useAddUser";
import LoadingSpinner from "../UI/loadingSpinner/LoadingSpinner"; // Import the spinner
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { userDetails } from "../../service/apis/user.api";

const AddUser = () => {
  const params = useParams();
  const { id } = params;
  const { addUserFormik, loading } = useAddUser(id);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const userData = await userDetails(id);
          if (userData) {
            addUserFormik.setValues({
              fullName: userData.data?.fullName || "",
              email: userData.data?.email || "",
              age: userData.data?.about?.age || "",
              location: userData.data?.about?.location || "",
              gender: userData.data?.about?.gender
              ? { value: userData.data?.about?.gender, label: userData.data?.about?.gender }: null,
              interestedIn: userData.data?.about?.interestedIn 
              ? { value: userData.data?.about?.interestedIn, label: userData.data?.about?.interestedIn }: null,
              password: "",
              role: userData.data?.role
                ? { value: userData.data?.role, label: userData.data?.role }: null,
              });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchData();
    }
  }, [id]);

  return (
    <div className={form.myprofilewrapper }>
      <div className='profile-card'>
        <div className={form.profile_flex}>
        <h2>{id ? "Update User" : "Add User"}</h2>
          <Link to='/admin/users'>
            <button className={form.back_btn}>Back</button>
          </Link>
        </div>

        <form onSubmit={addUserFormik.handleSubmit} autoComplete='off' className="formadduser">
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
                  onChange={addUserFormik.handleChange}
                  value={addUserFormik.values.fullName}
                />
                {addUserFormik.touched.fullName &&
                  addUserFormik.errors.fullName && (
                    <div className='error'>
                      {addUserFormik.errors.fullName}
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
                  onChange={addUserFormik.handleChange}
                  value={addUserFormik.values.email}
                />
                {addUserFormik.touched.email && addUserFormik.errors.email && (
                  <div className='error'>{addUserFormik.errors.email}</div>
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
                  onChange={addUserFormik.handleChange}
                  value={addUserFormik.values.age}
                />
                {addUserFormik.touched.age && addUserFormik.errors.age && (
                  <div className='error'>{addUserFormik.errors.age}</div>
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
                  onChange={addUserFormik.handleChange}
                  value={addUserFormik.values.location}
                />
                {addUserFormik.touched.location &&
                  addUserFormik.errors.location && (
                    <div className='error'>{addUserFormik.errors.location}</div>
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
                  value={addUserFormik.values.gender}
                  onChange={(option) => addUserFormik.setFieldValue("gender", option)}
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
                {addUserFormik.touched.gender && addUserFormik.errors.gender && (
                  <div className='error'>{addUserFormik.errors.gender}</div>
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
                  value={addUserFormik.values.interestedIn}
                  onChange={(option) => addUserFormik.setFieldValue("interestedIn", option)}
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
                {addUserFormik.touched.interestedIn &&
                  addUserFormik.errors.interestedIn && (
                    <div className='error'>
                      {addUserFormik.errors.interestedIn}
                    </div>
                  )}
              </div>
            </div>

              <div className={form.profileformcol}>
              <div className='formgrp'>
                <label htmlFor='Name'>
                  Password <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  type={isPasswordVisible ? "text" : "password"}
                  id='password'
                  placeholder={"Enter your password"}
                  name='password'
                  onChange={addUserFormik.handleChange}
                  value={addUserFormik.values.password}
                  autoComplete='new-password'
                  rightIcon={
                    <FontAwesomeIcon
                      icon={isPasswordVisible ? faEyeSlash : faEye}
                      onClick={togglePasswordVisibility}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        bottom: "14px",
                        transform: "translateY(-50%)",
                        right: "15px",
                      }}
                    />
                  }
                />
                {addUserFormik.touched.password &&
                  addUserFormik.errors.password && (
                    <div className='error'>{addUserFormik.errors.password}</div>
                  )}
              </div>
            </div>

            <div className={form.profileformcol}>
              <div className='formgrp'>
                <label htmlFor='Name'>
                  Select Role <span style={{ color: "red" }}>*</span>
                </label>
                <Select className="custom-select"
                  placeholder='Select Role'
                  options={[
                    { value: "admin", label: "Admin" },
                    { value: "seeker", label: "Seeker" },
                    { value: "model", label: "Model" },
                  ]}
                  name="role"
                  value={addUserFormik.values.role}
                  onChange={(option) => addUserFormik.setFieldValue("role", option)}
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
                {addUserFormik.touched.role && addUserFormik.errors.role && (
                  <div className='error'>{addUserFormik.errors.role}</div>
                )}
              </div>
            </div>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <button className={form.upbtn}>Save</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddUser;
