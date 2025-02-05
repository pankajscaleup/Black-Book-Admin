import { useEffect, useState } from "react";
import TransactionsManagement from "../../components/transactions/TransactionsManagement";
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import { ITransactionTable } from "../../interfaces/Itable";
import { adminTransactionHeader } from "../../constants/tables";
import { transactionsListApi } from "../../service/apis/transactions.api";
import withRole from "../../pages/withRole";

function TransactionsView() {

  const [data, setData] = useState<ITransactionTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalUser, setTotalUser] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const limit = 10;

  const getTransactions = async () => {
    setLoading(true);

    try {
      const bodyData = {
        currentPage: 1,
        limit: limit,
      };
      const response = await transactionsListApi(bodyData);
      if (response?.status === 200) {
        setData(response?.transactions?.transactions);
        setTotalUser(response?.transactions?.totalResults);
        setTotalPage(response?.transactions?.totalPages);
        setCurrentPage(response?.transactions?.page);
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <section className='users-pages'>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <TransactionsManagement
          limit={limit}
          headData={adminTransactionHeader}
          bodyData={data as ITransactionTable[]}
          totalData={totalUser}
          totalPage={totalPage}
          dataCurrentPage={currentPage}
        />
      )}
    </section>
  );
}
export default withRole(TransactionsView, ["admin"]);
