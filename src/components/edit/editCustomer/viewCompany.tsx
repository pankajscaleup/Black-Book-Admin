import React from "react";
import Card from "../../UI/card/Card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classes from "./EditCustomer.module.scss";
import { IcustomersTable, IUsersRoleTable } from "../../../interfaces/Itable";
import { Icon } from "@iconify/react";

const EditCustomer: React.FC<{ customer?: IUsersRoleTable }> = (props) => {
  const { t } = useTranslation();

  return (
    <div className={classes.user_edit}>
      <div className={classes.user_acc}>
        <div className={classes.edit__container}>
          <div className={classes.edit__left}>
            <Card>
              <div className={classes.account}>
                <div
                  className={classes.account__info}
                  style={{ width: "100%" }}
                >
                  <p>{t("Account Details")}</p>
                  <div className={classes.account__info__userName}>
                    <Icon icon='majesticons:user-line' width='24' />
                    <div className={classes.account__border}>
                      {props.customer?.companyDetails?.name}{" "}
                    </div>
                  </div>
                  {props.customer?.phoneNumber && (
                    <div
                      className={classes.account__contact__phone}
                      style={{ width: "100%" }}
                    >
                      <Icon icon='clarity:mobile-phone-solid' width='26' />
                      <div>{props.customer.phoneNumber}</div>
                    </div>
                  )}

                  {props.customer?.companyDetails.website && (
                    <div
                      className={classes.account__contact__phone}
                      style={{ width: "100%" }}
                    >
                      <Icon icon='clarity:world-solid' width='26' />
                      <div>{props.customer?.companyDetails.website}</div>
                    </div>
                  )}

                  <div
                    className={classes.account__contact__email}
                    style={{ width: "100%" }}
                  >
                    <Icon icon='fontisto:email' width='24' />
                    <div>{props.customer?.companyDetails?.email}</div>
                  </div>
                  <div
                    className={classes.account__contact__company}
                    style={{ display: "flex" }}
                  >
                    <Icon icon='clarity:home-line' width='26' />

                    <div style={{ marginBottom: "0px" }}>
                      {props.customer?.companyDetails?.address?.country},
                      {props.customer?.companyDetails?.address?.state},{" "}
                      {props.customer?.companyDetails?.address?.city},
                      {props.customer?.companyDetails?.address?.zipCode}
                    </div>
                  </div>
                  {props.customer?.companyDetails?.description && (
                    <div
                      className={classes.account__info}
                      style={{ width: "100%" }}
                    >
                      <p>{t("Description")}</p>
                      <div className={classes.account__contact__company}>
                        <Icon icon='clarity:company-solid' width='26' />

                        <div style={{ marginLeft: "0px", marginRight: "0px" }}>
                          {props.customer?.companyDetails?.description}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {props.customer?.companyDetails?.companyAdmin?.map((admin) => (
                  <div
                    className={classes.account__info}
                    key={admin.id}
                    style={{ width: "100%" }}
                  >
                    <p>{t("Admin Company Login")}</p>
                    <div
                      className={classes.account__contact__company}
                      style={{ display: "block" }}
                    >
                      <Icon icon='clarity:company-solid' width='26' />

                      <div style={{ marginLeft: "0px", marginRight: "0px" }}>
                        <Icon icon='majesticons:user-line' width='24' />
                        {admin.firstName} {admin.lastName}
                      </div>
                      <div style={{ marginLeft: "0px", marginRight: "1px" }}>
                        <span>
                          <Icon icon='fontisto:email' width='24' />
                        </span>
                        {admin.email}{" "}
                      </div>
                      <div style={{ marginLeft: "0px", marginRight: "0px" }}>
                        <span></span>
                        {admin?.bio}{" "}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
