import React, { useState } from "react";
import { IStable, complex, IUsersSupportTable } from "../../../interfaces/Itable";
import { useTranslation } from "react-i18next";

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

import dataTable from "./datatable.module.scss";
import del from "../../../assets/images/ic_outline-delete.png";
import delt from "../../../assets/images/delete.png";
import closeSupport from "../../../assets/images/close-circle.svg";
import { supportList, deleteSupport, closeSupportRequest } from "../../../service/apis/support.api";
import LoadingSpinner from "../../../components/UI/loadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";

const CustomTable: React.FC<IStable> = ({
  bodyData,
  headData,
  status,
  totalData
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openclosepopup, setOpenclosepopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrderData, setSortOrderData] = useState<complex[]>(bodyData);
  const [totalResult, setTotalResult] = useState(totalData);
  const [loading, setLoading] = useState(false);
  const [addClass, setAddClass] = useState<string>("");
  const [selectedSupportId, setSelectedSupportId] = useState<string | null>(null);
  const [selectedCloseReqId, setSelectedCloseReqId] = useState<string | null>(null);

  const rowsPerPage = 10;

  const handleClickOpen = (id: string) => {
    setSelectedSupportId(id);
    setOpen(true);
  };

  const handleClickOpenCloseReq = (id: string) => {
    setSelectedCloseReqId(id);
    setOpenclosepopup(true);
  }

  const handleClose = () => setOpen(false);
  const handleCloseRequestPopup = () => setOpenclosepopup(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteSupport(selectedSupportId);
        toast.success(response.message);
        setOpen(false);
        const bodyData = {
          currentPage: currentPage,
          limit: rowsPerPage,
          status: status,
        };
        const refreshResponse = await supportList(bodyData);
        setSortOrderData(refreshResponse?.supportData?.viewSupport);
        setTotalResult(refreshResponse?.supportData?.totalResults);
        setLoading(false);
    } catch (err) {
      console.error("Failed to delete support", err);
      setLoading(false);
    }
  };

  const handleCloseRequest = async() => {
    setLoading(true);
    try {
      const payload = {
        status: 'Closed'
      }
      const response = await closeSupportRequest(selectedCloseReqId, payload);
        toast.success(response.message);
        setOpenclosepopup(false);
        const bodyData = {
          currentPage: currentPage,
          limit: rowsPerPage,
          status: status,
        };
        const refreshResponse = await supportList(bodyData);
        setSortOrderData(refreshResponse?.supportData?.viewSupport);
        setTotalResult(refreshResponse?.supportData?.totalResults);
        setLoading(false);
    } catch (err) {
      console.error("Failed to close support request", err);
      setLoading(false);
    }
  }
  
  const handleSort = async (field: string) => {
    try {
      const bodyData = {
        currentPage: currentPage,
        limit: 10,
        status: status,
      };
      const response = await supportList(bodyData);
      if (response?.status === 200) {
        setSortOrderData(response?.supportData?.viewSupport);
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
        status: status,
      };
      const response = await supportList(bodyData);
      if (response?.status === 200) {
        setSortOrderData(response?.supportData?.viewSupport);
        setLoading(false);
        setAddClass("");
      }
    } catch (err) {
      console.error("Failed to fetch page data", err);
    }
  };
  const ucwords = (str: string): string => {
    const exceptions = ["fullName"];
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

  return (
    <div style={{ position: "relative" }}>
      {loading ? (
        <LoadingSpinner /> // Show loading spinner while data is loading
      ) : null}

      <div
        className={`${dataTable.datatablemainwrap} ${
          addClass ? dataTable[addClass] : ""
        }`}>

        <TableContainer className={dataTable.tbodymain} component={Paper}>
          <Table
            sx={{ minWidth: 1000 }}
            aria-label='simple table'
            style={{ borderCollapse: "separate", borderSpacing: "0px 15px" }}
          >
            <TableHead>
              <TableRow>
                {headData.map((item, index) => (
                  <TableCell
                    align='left'
                    key={index}
                    onClick={() => handleSort(item)}
                  >
                    {ucwords(item)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody className={dataTable.tbodywrap}>
              {(sortOrderData as IUsersSupportTable[]).map(
                (row: IUsersSupportTable) => (
                  <TableRow
                    key={row?._id}
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
                    <TableCell align='left'>{row?.subject}</TableCell>
                    <TableCell align='left'>{row?.message}</TableCell>
                    <TableCell
                      className={
                        row.status === 'Closed'
                          ? dataTable.approved
                          : row.status === 'Pending'
                            ? dataTable.pending
                            : ""
                      }
                      align='left'
                    >
                      <p>{row.status}</p>
                    </TableCell>

                    <TableCell align='left'>
                      <div className={dataTable.actionwrap}>
                      {row.status === 'Pending' && (
                        <p
                            className={dataTable.edit}
                            onClick={() => handleClickOpenCloseReq(row._id)}
                        >
                            <img src={closeSupport} alt="Close Request" />
                        </p>
                        )}

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

        <Stack
          spacing={2}
          justifyContent='center'
          alignItems='center'
          style={{ marginTop: "30px" }}
        >
          <Pagination
            count={Math.ceil(totalResult / rowsPerPage)} // total rows divided by rows per page
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

    {/*Delete confirmation popup*/}
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
            color: "#000",
            fontWeight: "700",
          }}
        >
          {t("Delete Request")}
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
            {t("Are you sure you want to delete this support request?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={handleClose} className={dataTable.canclebtn}>
            {t("Cancel")}
          </Button>
          <Button onClick={handleDelete} className={dataTable.dltbtn}>
            {t("Delete")}
          </Button>
        </DialogActions>
      </Dialog>


       {/*Close request popup*/}
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
        open={openclosepopup}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <div className={dataTable.modalimg}>
          <img src={delt} alt='Close Request Confirmation' />
        </div>
        <DialogTitle
          id='alert-dialog-title'
          style={{
            textAlign: "center",
            fontSize: "32px",
            color: "#000",
            fontWeight: "700",
          }}
        >
          {t("Close Request")}
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
            {t("Are you sure you want to close this support request?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={handleCloseRequestPopup} className={dataTable.canclebtn}>
            {t("Cancel")}
          </Button>
          <Button onClick={handleCloseRequest} className={dataTable.dltbtn}>
            {t("Close")}
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default CustomTable;
