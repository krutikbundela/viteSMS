import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStuff } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import Popup from "../../../components/Popup";

const SubjectForm = () => {
  const [subjects, setSubjects] = useState([
    { subName: "", subCode: "", sessions: "" },
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const userState = useSelector((state) => state.user);
  const { status, currentUser, response, error } = userState;

  const sclassName = params.id;
  const adminID = currentUser._id;
  const address = "Subject";

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubjectNameChange = (index) => (event) => {
    const newSubjects = [...subjects];
    newSubjects[index].subName = event.target.value;
    setSubjects(newSubjects);
  };

  const handleSubjectCodeChange = (index) => (event) => {
    const newSubjects = [...subjects];
    newSubjects[index].subCode = event.target.value;
    setSubjects(newSubjects);
  };

  const handleSessionsChange = (index) => (event) => {
    const newSubjects = [...subjects];
    newSubjects[index].sessions = event.target.value || 0;
    setSubjects(newSubjects);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { subName: "", subCode: "", sessions: "" }]);
  };

  const handleRemoveSubject = (index) => () => {
    const newSubjects = [...subjects];
    newSubjects.splice(index, 1);
    setSubjects(newSubjects);
  };

  const fields = {
    sclassName,
    subjects: subjects.map((subject) => ({
      subName: subject.subName,
      subCode: subject.subCode,
      sessions: subject.sessions,
    })),
    adminID,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === "added") {
      navigate("/Admin/subjects");
      dispatch(underControl());
      setLoader(false);
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

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
        <Typography variant="h2">Add Subjects</Typography>
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
      <form onSubmit={submitHandler} style={{ width: "100%" }}>
        <Box
          sx={{
            mt: 5,
            padding: "0px 20%",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {subjects.map((subject, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sx={{ m: 2 }}>
                  <TextField
                    fullWidth
                    label="Subject Name"
                    variant="outlined"
                    value={subject.subName}
                    onChange={handleSubjectNameChange(index)}
                    sx={styles.inputField}
                    required
                  />
                </Grid>
                <Grid item xs={12} sx={{ m: 2 }}>
                  <TextField
                    fullWidth
                    label="Subject Code"
                    variant="outlined"
                    value={subject.subCode}
                    onChange={handleSubjectCodeChange(index)}
                    sx={styles.inputField}
                    required
                  />
                </Grid>
                <Grid item xs={12}  sx={{ m: 2 }}>
                  <TextField
                    fullWidth
                    label="Sessions"
                    variant="outlined"
                    type="number"
                    inputProps={{ min: 0 }}
                    value={subject.sessions}
                    onChange={handleSessionsChange(index)}
                    sx={styles.inputField}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems={"center"}
                  >
                    {index === 0 ? (
                      <Box></Box>
                    ) : (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleRemoveSubject(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </Box>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems={"center"}
                sx={{ m: 2 }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleAddSubject}
                  sx={{ mr: 2 }}
                >
                  Add Subject
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loader}
                >
                  {loader ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </Box>
            </Grid>
            <Popup
              message={message}
              setShowPopup={setShowPopup}
              showPopup={showPopup}
            />
          </Grid>
        </Box>
      </form>
    </Box>
  );
};

export default SubjectForm;

const styles = {
  inputField: {
    "& .MuiInputLabel-root": {
      color: "#838080",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#838080",
    },
  },
};
