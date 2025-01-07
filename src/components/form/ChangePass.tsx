import { useState } from "react";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import { useTranslation } from "react-i18next";
import form from "./formcus.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import  { useChangePass } from "./useChangePass";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ChangePass() {
  const { lang } = useSelector((state: RootState) => state.langSlice);
  const { t } = useTranslation();

  const { changePasswordFormik } = useChangePass();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCPasswordVisible, setIsCPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const toggleCPasswordVisibility = () => {
    setIsCPasswordVisible((prev) => !prev);
  };

  return (
    <div className={form.myprofilewrapper }>
      <div className='profile-card'>
        <form onSubmit={changePasswordFormik.handleSubmit}>
        <label htmlFor='password_old'>
            Old Password <span style={{ color: "red" }}>*</span>
        </label>
        <Input
            type="text"
            id='password_old'
            placeholder={t("Enter your old password")}
            name='password_old'
            onChange={changePasswordFormik.handleChange}
            value={changePasswordFormik.values.password_old}
            errorMsg={changePasswordFormik.errors.password_old}
          />
        <label htmlFor='password_new'>
            New Password <span style={{ color: "red" }}>*</span>
        </label>
        <Input
            type={isPasswordVisible ? "text" : "password"}
            id='password_new'
            placeholder={t("Enter your new password")}
            name='password_new'
            onChange={changePasswordFormik.handleChange}
            value={changePasswordFormik.values.password_new}
            errorMsg={changePasswordFormik.errors.password_new}
            rightIcon={
              <FontAwesomeIcon
                icon={isPasswordVisible ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              />
            }
          />
        <label htmlFor='password_confirm'>
            Confirm Password <span style={{ color: "red" }}>*</span>
        </label>
          <Input
            type={isCPasswordVisible ? "text" : "password"}
            id='cpassword'
            placeholder={t("Enter your confirm password")}
            name='cpassword'
            onChange={changePasswordFormik.handleChange}
            value={changePasswordFormik.values.cpassword}
            errorMsg={changePasswordFormik.errors.cpassword}
            rightIcon={
              <FontAwesomeIcon
                icon={isCPasswordVisible ? faEyeSlash : faEye}
                onClick={toggleCPasswordVisibility}
                style={{ cursor: "pointer" }}
              />
            }
          />
          <Button type='submit'>{t("Save")}</Button>
        </form>
      </div>
    </div>
  );
}

export default ChangePass;

