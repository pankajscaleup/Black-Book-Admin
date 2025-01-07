import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Itable, complex, IUsersRoleTable } from "../../../interfaces/Itable";
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
import { userApi, deleteUser } from "../../../service/apis/user.api";

import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinner from "../../../components/UI/loadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";

const CustomTable: React.FC<Itable> = ({
  bodyData,
  headData,
  role,
  totalData
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrderData, setSortOrderData] = useState<complex[]>(bodyData);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [totalResult, setTotalResult] = useState(totalData);
  const [loading, setLoading] = useState(false);
  const [addClass, setAddClass] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const rowsPerPage = 10;

  const handleClickOpen = (userId: string) => {
    setSelectedUserId(userId);
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
        role: role,
        search: searchQuery,
      };
      setLoading(true);

      const response = await userApi(bodyData);
      if (response?.status === 200) {
        setLoading(false);
        setTotalResult(response?.users?.totalResults);
        setSortOrderData(response?.users?.users);
        setAddClass("");
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteUser(selectedUserId);
      if (response?.status === 200) {
        toast.success(response.message);
        setOpen(false);
        // Refresh data
        const bodyData = {
          currentPage: currentPage,
          limit: rowsPerPage,
          role: role,
          search: searchTerm,
        };
        const refreshResponse = await userApi(bodyData);
        if (refreshResponse?.status === 200) {
          setSortOrderData(refreshResponse?.users?.users);
          setTotalResult(refreshResponse?.users?.totalResults);
        }
        setLoading(false);
      }
    } catch (err) {
      console.error("Failed to delete user", err);
      setLoading(false);
    }
  };
  
  const handleSort = async (field: string) => {
    try {
      const bodyData = {
        currentPage: currentPage,
        limit: 10,
        role: role,
        search: searchTerm,
      };
      const response = await userApi(bodyData);
      if (response?.status === 200) {
        setSortOrderData(response?.users?.users);
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
    }
  };

  const clearSearch = async () => {
    setSearchTerm("");
    try {
      setAddClass("add_blur");
      const bodyData = {
        page: 1,
        currentPage: 1,
        role: role,
        search: "",
      };
      setLoading(true);
      const response = await userApi(bodyData);
      if (response?.status === 200) {
        setSortOrderData(response?.users?.users);
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
    // alert(page)
    try {
      setAddClass("add_blur");
      const bodyData = {
        currentPage: page,
        limit: rowsPerPage,
        role: role,
        search: searchTerm,
      };

      const response = await userApi(bodyData);

      if (response?.status === 200) {
        setSortOrderData(response?.users?.users);
        setLoading(false);
        setAddClass("");
      }
    } catch (err) {
      console.error("Failed to fetch page data", err);
    }
  };
  const ucwords = (str: string): string => {
    // Special case handling for FirstName
    const exceptions = ["FirstName"];

    return str
      .split(" ")
      .map((word) => {
        if (exceptions.includes(word)) {
          return word; // Leave it as it is if it's in the exceptions list
        }
        // Capitalize first letter of each word unless it's in exceptions
        return word.replace(/\b\w/g, (char: string) => char.toUpperCase());
      })
      .join(" ");
  };

  return (
    <div style={{ position: "relative" }} className="dsp">
      {loading ? (
        <LoadingSpinner /> // Show loading spinner while data is loading
      ) : null}

      <div
        className={`${dataTable.datatablemainwrap} ${
          addClass ? dataTable[addClass] : ""
        }`}>
        <div
          className="searchwrap"
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
<div className="usertabledata">
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
              {(sortOrderData as IUsersRoleTable[]).map(
                (row: IUsersRoleTable) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      className={dataTable.productwrp}
                      component='th'
                      scope='row'
                    >
                      {row?.fullName}
                    </TableCell>
                    <TableCell align='left'>{row?.email}</TableCell>
                    <TableCell align='left'>{row?.about?.gender}</TableCell>
                    <TableCell align='left'>{row?.about?.location}</TableCell>
                    <TableCell
                      className={
                        row.isVerfied === true
                          ? dataTable.approved
                          : row.isVerfied === false
                            ? dataTable.pending
                            : ""
                      }
                      align='left'
                    >
                    <p>{row.isVerfied ? "Verified" : "Not Verified"}</p>
                    </TableCell>

                    <TableCell align='left'>
                      <div className={dataTable.actionwrap}>
                      <Link to={`/admin/users/${row.id}`}>
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
                        <Link to={`/admin/addUser/${row.id}`}>
                          <p className={dataTable.edit}>
                            <FontAwesomeIcon
                              icon={faPencilAlt}
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
                          className={dataTable.delete}
                          onClick={() => handleClickOpen(row.id)}
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
          {t("Delete User")}
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
            {t("Are you sure you want to delete this user?")}
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
    </div>
  );
};

export default CustomTable;
