import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getTeacherFreeClassSubjects } from "../../../redux/sclassRelated/sclassHandle";
import { updateTeachSubject } from "../../../redux/teacherRelated/teacherHandle";
import { GreenButton, PurpleButton } from "../../../components/buttonStyles";
import { StyledTableCell, StyledTableRow } from "../../../components/styles";
import Loader from "../../../components/Loader";

const ChooseSubject = ({ situation }) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [classID, setClassID] = useState("");
  const [teacherID, setTeacherID] = useState("");
  const [loader, setLoader] = useState(false);

  const { subjectsList, loading, error, response } = useSelector(
    (state) => state.sclass
  );

  useEffect(() => {
    if (situation === "Norm") {
      setClassID(params.id);
      const classID = params.id;
      dispatch(getTeacherFreeClassSubjects(classID));
    } else if (situation === "Teacher") {
      const { classID, teacherID } = params;
      setClassID(classID);
      setTeacherID(teacherID);
      dispatch(getTeacherFreeClassSubjects(classID));
    }
  }, [situation]);

  if (loading) {
    return <Loader/>;
  } else if (response) {
    return (
      <div>
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
            <Typography variant="h2">Choose A Subject</Typography>
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
              onClick={() => navigate("/Admin/addsubject/" + classID)}
              sx={{
                width: "fit-content",
              }}
            >
              Add Subjects
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
              <Typography align="center" sx={{ p: 1 }}>
                Sorry,the subjects are not assigned to this class <br /> OR
                <br /> all subjects have teachers assigned already{" "}
              </Typography>
            </Paper>
          </Box>
        </Box>
      </div>
    );
  } else if (error) {
    console.log(error);
  }

  const updateSubjectHandler = (teacherId, teachSubject) => {
    setLoader(true);
    dispatch(updateTeachSubject(teacherId, teachSubject));
    navigate("/Admin/teachers");
  };

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
        <Typography variant="h2">Choose A Subject</Typography>
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
        <>
          <TableContainer>
            <Table aria-label="sclasses table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell align="center">Subject Name</StyledTableCell>
                  <StyledTableCell align="center">Subject Code</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(subjectsList) &&
                  subjectsList.length > 0 &&
                  subjectsList.map((subject, index) => (
                    <StyledTableRow key={subject._id}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        style={{ color: "white" }}
                      >
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {subject.subName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {subject.subCode}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {situation === "Norm" ? (
                          <GreenButton
                            variant="contained"
                            onClick={() =>
                              navigate(
                                "/Admin/teachers/addteacher/" + subject._id
                              )
                            }
                          >
                            Choose
                          </GreenButton>
                        ) : (
                          <GreenButton
                            variant="contained"
                            disabled={loader}
                            onClick={() =>
                              updateSubjectHandler(teacherID, subject._id)
                            }
                          >
                            {loader ? (
                              <div className="load"></div>
                            ) : (
                              "Choose Sub"
                            )}
                          </GreenButton>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      </Paper>
    </Box>
  );
};

export default ChooseSubject;
