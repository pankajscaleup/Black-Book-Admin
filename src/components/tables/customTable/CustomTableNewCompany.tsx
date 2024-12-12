import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Itable, complex, IUsersRoleTable } from "../../../interfaces/Itable";
import Card from "../../UI/card/Card";
import Badge from "../../UI/badge/Badge";
import Modal from "../../UI/modal/Modal";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import classes from "./CustomTable.module.scss";

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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import img1 from "../../../assets/images/product-img1.png";
import dataTable from "./datatable.module.scss";
import edit from "../../../assets/images/ri_edit-line.png";
import del from "../../../assets/images/ic_outline-delete.png";
import delt from "../../../assets/images/delete.png";
import { companyApi } from "../../../service/apis/user.api";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinner from "../../../components/UI/loadingSpinner/LoadingSpinner";

const CustomTable: React.FC<Itable> = ({
  bodyData,
  headData,
  role,
  totalData,
  totalPage,
  dataCurrentPage,
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<{ [key: string]: "asc" | "desc" }>(
    {}
  );
  const [sortOrderData, setSortOrderData] = useState<complex[]>(bodyData);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [totalResult, setTotalResult] = useState(totalData);
  const [loading, setLoading] = useState(false);

  const [addClass, setAddClass] = useState<string>("");

  const navigate = useNavigate();

  const rowsPerPage = 10;

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const handlePageChange = (
  //   event: React.ChangeEvent<unknown>,
  //   page: number
  // ) => {
  //   //alert(12);
  //   setCurrentPage(page);
  // };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setSearchTerm(searchQuery); // Update the search term state

    try {
      setAddClass("add_blur");
      const bodyData = {
        currentPage: currentPage,
        limit: 10,
        searchValue: searchQuery, // Pass the search term directly
      };
      setLoading(true);
      const response = await companyApi(bodyData);
      if (response?.code === 200) {
        const companies = response?.data?.companies || [];
        setTotalResult(companies.length);
        setLoading(false);
        setAddClass("");

        setSortOrderData(companies); // Update the table data

        // Optionally, you can also set the totalCompany state or pass it to the Pagination component if needed
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  const handleSort = async (field: string, page: number) => {
    const isAsc = sortOrder[field] === "asc";
    setSortOrder((prev) => ({
      ...prev,
      [field]: isAsc ? "desc" : "asc", // Toggle the sort order for the specific field
    }));
    setSortBy(field);
    setSortBy(field);
    //console.log("Sorting by:", field, "Order:", isAsc ? "desc" : "asc");
    try {
      const bodyData = {
        currentPage: page,
        limit: rowsPerPage,

        orderByField: field,
        orderByDirection: isAsc ? "desc" : "asc", // Pass the new sort order
        searchValue: searchTerm,
      };
      //console.log("bodyData", bodyData); return false;
      const response = await companyApi(bodyData);
      //console.log("response", response.data);
      if (response?.code === 200) {
        setSortOrderData(response?.data?.companies);
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
        currentPage: 1,
        limit: 10,

        searchValue: "",
      };
      setLoading(true);
      //console.log("bodyData", bodyData); return false;
      const response = await companyApi(bodyData);
      //console.log("response", response.data);
      if (response?.code === 200) {
        setSortOrderData(response?.data?.companies);

        setTotalResult(totalData);
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
    setAddClass("add_blur");
    // alert(page)
    try {
      const bodyData = {
        currentPage: page,
        limit: rowsPerPage,
        searchValue: searchTerm,
      };

      console.log("bodyData", bodyData);
      const response = await companyApi(bodyData);

      if (response?.code === 200) {
        setSortOrderData(response?.data?.companies);
        setLoading(false);
        setAddClass("");
      }
    } catch (err) {
      console.error("Failed to fetch page data", err);
    }
  };
  //alert(currentPage)

  const paginatedRows = (sortOrderData as IUsersRoleTable[]).slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  console.log("paginatedRows", paginatedRows);
  const ucwords = (str: string): string => {
    return str.replace(/\b\w/g, (char: string) => char.toUpperCase());
  };
  console.log("loading", loading);

  return (
    <div style={{ position: "relative" }}>
      {loading ? (
        <LoadingSpinner /> // Show loading spinner while data is loading
      ) : null}

      <div
        className={`${dataTable.datatablemainwrap} ${
          addClass ? dataTable[addClass] : ""
        }`}
        style={
          {
            // backgroundColor: "#f2f2f2",
            // padding: "60px 30px",
            // borderRadius: "35px",
          }
        }
      >
        <div className={dataTable.compheaderflex}>
          <h2>{t("Company Users")}</h2>
          <button
            onClick={() => navigate("/admin/company/add")}
            className={dataTable.upbtn}
            // style={{
            //   padding: "8px 12px",
            //   borderRadius: "5px",
            //   border: "1px solid #ee5338",
            //   cursor: "pointer",
            //   backgroundColor: "#ee5338",
            //   color: "white",
            //   fontSize: "16px",
            //   fontWeight: "700",
            // }}
          >
            Add Company
          </button>
        </div>

        {/* Search Box */}
        <div
          className={dataTable.searchwrap}
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "flex-start",
            // float: "right",
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
                    onClick={() =>
                      ["name", "email", "website"].includes(item) &&
                      handleSort(item, currentPage)
                    } // Only allow click if it's one of the sortable columns
                    style={{
                      cursor: ["name", "email", "website"].includes(item)
                        ? "pointer"
                        : "default", // Change cursor style based on whether it's clickable
                    }}
                  >
                    {ucwords(item)}
                    {/* Only show arrows for specific fields */}
                    {["name", "email", "website"].includes(item) &&
                      sortOrder &&
                      (sortOrder[item] === "asc" ? (
                        <ArrowUpwardIcon
                          style={{
                            top: "5px",
                            position: "relative",
                            fontSize: "20px",
                            marginLeft: "10px",
                          }}
                        />
                      ) : (
                        <ArrowDownwardIcon
                          style={{
                            top: "5px",
                            position: "relative",
                            fontSize: "18px",
                            marginLeft: "10px",
                          }}
                        />
                      ))}
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
                    <TableCell align='left'>{row.id}</TableCell>
                    <TableCell
                      className={dataTable.productwrp}
                      component='th'
                      scope='row'
                    >
                      {row.name}
                    </TableCell>

                    <TableCell align='left'>{row.email}</TableCell>
                    <TableCell align='left'>{row.website}</TableCell>

                    <TableCell align='left'>
                      <div className={dataTable.actionwrap}>
                        <Link to={`/admin/company/${row.id}`}>
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
                        {/* <p
                          className={dataTable.delete}
                          onClick={handleClickOpen}
                        >
                          <img src={del} alt='Delete' />
                        </p> */}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              )}
              {sortOrderData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align='center'>
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
          {t("Delete Customer")}
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
            {t("Are you sure you want to delete this?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={handleClose} className={dataTable.canclebtn}>
            {t("Cancel")}
          </Button>
          <Button onClick={handleClose} className={dataTable.dltbtn}>
            {t("Delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomTable;
