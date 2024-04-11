import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { calculateOverallAttendancePercentage } from "../../components/attendanceCalculator";
import CustomPieChart from "../../components/CustomPieChart";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import styled from "styled-components";
import SeeNotice from "../../components/SeeNotice";
import CountUp from "react-countup";
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { getSubjectList } from "../../redux/sclassRelated/sclassHandle";
import Loader from "../../components/Loader";

const StudentHomePage = () => {
  const dispatch = useDispatch();

  const { userDetails, currentUser, loading, response } = useSelector(
    (state) => state.user
  );
  const { subjectsList } = useSelector((state) => state.sclass);

  const [subjectAttendance, setSubjectAttendance] = useState([]);

  const classID = currentUser.sclassName._id;

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "Student"));
    dispatch(getSubjectList(classID, "ClassSubjects"));
  }, [dispatch, currentUser._id, classID]);

  const numberOfSubjects = subjectsList && subjectsList.length;

  useEffect(() => {
    if (userDetails) {
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
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={12} md={3} lg={3}>
              <StyledPaper>
                <img src={Subject} alt="Subjects" />
                <Title>Total Subjects</Title>
                <Data start={0} end={numberOfSubjects} duration={2.5} />
              </StyledPaper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <SeeNotice />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        {/* <ChartContainer> */}
        <Box
          sx={{
            ml: 10,
            width: "90%",
          }}
        >
          {response ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "16px",
              }}
            >
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
                <h3>No Attendance Updated </h3>
              </Paper>
            </Box>
          ) : (
            <>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      flexDirection: "column",
                      mt: 8,
                      mb: 2,
                    }}
                  >
                    {subjectAttendance &&
                      Array.isArray(subjectAttendance) &&
                      subjectAttendance.length > 0 && (
                        <>
                          <Typography variant="h3">Attendance:</Typography>
                          <Divider
                            variant="middle"
                            orientation="horizontal"
                            sx={{
                              width: "19%",
                              borderBottomWidth: "5px",
                              color: "black",
                            }}
                          />
                        </>
                      )}
                  </Box>
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
                    {subjectAttendance &&
                    Array.isArray(subjectAttendance) &&
                    subjectAttendance.length > 0 ? (
                      <>
                        <CustomPieChart data={chartData} />
                      </>
                    ) : (
                      <Typography variant="h6"></Typography>
                    )}
                  </Box>
                </>
              )}
            </>
          )}
        </Box>

        {/* </ChartContainer> */}
      </Box>
    </>
  );
};

const ChartContainer = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: column;
  height: 240px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + 0.6vw);
  color: green;
`;

export default StudentHomePage;
