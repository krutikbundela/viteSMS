import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectList } from "../../redux/sclassRelated/sclassHandle";
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Paper,
  Table,
  Box,
  Divider,
  TableBody,
  TableHead,
  Typography,
} from "@mui/material";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import CustomBarChart from "../../components/CustomBarChart";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import TableChartIcon from "@mui/icons-material/TableChart";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import { StyledTableCell, StyledTableRow } from "../../components/styles";
import Loader from "../../components/Loader";

const StudentSubjects = () => {
  const dispatch = useDispatch();
  const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
  const { userDetails, currentUser, loading, response, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "Student"));
  }, [dispatch, currentUser._id]);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const [subjectMarks, setSubjectMarks] = useState([]);
  const [selectedSection, setSelectedSection] = useState("table");

  useEffect(() => {
    if (userDetails) {
      setSubjectMarks(userDetails.examResult || []);
    }
  }, [userDetails]);

  useEffect(() => {
    if (subjectMarks === []) {
      dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
    }
  }, [subjectMarks, dispatch, currentUser.sclassName._id]);

  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const renderTableSection = () => {
    return (
      <>
        <Paper sx={{ width: "90%", overflow: "hidden", p: 2, m: 2 }}>
          <Table
            sx={{
              width: "100%",
            }}
          >
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Subject</StyledTableCell>
                <StyledTableCell>Marks</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {subjectMarks.map((result, index) => {
                if (!result.subName || !result.marksObtained) {
                  return null;
                }
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{result.subName.subName}</StyledTableCell>
                    <StyledTableCell>{result.marksObtained}</StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  };

  const renderChartSection = () => {
    return <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />;
  };

  const renderClassDetailsSection = () => {
    return (
      <>
        <Box
          sx={{
            width: "100%",
            // height: "110vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "fit-content",
              m: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h2">Subject & Marks</Typography>
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
              <h3>Currently you have no Subject & Marks details</h3>
            </Paper>
          </Box>
        </Box>
      </>
    );
  };
  console.log("renderClassDetailsSection ~ currentUser:", currentUser);
            // console.log("renderClassDetailsSection ~ subjectsList:", subjectsList);
  
  // console.log("renderClassDetailsSection ~ sclassDetails:", sclassDetails);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box
            sx={{
              height: selectedSection === "table" ? "fit-content" : "100vh",
              mt: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {subjectMarks &&
            Array.isArray(subjectMarks) &&
            subjectMarks.length > 0 ? (
              <>
                <Box
                  sx={{
                    width: "100%",
                    // height: "110vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      width: "fit-content",
                      m: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h2">Subjects & Marks</Typography>
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
                </Box>
                {selectedSection === "table" && renderTableSection()}
                {selectedSection === "chart" && renderChartSection()}

                <Paper
                  sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                  elevation={3}
                >
                  <BottomNavigation
                    value={selectedSection}
                    onChange={handleSectionChange}
                    showLabels
                  >
                    <BottomNavigationAction
                      label="Table"
                      value="table"
                      icon={
                        selectedSection === "table" ? (
                          <TableChartIcon />
                        ) : (
                          <TableChartOutlinedIcon />
                        )
                      }
                    />
                    <BottomNavigationAction
                      label="Chart"
                      value="chart"
                      icon={
                        selectedSection === "chart" ? (
                          <InsertChartIcon />
                        ) : (
                          <InsertChartOutlinedIcon />
                        )
                      }
                    />
                  </BottomNavigation>
                </Paper>
              </>
            ) : (
              <>{renderClassDetailsSection()}</>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default StudentSubjects;
