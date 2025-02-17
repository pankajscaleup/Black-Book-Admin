import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {ICustomstable, complex, IWithdrawalTable,} from "../../interfaces/Itable";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { faCheck, faTimes,faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import del from "../../assets/images/ic_outline-delete.png";
import delt from "../../assets/images/delete.png";
import dataTable from "../../components/tables/customTable/datatable.module.scss";
import {WithdrawalListApi,WithdrawalStatusUpdate,deletewithdrawals} from "../../service/apis/transactions.api";

import LoadingSpinner from "../UI/loadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const WithdrawalViewManagement: React.FC<ICustomstable> = ({
  bodyData,
  headData,
  totalData,
  statuss
}) => {
    const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrderData, setSortOrderData] = useState<complex[]>(bodyData);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [totalResult, setTotalResult] = useState(totalData);
  const [loading, setLoading] = useState(false);
  const [addClass, setAddClass] = useState<string>("");
  const [selectedWithdrawId, setSelectedWithdrawId] = useState<string | null>(null);
  const rowsPerPage = 10;

  const handleClickOpen = (withdrawId: string) => {
    setSelectedWithdrawId(withdrawId);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setSearchTerm(searchQuery);

    try {
      setLoading(true);
      setAddClass("add_blur");
      const bodyData = {
        currentPage: currentPage,
        limit: 10,
        search: searchQuery,
      };
      setLoading(true);
      const response = await WithdrawalListApi(bodyData);
      if (response?.status === 200) {
        setLoading(false);
        setTotalResult(response?.withdrawals?.totalResults);
        setSortOrderData(response?.withdrawals?.withdrawals);
        setAddClass("");
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  const clearSearch = async () => {
    setSearchTerm("");
    try {
      setAddClass("add_blur");
      const bodyData = {
        page: 1,
        currentPage: 1,
        search: "",
      };
      setLoading(true);
      const response = await WithdrawalListApi(bodyData);
      if (response?.status === 200) {
        setSortOrderData(response?.withdrawals?.withdrawals);
        setLoading(false);
        setAddClass("");
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
    }
  };

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    setLoading(true);

    try {
      setAddClass("add_blur");
      const bodyData = {
        currentPage: page,
        limit: rowsPerPage,
        search: searchTerm,
      };
      const response = await WithdrawalListApi(bodyData);
      if (response?.status === 200) {
        setSortOrderData(response?.withdrawals?.withdrawals);
        setLoading(false);
        setAddClass("");
      }
    } catch (err) {
      console.error("Failed to fetch page data", err);
    }
  };
  const ucwords = (str: string): string => {
    const exceptions = ["FirstName"];
    return str
      .split(" ")
      .map((word) => {
        if (exceptions.includes(word)) {
          return word;
        }
        return word.replace(/\b\w/g, (char: string) => char.toUpperCase());
      })
      .join(" ");
  };

  const isButtonDisabled = (status: string, action: "approve" | "reject") => {
    if (action === "approve") {
      return status === "Approved";
    }
    if (action === "reject") {
      return status === "Rejected";
    }
    return false;
  };

  const handleStatusUpdate = async (_id: string, status: string) => {
    try {
      const bodyData = {
        status: status,
      };
      const response = await WithdrawalStatusUpdate(_id, bodyData);
      if (response.status === 200) {
        if (status === "Approved") {
          toast.success("Withdrawal request approved successfully!");
        } else if (status === "Rejected") {
          toast.success("Withdrawal request rejected successfully!");
        }
        // Refresh data
        const oppositeStatus = statuss === "Pending" ? "Pending" : status === "Approved" ? "Rejected" : "Approved";
        const bodyData = {
          currentPage: 1,
          limit: rowsPerPage,
          status: oppositeStatus,
          search : "",
        };
        const dataResponse = await WithdrawalListApi(bodyData);
        if (dataResponse?.status === 200) {
          setSortOrderData(dataResponse?.withdrawals?.withdrawals || []);
          setTotalResult(dataResponse?.withdrawals?.totalResults || 0);
          setCurrentPage(dataResponse?.withdrawals?.page || 1);
        }
      }
    } catch (error) {
      toast.error(`Failed to update request to ${status}.`);
    }
  };
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deletewithdrawals(selectedWithdrawId);
      if (response?.status === 200) {
        toast.success(response.message);
        setOpen(false);
        // Refresh data
        const bodyData = {
        currentPage: 1,
        limit: rowsPerPage,
        search : "",
        };
        const refreshResponse = await WithdrawalListApi(bodyData);
        if (refreshResponse?.status === 200) {
          setSortOrderData(refreshResponse?.withdrawals?.withdrawals);
          setTotalResult(refreshResponse?.withdrawals?.totalResults);
        }
        setLoading(false);
      }
    } catch (err) {
      console.error("Failed to delete user", err);
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative" }} className='dsp'>
      {loading ? <LoadingSpinner /> : null}

      <div
        className={`${dataTable.datatablemainwrap} ${
          addClass ? dataTable[addClass] : ""
        } colorAction`}
      >
        <div
          className='searchwrap'
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "flex-start",
            position: "relative",
            marginTop: "20px",
          }}
        >
          <input
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              padding: "8px 12px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              maxWidth: "350px",
              height: "50px",
              width: "100%",
              marginLeft: "auto",
            }}
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                color: "#999",
              }}
            >
              &times;
            </button>
          )}
        </div>
        <div className='usertabledata'>
          <TableContainer className={dataTable.tbodymain} component={Paper}>
            <Table
              sx={{ minWidth: 1000 }}
              aria-label='simple table'
              style={{ borderCollapse: "separate", borderSpacing: "0px 15px" }}
            >
              <TableHead>
                <TableRow>
                  {headData.map((item, index) => (
                    <TableCell align='left' key={index}>
                      {ucwords(item)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody className={dataTable.tbodywrap}>
                {(sortOrderData as IWithdrawalTable[]).map(
                  (row: IWithdrawalTable) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        className={dataTable.productwrp}
                        component='th'
                        scope='row'
                      >
                        {row?.userId?.fullName}
                      </TableCell>
                      <TableCell align='left'>{row?.userId?.email}</TableCell>
                      <TableCell align='left'>${row?.amount}</TableCell>
                      <TableCell align='left'>
                        {row?.createdAt
                          ? new Date(row?.createdAt).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell align='left'>
                        {row?.createdAt
                          ? new Date(row?.createdAt).toLocaleTimeString()
                          : "N/A"}
                      </TableCell>
                      <TableCell align='left'>
                        {row?.status ? row.status : "N/A"}
                      </TableCell>
                      <TableCell align='left'>
                        <div className={`${dataTable.actionwrap} buttonholderAll`}>
                        <Link to={`/admin/withdrawals/${row._id}`}>
                          <p className={dataTable.edit}>
                            <FontAwesomeIcon
                              icon={faEye}
                              style={{
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "20px",
                              }}
                            />
                          </p>
                        </Link>
                          <p
                            className={dataTable.edit}
                            style={{
                              cursor: isButtonDisabled(row.status, "approve")
                                ? "not-allowed"
                                : "pointer",
                              opacity: isButtonDisabled(row.status, "approve")
                                ? 0.5
                                : 1,
                            }}
                            onClick={() => {
                              if (!isButtonDisabled(row.status, "approve")) {
                                Swal.fire({
                                  title: "Are you sure?",
                                  text: "You want to approve this request?",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonText: "Confirm",
                                  cancelButtonText: "Cancel",
                                  reverseButtons: true,
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    handleStatusUpdate(row._id, "Approved");
                                  }
                                });
                              }
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faCheck}
                              style={{
                                color: "green",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "20px",
                              }}
                            />
                          </p>

                          {/* Reject Job */}
                          <p
                            className={dataTable.delete}
                            style={{
                              cursor: isButtonDisabled(row.status, "reject")
                                ? "not-allowed"
                                : "pointer",
                              opacity: isButtonDisabled(row.status, "reject")
                                ? 0.5
                                : 1,
                            }}
                            onClick={() => {
                              if (!isButtonDisabled(row.status, "reject")) {
                                Swal.fire({
                                  title: "Are you sure?",
                                  text: "You want to reject this request?",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonText: "Confirm",
                                  cancelButtonText: "Cancel",
                                  reverseButtons: true,
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    handleStatusUpdate(row._id, "Rejected");
                                  }
                                });
                              }
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faTimes}
                              style={{
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "20px",
                              }}
                            />
                          </p>
                          <p
                          className={dataTable.delete}
                          onClick={() => handleClickOpen(row._id)}
                        >
                          <img src={del} alt='Delete' />
                        </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                )}

                {sortOrderData.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={8} align='center'>
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <Stack
          spacing={2}
          justifyContent='center'
          alignItems='center'
          style={{ marginTop: "30px" }}
        >
          <Pagination
            count={Math.ceil(totalResult / rowsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            sx={{
              ".MuiPaginationItem-page": {
                backgroundColor: "#fff",
                color: "#414141",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                "&.Mui-selected": {
                  backgroundColor: "#E94257",
                  color: "#fff",
                },
                "&:hover": {
                  backgroundColor: "#E94257",
                  color: "#fff",
                },
              },
              "& .MuiPagination-ul": {
                justifyContent: "center",
              },
            }}
          />
        </Stack>
      </div>
      <Dialog
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "35px",
            overflowY: "inherit",
            padding: "40px",
            maxWidth: "562px",
          },
        }}
        maxWidth='md'
        fullWidth
        className={dataTable.custommodal}
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <div className={dataTable.modalimg}>
          <img src={delt} alt='Delete Confirmation' />
        </div>
        <DialogTitle
          id='alert-dialog-title'
          style={{
            textAlign: "center",
            fontSize: "32px",
            color: "red",
            fontWeight: "700",
          }}
        >
          {("Delete withdrawals")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            style={{
              textAlign: "center",
              color: "#676767",
              fontSize: "16px",
            }}
          >
            {("Are you sure you want to delete this withdrawals?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={handleClose} className="btn-cancel">
            {("Cancel")}
          </Button>
          <Button onClick={handleDelete} className="btn">
            {("Delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WithdrawalViewManagement;
