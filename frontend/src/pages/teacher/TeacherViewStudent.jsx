import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Collapse,
  Table,
  TableBody,
  TableHead,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  calculateOverallAttendancePercentage,
  calculateSubjectAttendancePercentage,
  groupAttendanceBySubject,
} from "../../components/attendanceCalculator";
import CustomPieChart from "../../components/CustomPieChart";
import { PurpleButton } from "../../components/buttonStyles";
import { StyledTableCell, StyledTableRow } from "../../components/styles";
import Loader from "../../components/Loader";

const TeacherViewStudent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { currentUser, userDetails, response, loading, error } = useSelector(
    (state) => state.user
  );

  const address = "Student";
  const studentID = params.id;
  const teachSubject = currentUser.teachSubject?.subName;
  const teachSubjectID = currentUser.teachSubject?._id;

  useEffect(() => {
    dispatch(getUserDetails(studentID, address));
  }, [dispatch, studentID]);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const [sclassName, setSclassName] = useState("");
  const [studentSchool, setStudentSchool] = useState("");
  const [subjectMarks, setSubjectMarks] = useState("");
  const [subjectAttendance, setSubjectAttendance] = useState([]);

  const [openStates, setOpenStates] = useState({});

  const handleOpen = (subId) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [subId]: !prevState[subId],
    }));
  };

  useEffect(() => {
    if (userDetails) {
      setSclassName(userDetails.sclassName || "");
      setStudentSchool(userDetails.school || "");
      setSubjectMarks(userDetails.examResult || "");
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const overallAttendancePercentage =
    calculateOverallAttendancePercentage(subjectAttendance);
  const overallAbsentPercentage = 100 - overallAttendancePercentage;

  const chartData = [
    { name: "Present", value: overallAttendancePercentage },
    { name: "Absent", value: overallAbsentPercentage },
  ];

  return (
    <>
      <Box
        sx={{
          height: "fit-content",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2">Student Profile</Typography>
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
        {loading ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <Paper
              sx={{
                padding: 2,
                marginTop: "20px",
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              Name: {userDetails.name}
              <br />
              Roll Number: {userDetails.rollNum}
              <br />
              Class: {sclassName.sclassName}
              <br />
              School: {studentSchool.schoolName}
            </Paper>
            <br />
            <br />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h2">Attendance</Typography>
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
              {subjectAttendance &&
                Array.isArray(subjectAttendance) &&
                subjectAttendance.length > 0 && (
                  <>
                    {Object.entries(
                      groupAttendanceBySubject(subjectAttendance)
                    ).map(
                      (
                        [subName, { present, allData, subId, sessions }],
                        index
                      ) => {
                        if (subName === teachSubject) {
                          const subjectAttendancePercentage =
                            calculateSubjectAttendancePercentage(
                              present,
                              sessions
                            );

                          return (
                            <Table key={index}>
                              <TableHead>
                                <StyledTableRow>
                                  <StyledTableCell>Subject</StyledTableCell>
                                  <StyledTableCell>Present</StyledTableCell>
                                  <StyledTableCell>
                                    Total Sessions
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    Attendance Percentage
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    Actions
                                  </StyledTableCell>
                                </StyledTableRow>
                              </TableHead>

                              <TableBody>
                                <StyledTableRow>
                                  <StyledTableCell>{subName}</StyledTableCell>
                                  <StyledTableCell>{present}</StyledTableCell>
                                  <StyledTableCell>{sessions}</StyledTableCell>
                                  <StyledTableCell>
                                    {subjectAttendancePercentage}%
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    <Button
                                      variant="contained"
                                      onClick={() => handleOpen(subId)}
                                    >
                                      {openStates[subId] ? (
                                        <KeyboardArrowUp />
                                      ) : (
                                        <KeyboardArrowDown />
                                      )}
                                      Details
                                    </Button>
                                  </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                  <StyledTableCell
                                    style={{ paddingBottom: 0, paddingTop: 0 }}
                                    colSpan={6}
                                  >
                                    <Collapse
                                      in={openStates[subId]}
                                      timeout="auto"
                                      unmountOnExit
                                    >
                                      <Box sx={{ margin: 1 }}>
                                        <Typography
                                          variant="h6"
                                          gutterBottom
                                          component="div"
                                        >
                                          Attendance Details
                                        </Typography>
                                        <Table
                                          size="small"
                                          aria-label="purchases"
                                        >
                                          <TableHead>
                                            <StyledTableRow>
                                              <StyledTableCell>
                                                Date
                                              </StyledTableCell>
                                              <StyledTableCell align="right">
                                                Status
                                              </StyledTableCell>
                                            </StyledTableRow>
                                          </TableHead>
                                          <TableBody>
                                            {allData.map((data, index) => {
                                              const date = new Date(data.date);
                                              const dateString =
                                                date.toString() !==
                                                "Invalid Date"
                                                  ? date
                                                      .toISOString()
                                                      .substring(0, 10)
                                                  : "Invalid Date";
                                              return (
                                                <StyledTableRow key={index}>
                                                  <StyledTableCell
                                                    component="th"
                                                    scope="row"
                                                  >
                                                    {dateString}
                                                  </StyledTableCell>
                                                  <StyledTableCell align="right">
                                                    {data.status}
                                                  </StyledTableCell>
                                                </StyledTableRow>
                                              );
                                            })}
                                          </TableBody>
                                        </Table>
                                      </Box>
                                    </Collapse>
                                  </StyledTableCell>
                                </StyledTableRow>
                              </TableBody>
                            </Table>
                          );
                        } else {
                          return null;
                        }
                      }
                    )}
                    <div>
                      Overall Attendance Percentage:{" "}
                      {overallAttendancePercentage.toFixed(2)}%
                    </div>

                    <CustomPieChart data={chartData} />
                  </>
                )}
            </Paper>
            <br />
            <br />
            <Button
              variant="contained"
              onClick={() =>
                navigate(
                  `/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`
                )
              }
            >
              Add Attendance
            </Button>
            <br />
            <br />
            <br />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h2">Subject Marks:</Typography>
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

            {subjectMarks &&
              Array.isArray(subjectMarks) &&
              subjectMarks.length > 0 && (
                <>
                  <Paper sx={{ width: "90%", overflow: "hidden", p: 2, m: 2 }}>
                    {subjectMarks.map((result, index) => {
                      if (result.subName.subName === teachSubject) {
                        return (
                          <Table key={index}>
                            <TableHead>
                              <StyledTableRow>
                                <StyledTableCell>Subject</StyledTableCell>
                                <StyledTableCell>Marks</StyledTableCell>
                              </StyledTableRow>
                            </TableHead>
                            <TableBody>
                              <StyledTableRow>
                                <StyledTableCell>
                                  {result.subName.subName}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {result.marksObtained}
                                </StyledTableCell>
                              </StyledTableRow>
                            </TableBody>
                          </Table>
                        );
                      } else if (!result.subName || !result.marksObtained) {
                        return null;
                      }
                      return null;
                    })}
                  </Paper>
                </>
              )}
            <PurpleButton
              variant="contained"
              onClick={() =>
                navigate(
                  `/Teacher/class/student/marks/${studentID}/${teachSubjectID}`
                )
              }
            >
              Add Marks
            </PurpleButton>
            <br />
            <br />
            <br />
          </>
        )}
      </Box>
    </>
  );
};

export default TeacherViewStudent;
