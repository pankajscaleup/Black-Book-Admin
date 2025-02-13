import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Iinvitationtable, complex, IUsersRoleTable,IUsersEventTable } from "../../../interfaces/Itable";
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

import dataTable from "../../tables/customTable/datatable.module.scss";
import del from "../../../assets/images/ic_outline-delete.png";
import delt from "../../../assets/images/delete.png";
import { userInvitationsApi, deleteUser } from "../../../service/apis/user.api";

import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faEye,faCalendarXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinner from "../../../components/UI/loadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";


const Invitations: React.FC<Iinvitationtable> = ({
  bodyData,
  headData,
  totalData,
  currentUser,
  limit
}) => {
  const { t } = useTranslation();
  const [sortOrderData, setSortOrderData] = useState<complex[]>(bodyData);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [addClass, setAddClass] = useState<string>("");

  const [totalInvites, setTotalInvites] = useState<number>(totalData);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const rowsPerPage = 10;

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setSearchTerm(searchQuery);

    try {
      setLoading(true);
      setAddClass("add_blur");

      const bodyData={
        id:currentUser,
        limit:rowsPerPage,
        currentPage:currentPage,
        search: searchQuery,
      }
      setLoading(true);

      const response = await userInvitationsApi(bodyData);
      if (response?.status === 200) {
        setLoading(false);
        setSortOrderData(response?.invitations?.invitations || null);
        setCurrentPage(response?.invitations?.page)
        setTotalInvites(response?.invitations?.totalResults)   
        setAddClass("");
      }
      else
      {        
        setSortOrderData([])
        setCurrentPage(0)      
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  // const handleSort = async (field: string) => {
  //   try {
  //     const bodyData = {
  //       id:currentUser,
  //       currentPage: currentPage,
  //       limit: rowsPerPage,
  //       search: searchTerm,
  //     };
  //     const response = await userInvitationsApi(bodyData);
  //     if (response?.status === 200) {
  //       setSortOrderData(response?.invitations?.invitations || null);
  //     }
  //   } catch (err) {
  //     console.error("Failed to fetch data", err);
  //   } finally {
  //   }
  // };

  const clearSearch = async () => {
    setSearchTerm("");
    try {
      setAddClass("add_blur");
      const bodyData = {
        id:currentUser,
        page: 1,
        currentPage: 1,
        search: "",
      };
      setLoading(true);
      const response = await userInvitationsApi(bodyData);
      if (response?.status === 200) {
        setSortOrderData(response?.invitations?.invitations || null);
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
        id:currentUser,
        currentPage: page,
        limit: rowsPerPage,
        search: searchTerm,
      };

      const response = await userInvitationsApi(bodyData);

      if (response?.status === 200) {
        setSortOrderData(response?.invitations?.invitations || null);
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
                {headData.map((item:any, index:any) => (
                  <TableCell
                    align='left'
                    key={index}
                    // onClick={() => handleSort(item)}
                  >
                    {ucwords(item)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody className={dataTable.tbodywrap}>
              {(sortOrderData as IUsersEventTable[]).map(
                (row: IUsersEventTable) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      className={dataTable.productwrp}
                      component='th'
                      scope='row'
                    >
                      {row?.description}
                    </TableCell>
                    <TableCell align='left'>{row?.date}</TableCell>
                    <TableCell align='left'>{row?.transportationMoney}</TableCell>
                    {/* 
                    <TableCell align='left'>
                      <div className={dataTable.actionwrap}>
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
                      </div>
                    </TableCell>*/}
                  </TableRow>
                )
              )}

              {sortOrderData.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={3} align='center'>
                  {t(`No data available`)}
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
            count={Math.ceil(totalInvites / rowsPerPage)} // total rows divided by rows per page
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
    </div>
  );
};

export default Invitations;
