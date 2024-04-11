import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAllTeacher, deleteTeacher, getAllTeachers } from "../../../redux/teacherRelated/teacherHandle";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  Button,
  Box,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { StyledTableCell, StyledTableRow } from "../../../components/styles";
import { BlueButton, GreenButton } from "../../../components/buttonStyles";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import Loader from "../../../components/Loader";

const ShowTeachers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teachersList, loading, error, response } = useSelector(
    (state) => state.teacher
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllTeachers(currentUser._id));
  }, [currentUser._id, dispatch]);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  if (loading) {
    return <Loader />;
  } else if (response) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            m: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2">Teachers</Typography>
          <Divider
            variant="middle"
            orientation="horizontal"
            sx={{
              width: "90%",
              borderBottomWidth: "5px",
              color: "black",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "16px",
          }}
        >
          <GreenButton
            variant="contained"
            onClick={() => navigate("/Admin/teachers/chooseclass")}
            sx={{
              width: "fit-content",
            }}
          >
            Add Teacher
          </GreenButton>
          <Paper
            sx={{
              margin: "50px",
              width: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <h3>No Teacher Added </h3>
          </Paper>
        </Box>
      </Box>
    );
  } else if (error) {
    console.log(error);
  }

  const deleteSingleTeacherHandler = (deleteID) => {
    dispatch(deleteTeacher(deleteID)).then(() => {
      dispatch(getAllTeachers(currentUser._id));
    });
  };
  const deleteAllTeachersHandler = () => {
    dispatch(deleteAllTeacher(currentUser._id)).then(() => {
      dispatch(getAllTeachers(currentUser._id));
    });
  };

  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "teachSubject", label: "Subject", minWidth: 100 },
    { id: "teachSclass", label: "Class", minWidth: 170 },
  ];

  const rows =
    Array.isArray(teachersList) &&
    teachersList.map((teacher) => {
      return {
        name: teacher.name,
        teachSubject: teacher.teachSubject?.subName || null,
        teachSclass: teacher.teachSclass.sclassName,
        teachSclassID: teacher.teachSclass._id,
        id: teacher._id,
      };
    });

  const actions = [
    {
      icon: <PersonAddAlt1Icon color="primary" />,
      name: "Add New Teacher",
      action: () => navigate("/Admin/teachers/chooseclass"),
    },
    {
      icon: <PersonRemoveIcon color="error" />,
      name: "Delete All Teachers",
      action: () => deleteAllTeachersHandler(),
    },
  ];

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            m: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2">Teachers</Typography>
          <Divider
            variant="middle"
            orientation="horizontal"
            sx={{
              width: "90%",
              borderBottomWidth: "5px",
              color: "black",
            }}
          />
        </Box>

        <Paper sx={{ width: "90%", overflow: "hidden", p: 2, m: 2 }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <StyledTableRow>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(rows) &&
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <StyledTableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            if (column.id === "teachSubject") {
                              return (
                                <StyledTableCell
                                  key={column.id}
                                  align={column.align}
                                >
                                  {value ? (
                                    value
                                  ) : (
                                    <Button
                                      variant="contained"
                                      onClick={() => {
                                        navigate(
                                          `/Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`
                                        );
                                      }}
                                    >
                                      Add Subject
                                    </Button>
                                  )}
                                </StyledTableCell>
                              );
                            }
                            return (
                              <StyledTableCell
                                key={column.id}
                                align={column.align}
                              >
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </StyledTableCell>
                            );
                          })}
                          <StyledTableCell align="center">
                            <IconButton
                              onClick={() => deleteSingleTeacherHandler(row.id)}
                            >
                              <PersonRemoveIcon color="error" />
                            </IconButton>
                            <BlueButton
                              variant="contained"
                              onClick={() =>
                                navigate("/Admin/teachers/teacher/" + row.id)
                              }
                            >
                              View
                            </BlueButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 5));
              setPage(0);
            }}
          />

          <SpeedDialTemplate actions={actions} />
          <Popup
            message={message}
            setShowPopup={setShowPopup}
            showPopup={showPopup}
          />
        </Paper>
      </Box>
    </>
  );
};

export default ShowTeachers;
