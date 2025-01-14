import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { commonItable, complex, ITestTable } from "../../../interfaces/Itable";
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

import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinner from "../../../components/UI/loadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";

const TestimonialTable: React.FC<commonItable> = ({
  title,
  bodyData,
  headData,
  totalData,
  searchTerm,
  changePage,
  dataCurrentPage,
  deleteMessage,
  handleDelete,
  searchChange,
  slug
}) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(dataCurrentPage);
  const [sortOrderData, setSortOrderData] = useState<complex[]>(bodyData);
  const [totalResult, setTotalResult] = useState(totalData);
  const [loading, setLoading] = useState(false);
  const [addClass, setAddClass] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>("");

  const rowsPerPage = 10;


  const handleClickOpen = (id: string) => {
    console.log(id);
    setSelectedId(id);
    setOpen(true);
  };
  useEffect(() => {
    if (searchTerm) {
      inputRef.current.focus();
    }
  }, [searchTerm]);

  const handleClose = () => setOpen(false);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    //setAddClass("add_blur");
    searchChange?.(searchQuery);
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
    <div style={{ position: "relative" }} className="search-list">
    

      <div
        className={`${dataTable.datatablemainwrap} ${
          addClass ? dataTable[addClass] : ""
        }`}>
        <div
          className={dataTable.searchwrap}
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
            ref={inputRef}
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
        </div>
        {loading ? (
        <LoadingSpinner />
      ) : <>
        <TableContainer className={dataTable.tbodymain} component={Paper}>
          <Table
            sx={{ minWidth: 1000 }}
            aria-label='simple table'
            style={{ borderCollapse: "separate", borderSpacing: "0px 15px" }}
          >
            <TableHead>
              <TableRow>
             {Object.values(headData).map((item, index) => (
                  <TableCell
                    align='left'
                    key={index}
                  >
                    {ucwords(item)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody className={dataTable.tbodywrap} key="tbody_1">
              {(sortOrderData as ITestTable[]).map(
                (row: ITestTable) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                   {Object.entries(headData).map(([key, value], idx) => (
                      (key !=='actions')?
                      <TableCell key={`${key}_${idx}`}>
                        {key ==='createdAt'? (
                          new Date(row[key as keyof ITestTable]).toLocaleDateString() // Convert Date to string
                        ) : typeof row[key as keyof ITestTable] === "string" || "number" ? (
                          row[key as keyof ITestTable] // Directly render the string
                        ) : String(row[key as keyof ITestTable]) }
                      </TableCell> :null
                    ))}

                    <TableCell align='left' key="actions">
                      <div className={dataTable.actionwrap}>
                        <Link to={`/admin/${slug}/edit/${row._id}`}>
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
                        {slug==='page'?<></>:<>
                          <p
                          className={dataTable.delete}
                          onClick={() => handleClickOpen(row._id)}
                        >
                          <img src={del} alt='Delete' />
                        </p>
                        </>}
                        
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
            onChange={(_, page) => changePage?.(page)}
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
                  pointerEvents: "none",
                  cursor: "default",
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
        </>}
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
          {t(`Delete ${title}`)}
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
            {deleteMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={handleClose} className="btn-cancel">
            {t("Cancel")}
          </Button>
          <Button onClick={() => handleDelete?.(selectedId)}  className="btn">
            {t("Delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TestimonialTable;