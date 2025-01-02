import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import EditCustomer from "../../components/edit/editCustomer/EditCustomer";
import { IUsersRoleTable } from "../../interfaces/Itable";
import classes from "../../../src/components/edit/editCustomer/EditCustomer.module.scss";
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import { userDetails, updateActiveStatus, updateVerificationStatus } from "../../service/apis/user.api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function CustomerEdit() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [customerData, setCustomerData] = useState<IUsersRoleTable | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [actionVLoading, setActionVLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<null | "block" | "unblock">(null);
  const [openvDialog, setOpenvDialog] = useState<null | "verified" | "unverified">(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await userDetails(id);
        setCustomerData(response?.data || null);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCustomerData();
    }
  }, [id,setCustomerData]);

  const handleAction = async (action: "block" | "unblock") => {
    setActionLoading(true);
    try {
      const isActive = action === "unblock"; // true for unblock, false for block
      await updateActiveStatus(id, { isActive });
      setCustomerData((prev) => prev && { ...prev, isActive });
    } catch (err) {
      setError(`Failed to ${action} user`);
    } finally {
      setActionLoading(false);
      setOpenDialog(null);
    }
  };

  const handleVerificationAction = async (action: "verified" | "unverified") => {
    setActionVLoading(true);
    try {
      const isVerfied = action === "verified"; // true for verified, false for unverified
      await updateVerificationStatus(id, { isVerfied });
      setCustomerData((prev) => prev && { ...prev, isVerfied });
    } catch (err) {
      setError(`Failed to ${action} user`);
    } finally {
      setActionVLoading(false);
      setOpenvDialog(null);
    }
  };

  let customerEdit;
  if (loading) {
    customerEdit = <LoadingSpinner />;
  } else if (customerData) {
    customerEdit = <EditCustomer customer={customerData} />;
  }

  return (
    <section>
      <div className={classes.com_header_flex}>
        <h2 className="title">{t("User Details")}</h2>
        <div className="btn-wrap-users">
          <Link to="/admin/users">
            <button className={classes.back_btn}>Back</button>
          </Link>
          {customerData?.isActive ? (
            <button
              className={classes.block_btn}
              onClick={() => setOpenDialog("block")}
              disabled={actionLoading}
            >
              Block User
            </button>
          ) : (
            <button
              className={classes.block_btn}
              onClick={() => setOpenDialog("unblock")}
              disabled={actionLoading}
            >
              Unblock User
            </button>
          )}
          {customerData?.isVerfied ? (
            <button
              className={classes.verify_btn}
              onClick={() => setOpenvDialog("unverified")}
              disabled={actionVLoading}
            >
              Unverify User
            </button>
          ) : (
            <button
              className={classes.verify_btn}
              onClick={() => setOpenvDialog("verified")}
              disabled={actionVLoading}
            >
              Verify User
            </button>
          )}
        </div>
      </div>
      {customerEdit}

      {/* Block/Unblock Dialog */}
      <Dialog
        open={!!openDialog}
        onClose={() => setOpenDialog(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          {openDialog === "block" ? t("Block User") : t("Unblock User")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {openDialog === "block"
              ? t("Are you sure you want to block this user?")
              : t("Are you sure you want to unblock this user?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(null)}>{t("Cancel")}</Button>
          <Button
            onClick={() => handleAction(openDialog as "block" | "unblock")}
            autoFocus
          >
            {t("Confirm")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Verify/Unverify Dialog */}
      <Dialog
        open={!!openvDialog}
        onClose={() => setOpenvDialog(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          {openvDialog === "verified" ? t("Verify User") : t("Unverify User")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {openvDialog === "verified"
              ? t("Are you sure you want to verify this user?")
              : t("Are you sure you want to unverify this user?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenvDialog(null)}>{t("Cancel")}</Button>
          <Button
            onClick={() =>
              handleVerificationAction(openvDialog as "verified" | "unverified")
            }
            autoFocus
          >
            {t("Confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}

export default CustomerEdit;
