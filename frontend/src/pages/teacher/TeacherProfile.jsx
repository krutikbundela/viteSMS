import {
  Box,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const teachSclass = currentUser.teachSclass;
  const teachSubject = currentUser.teachSubject;
  const teachSchool = currentUser.school;

  return (
    <>
      <Box
        sx={{
          height: "40vh",
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
          <Typography variant="h2">Profile</Typography>
          <Divider
            variant="middle"
            orientation="horizontal"
            sx={{ width: "90%", borderBottomWidth: "5px", color: "black" }}
          />
        </Box>

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
              <Typography>Name: {currentUser.name}</Typography>
              <Typography>Email: {currentUser.email}</Typography>
              <Typography>Class: {teachSclass.sclassName}</Typography>
              <Typography>Subject: {teachSubject.subName}</Typography>
              <Typography>School: {teachSchool.schoolName}</Typography>
        </Paper>
      </Box>
    </>
  );
};

export default TeacherProfile;
