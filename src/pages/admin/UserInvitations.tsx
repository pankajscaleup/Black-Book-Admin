import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import Invitations from "../../components/edit/editCustomer/Invitations";
import { IUsersEventTable } from "../../interfaces/Itable";
import classes from "../../../src/components/edit/editCustomer/EditCustomer.module.scss";
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import { userInvitationsApi } from "../../service/apis/user.api";
import { adminUserEventsHeader } from "../../constants/tables";
import toast from "react-hot-toast";

function CustomerInvitations() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [error,setError] = useState<any>('');
  const limit = 10;
  const [data, setData] = useState<IUsersEventTable[]>([]);
  const [totalInvites, setTotalInvites] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchInvitations = async () => {
      setLoading(true);
      setError(null);
      const bodyData={
        id:id,
        limit:limit,
        currentPage:currentPage
      }
      try {
        const response = await userInvitationsApi(bodyData);
        if(response.status===200)
        {
          setData(response?.invitations?.invitations || null);
          setTotalPage(response?.invitations?.totalPages)
          setCurrentPage(response?.invitations?.page)
          setTotalInvites(response?.invitations?.totalResults)          
        }
        else
        {
          setData([])
          setTotalPage(0)
          setCurrentPage(0)
        }
      } catch (err) {
        setError("Failed to fetch data");
        toast.error("Failed to fetch data");

      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInvitations();
    }
  }, [id,setData]);


  let userInvitations;
  if (loading) {
    userInvitations = <LoadingSpinner />;
  } else if (data) {
    userInvitations = <Invitations limit={limit}
    headData={adminUserEventsHeader}
    bodyData={data as IUsersEventTable[]}
    totalData={totalInvites}
    totalPage={totalPage}
    currentUser={id}
    dataCurrentPage={currentPage} />;
  }

  return (
    <section>
      <div className={classes.com_header_flex}>
        <h2 className="title">{t("User Events")}</h2>
        <div className="btn-wrap-users">
          <Link to="/admin/users">
            <button className={classes.back_btn}>Back</button>
          </Link>
        </div>
      </div>
      {userInvitations}     
    </section>
  );
}

export default CustomerInvitations;
