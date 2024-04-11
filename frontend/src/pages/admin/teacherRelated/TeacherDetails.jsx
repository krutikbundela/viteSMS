import { useEffect } from "react";
import { getTeacherDetails } from "../../../redux/teacherRelated/teacherHandle";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Divider,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import Loader from "../../../components/Loader";

const TeacherDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, teacherDetails, error } = useSelector(
    (state) => state.teacher
  );

  const teacherID = params.id;

  useEffect(() => {
    dispatch(getTeacherDetails(teacherID));
  }, [dispatch, teacherID]);

  if (error) {
    console.log(error);
  }

  const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

  const handleAddSubject = () => {
    navigate(
      `/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`
    );
  };

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
          <Typography variant="h2">Teacher Details</Typography>
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
          <Loader />
        ) : (
          // <Container>
          <Paper
            sx={{
              padding: 2,
              marginTop: "20px",
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Teacher Name: {teacherDetails?.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Class Name: {teacherDetails?.teachSclass?.sclassName}
            </Typography>
            {isSubjectNamePresent ? (
              <>
                <Typography variant="h6" gutterBottom>
                  Subject Name: {teacherDetails?.teachSubject?.subName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Subject Sessions: {teacherDetails?.teachSubject?.sessions}
                </Typography>
              </>
            ) : (
              <Button
                sx={{ m: 2 }}
                variant="contained"
                onClick={handleAddSubject}
              >
                Add Subject
              </Button>
            )}
          </Paper>
          // </Container>
        )}
      </Box>
    </>
  );
};

export default TeacherDetails;
