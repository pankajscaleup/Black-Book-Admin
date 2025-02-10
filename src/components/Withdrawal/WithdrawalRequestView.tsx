import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { IWithdrawalTable } from "../../interfaces/Itable";
import classes from "../../components/edit/editCustomer/EditCustomer.module.scss";
import LoadingSpinner from "../UI/loadingSpinner/LoadingSpinner";
import {ViewwithdrawalsDetails,WithdrawalStatusUpdate} from "../../service/apis/transactions.api";
import { Icon } from "@iconify/react";
import Box from '@mui/material/Box';
import { images } from "../../constants";
import Card from "../UI/card/Card";
import Swal from 'sweetalert2';

function WithdrawRequestView() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [DetailsData, setDetailsData] = useState<IWithdrawalTable | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const capitalizeFirstLetter = (string: any) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const fetchCustomerData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ViewwithdrawalsDetails(id);
      setDetailsData(response?.withdrawal || null);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchCustomerData();
    }
  }, [id, setDetailsData]);

  const handleStatusChange = async (_id:any,newStatus:any) => {
    // SweetAlert confirmation
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `You want to ${newStatus.toLowerCase()} this request?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, proceed',
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      try {
        const bodyData = {
          status: newStatus,
        };
        const response = await WithdrawalStatusUpdate(_id,bodyData);
        if (response.status===200) {
          Swal.fire(
            'Success!',
            `The status has been changed to ${newStatus}.`,
            'success'
          );
          await fetchCustomerData();
        } else {
          Swal.fire(
            'Error!',
            'Failed to update the status. Please try again.',
            'error'
          );
        }
      } catch (error) {
        Swal.fire(
          'Error!',
          'There was an error with the request. Please try again later.',
          'error'
        );
      }
    }
  };

  const isApprovedDisabled =DetailsData?.status === 'Approved';
  const isRejectedDisabled = DetailsData?.status === 'Rejected';

  return (
    <section>
      {loading && <LoadingSpinner />}
      {!loading && (
        <>
      <div className={classes.com_header_flex}>
        <h2 className='title'>{t("User Withdrawals Details")}</h2>
        <div className='btn-wrap-users'>
          <Link to='/admin/withdrawals'>
            <button className={classes.back_btn}>Back</button>
          </Link>
          <button className={classes.block_btn}disabled={isApprovedDisabled}
          style={{ cursor: isApprovedDisabled ? 'not-allowed' : 'pointer' }}
             onClick={() => handleStatusChange(DetailsData?._id,'Approved')}>Approve</button>
          <button className={classes.block_btn}disabled={isRejectedDisabled}
          style={{ cursor: isRejectedDisabled ? 'not-allowed' : 'pointer' }}
             onClick={() => handleStatusChange(DetailsData?._id,'Rejected')}>Reject</button>
          {/* <button className={classes.verify_btn}onClick={handleDelete}>Delete</button> */}
        </div>
      </div>

      <div className={classes.user_acc}>
      <div className={classes.edit__container}>
        <div className={classes.edit__left}>
          <Card>
            <div className={classes.account}>
              <div className={classes.img_wrapper}>
              <img className={classes.avatar}
                  src={DetailsData?.userId?.profileimageurl || images.noimage}
                  alt="avatar"
                />
              </div>
              <div className={classes.account__info}>
                <h4>Account Details</h4>
                <div className={classes.account__info__userName}>
                  <Icon icon='majesticons:user-line' width='24' />
                  <div>
                    {DetailsData?.userId?.fullName}
                  </div>
                </div>
                <div className={classes.account__info__userName}>
                  <Icon icon='mdi:account-group' width='24' />
                  <div>
                    {DetailsData?.userId?.role ? capitalizeFirstLetter(DetailsData?.userId?.role):''}
                  </div>
                </div>
                <div className={classes.account__info__userName}>
                <Icon
                    icon={DetailsData?.userId?.isVerfied ? 'mdi:check-circle-outline' : 'mdi:close-circle-outline'}
                    width="24"
                    color={DetailsData?.userId?.isVerfied ? 'green' : 'red'}
                  />
                  <div>
                  <span>{DetailsData?.userId?.isVerfied ? 'Verified' : 'Not Verified'}</span>
                  </div>
                </div>
              </div>
              <div className={classes.account__info}> 
                <h4>Contacts</h4>
                <div className={classes.account__contact__email}>
                  <Icon icon='fontisto:email' width='24' />
                  <div>{DetailsData?.userId?.email}</div>
                </div>

                <div style={{ marginLeft: "0px" }}>
                  {DetailsData?.userId?.about?.fullAddress && (
                    <Icon
                      icon='clarity:home-line'
                      width='26'
                      style={{ marginRight: "10px" }}
                    />
                  )}
                  {DetailsData?.userId?.about?.fullAddress && (
                    <span>{DetailsData?.userId.about.fullAddress}</span>
                  )}
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className={classes.account}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
            <div className="verification-wrap">
                    <div className="details-wrapper">
                      <h4>Bank Account Details:</h4>
                      <div className="dtls">
                      <p><strong>Withdrawals Request Amount :</strong>  {DetailsData?.amount} </p>
                      <p><strong>Account Holder Name :</strong>  {DetailsData?.bankId?.accountHolderName} </p>
                        <p><strong>Account Number :</strong> {DetailsData?.bankId?.accountNumber} </p>
                        <p><strong>Account Holder Address :</strong> {DetailsData?.bankId?.accountHolderAddress} </p>
                        <p><strong>Bank Name :</strong> {DetailsData?.bankId?.bankName} </p>
                        <p><strong>Bank Address :</strong> {DetailsData?.bankId?.bankAddress} </p>
                        <p><strong>Bank City :</strong> {DetailsData?.bankId?.bankCity} </p>
                        <p><strong>Bank State :</strong> {DetailsData?.bankId?.bankState} </p>
                        <p><strong>Routing Number :</strong> {DetailsData?.bankId?.routingNumber} </p>
                      </div>
                      <></>
                    </div>
                  </div>
            </Box>
            </div>
          </Card>
        </div>
      </div>
    </div>
    </>
      )}
    </section>
  );
}

export default WithdrawRequestView;
