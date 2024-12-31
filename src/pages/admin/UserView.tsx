import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import EditCustomer from "../../components/edit/editCustomer/EditCustomer";
import { IUsersRoleTable } from "../../interfaces/Itable";
import classes from "../../../src/components/edit/editCustomer/EditCustomer.module.scss";
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import { userDetails } from "../../service/apis/user.api";
import { Link } from "react-router-dom";

function CustomerEdit() {
  const { t } = useTranslation();
  const params = useParams();
  const { id } = params;
  const [customerData, setCustomerData] = useState<IUsersRoleTable | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
  }, [id]);

  let customerEdit;
  if (loading) {
    customerEdit = <LoadingSpinner />;
  } else if (customerData) {
    customerEdit = <EditCustomer customer={customerData} />;
  }

  return (
    <section>
      <div className={classes.com_header_flex}>
        <h2 className='title'>{t("User Details")}</h2>
        <div className="btn-wrap-users">
        <Link to='/admin/users'>
          <button className={classes.back_btn}>Back</button>
        </Link>
        <button className={classes.block_btn}>Block User</button>
        <button className={classes.verify_btn}>Verify User</button>
        </div>
      </div>
      {customerEdit}
    </section>
  );
}

export default CustomerEdit;
