import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteAllStudentbyClassId,
  deleteAllSubjectbyClassId,
  deleteAllTeacherbyClassId,
  getClassDetails,
  getClassStudents,
  getSubjectList,
  getTeacherList,
} from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import {
  Box,
  Container,
  Typography,
  Tab,
  IconButton,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import CountUp from "react-countup";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { resetSubjects } from "../../../redux/sclassRelated/sclassSlice";
import {
  BlueButton,
  GreenButton,
  PurpleButton,
} from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from "@mui/icons-material/PostAdd";
import styled from "styled-components";
import Students from "../../../assets/img1.png";
import Classes from "../../../assets/img2.png";
import Teachers from "../../../assets/img3.png";
import { deleteSubject } from "../../../redux/subjectRelated/subjectHandle";
import { deleteStudent } from "../../../redux/studentRelated/studentHandle";
import { deleteTeacher } from "../../../redux/teacherRelated/teacherHandle";
import Loader from "../../../components/Loader";
const ClassDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    subjectsList,
    sclassStudents,
    sclassDetails,
    loading,
    error,
    response,
    getresponse,
    teacherList,
    getTeacherResponse,
  } = useSelector((state) => state.sclass);

  const classID = params.id;

  useEffect(() => {
    dispatch(getClassDetails(classID, "Sclass"));
    dispatch(getSubjectList(classID, "ClassSubjects"));
    dispatch(getTeacherList(classID));
    dispatch(getClassStudents(classID));
  }, [dispatch, classID]);

  if (error) {
    console.log(error);
  }

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const singleSubjectDeleteHandler = (id) => {
    dispatch(deleteSubject(id)).then(() => {
      dispatch(getSubjectList(classID, "ClassSubjects"));
    });
  };

  const deleteAllSubjectHandler = () => {
    dispatch(deleteAllSubjectbyClassId(classID)).then(() => {
      dispatch(getSubjectList(classID, "ClassSubjects"));
    });
  };

  const singleStudentDeleteHandler = (id) => {
    dispatch(deleteStudent(id)).then(() => {
      dispatch(getClassStudents(classID));
    });
  };

  const deleteAllStudentHandler = () => {
    dispatch(deleteAllStudentbyClassId(classID)).then(() => {
      dispatch(getClassStudents(classID));
    });
  };

  const singleTeacherDeleteHandler = (id) => {
    dispatch(deleteTeacher(id)).then(() => {
      dispatch(getTeacherList(classID));
    });
  };

  const deleteAllTeacherHandler = () => {
    dispatch(deleteAllTeacherbyClassId(classID)).then(() => {
      dispatch(getTeacherList(classID));
    });
  };
  const subjectColumns = [
    { id: "name", label: "Subject Name", minWidth: 170 },
    { id: "code", label: "Subject Code", minWidth: 100 },
  ];

  const subjectRows =
    Array.isArray(subjectsList) &&
    subjectsList.length > 0 &&
    subjectsList.map((subject) => {
      return {
        name: subject?.subName,
        code: subject?.subCode,
        id: subject?._id,
      };
    });

  const SubjectsButtonHaver = ({ row }) => {
    return (
      <>
        <IconButton
          sx={{ mr: 2 }}
          onClick={() => singleSubjectDeleteHandler(row.id)}
        >
          <DeleteIcon color="error" />
        </IconButton>
        <BlueButton
          variant="contained"
          sx={{ mr: 2 }}
          onClick={() => {
            navigate(`/Admin/class/subject/${classID}/${row.id}`);
          }}
        >
          View
        </BlueButton>
      </>
    );
  };

  const subjectActions = [
    {
      icon: <PostAddIcon color="primary" />,
      name: "Add New Subject",
      action: () => navigate("/Admin/addsubject/" + classID),
    },
    {
      icon: <DeleteIcon color="error" />,
      name: "Delete All Subjects",
      action: () => deleteAllSubjectHandler(classID, "SubjectsClass"),
    },
  ];

  const ClassSubjectsSection = () => {
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
            <Typography variant="h2">Subjects</Typography>
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
          {subjectsList.length === 0 ? (
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
                <h3>No Subjects Added </h3>
              </Paper>
            </Box>
          ) : (
            <>
              <Paper sx={{ width: "100%", overflow: "hidden", p: 2, m: 2 }}>
                <TableTemplate
                  buttonHaver={SubjectsButtonHaver}
                  columns={subjectColumns}
                  rows={subjectRows}
                />
                <SpeedDialTemplate actions={subjectActions} />
              </Paper>
            </>
          )}
        </Box>
      </>
    );
  };

  const studentColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "rollNum", label: "Roll Number", minWidth: 100 },
  ];

  const studentRows =
    Array.isArray(sclassStudents) &&
    sclassStudents.map((student) => {
      return {
        name: student.name,
        rollNum: student.rollNum,
        id: student._id,
      };
    });

  const StudentsButtonHaver = ({ row }) => {
    return (
      <>
        <IconButton
          sx={{ mr: 2 }}
          onClick={() => singleStudentDeleteHandler(row.id)}
        >
          <PersonRemoveIcon color="error" />
        </IconButton>
        <BlueButton
          sx={{ mr: 2 }}
          variant="contained"
          onClick={() => navigate("/Admin/students/student/" + row.id)}
        >
          View
        </BlueButton>
        <PurpleButton
          sx={{ mr: 2 }}
          variant="contained"
          onClick={() =>
            navigate("/Admin/students/student/attendance/" + row.id)
          }
        >
          Attendance
        </PurpleButton>
      </>
    );
  };

  const studentActions = [
    {
      icon: <PersonAddAlt1Icon color="primary" />,
      name: "Add New Student",
      action: () => navigate("/Admin/class/addstudents/" + classID),
    },
    {
      icon: <PersonRemoveIcon color="error" />,
      name: "Delete All Students",
      action: () => deleteAllStudentHandler(),
    },
  ];

  const ClassStudentsSection = () => {
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
            <Typography variant="h2">Students</Typography>
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
          {getresponse ? (
            <>
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
                  onClick={() =>
                    navigate("/Admin/class/addstudents/" + classID)
                  }
                  sx={{
                    width: "fit-content",
                  }}
                >
                  Add Students
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
                  <h3>No Students Added </h3>
                </Paper>
              </Box>
            </>
          ) : (
            <>
              <Paper sx={{ width: "100%", overflow: "hidden", p: 2, m: 2 }}>
                <TableTemplate
                  buttonHaver={StudentsButtonHaver}
                  columns={studentColumns}
                  rows={studentRows}
                />
                <SpeedDialTemplate actions={studentActions} />
              </Paper>
            </>
          )}
        </Box>
      </>
    );
  };

  const teacherColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 170 },
    { id: "subject", label: "Subject", minWidth: 100 },
  ];

  const teacherRows =
    Array.isArray(teacherList) &&
    teacherList.length > 0 &&
    teacherList.map((teacher) => {
      return {
        name: teacher.name,
        email: teacher.email,
        subject: teacher.teachSubject?.subName,
        id: teacher._id,
      };
    });

  const TeacherButtonHaver = ({ row }) => {
    return (
      <>
        <IconButton
          sx={{ mr: 2 }}
          onClick={() => singleTeacherDeleteHandler(row.id)}
        >
          <DeleteIcon color="error" />
        </IconButton>
        <BlueButton
          variant="contained"
          sx={{ mr: 2 }}
          onClick={() => {
            navigate(`/Admin/teachers/teacher/${row.id}`);
          }}
        >
          View
        </BlueButton>
      </>
    );
  };

  const teacherActions = [
    {
      icon: <PersonAddAlt1Icon color="primary" />,
      name: "Add New Teacher",
      action: () => navigate("/Admin/teachers/choosesubject/" + classID),
    },
    {
      icon: <PersonRemoveIcon color="error" />,
      name: "Delete All Teachers",
      action: () => deleteAllTeacherHandler(),
    },
  ];

  const ClassTeachersSection = () => {
    return (
      <>
        <Box
          sx={{
            zIndex: 0,
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
          {getTeacherResponse ? (
            <>
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
                  onClick={() =>
                    navigate("/Admin/teachers/choosesubject/" + classID)
                  }
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
                  <h3>No Teachers Added </h3>
                </Paper>
              </Box>
            </>
          ) : (
            <>
              <Paper sx={{ width: "100%", overflow: "hidden", p: 2, m: 2 }}>
                {Array.isArray(teacherList) && teacherList.length > 0 && (
                  <TableTemplate
                    buttonHaver={TeacherButtonHaver}
                    columns={teacherColumns}
                    rows={teacherRows}
                  />
                )}
                <SpeedDialTemplate actions={teacherActions} />
              </Paper>
            </>
          )}
        </Box>
      </>
    );
  };

  const ClassDetailsSection = () => {
    const numberOfTeacher = teacherList.length;
    const numberOfSubjects = subjectsList.length;
    const numberOfStudents = sclassStudents.length;

    return (
      <>
        <Box
          sx={{
            width: "100%",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              marin: "auto",
              m: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h2">
              {sclassDetails && sclassDetails.sclassName}
            </Typography>
            <Divider
              variant="middle"
              orientation="horizontal"
              sx={{
                width: "280px",
                borderBottomWidth: "5px",
                color: "black",
              }}
            />
          </Box>
          <Box>
            <Box
              sx={{
                height: "fit-content",
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                p: 2,
              }}
            >
              <Grid item xs={12} md={3} lg={3}>
                <StyledPaper>
                  <img src={Students} alt="Students" />
                  <Title>Total Students</Title>
                  <Data start={0} end={numberOfStudents} duration={2.5} />
                </StyledPaper>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <StyledPaper>
                  <img src={Classes} alt="Classes" />
                  <Title>Total Subjects</Title>
                  <Data start={0} end={numberOfSubjects} duration={5} />
                </StyledPaper>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <StyledPaper>
                  <img src={Teachers} alt="Classes" />
                  <Title>Total Teachers</Title>
                  <Data start={0} end={numberOfTeacher} duration={5} />
                </StyledPaper>
              </Grid>
            </Box>

            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sx={{
                padding: "0px !important",
                marginTop: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {getresponse && (
                <Box sx={{ marginRight: "10px" }}>
                  <GreenButton
                    variant="contained"
                    onClick={() =>
                      navigate("/Admin/class/addstudents/" + classID)
                    }
                  >
                    Add Students
                  </GreenButton>
                </Box>
              )}
              {response && (
                  <Box sx={{ marginLeft: "10px" }}>
                    <GreenButton
                      variant="contained"
                      onClick={() => navigate("/Admin/addsubject/" + classID)}
                    >
                      Add Subjects
                    </GreenButton>
                  </Box>
              )}
              {getTeacherResponse && (
                <Box sx={{ marginLeft: "10px" }}>
                  <GreenButton
                    variant="contained"
                    onClick={() =>
                      navigate("/Admin/teachers/choosesubject/" + classID)
                    }
                  >
                    Add Teachers
                  </GreenButton>
                </Box>
              )}
            </Grid>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <>
      {loading ? (
        <Loader/>
      ) : (
        <>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  sx={{
                    position: "fixed",
                    width: "100%",
                    bgcolor: "background.paper",
                    zIndex: 1,
                  }}
                >
                  <Tab label="Details" value="1" />
                  <Tab label="Subjects" value="2" />
                  <Tab label="Students" value="3" />
                  <Tab label="Teachers" value="4" />
                </TabList>
              </Box>
              <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                <TabPanel value="1">
                  <ClassDetailsSection />
                </TabPanel>
                <TabPanel value="2">
                  <ClassSubjectsSection />
                </TabPanel>
                <TabPanel value="3">
                  <ClassStudentsSection />
                </TabPanel>
                <TabPanel value="4">
                  <ClassTeachersSection />
                </TabPanel>
              </Container>
            </TabContext>
          </Box>
        </>
      )}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  width: 300px;
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
export default ClassDetails;
