import React, { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateUser } from "../../redux/userRelated/userHandle";
import { useNavigate } from "react-router-dom";
import { authLogout } from "../../redux/userRelated/userSlice";
import {
  Button,
  Collapse,
  Box,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import ConfirmationModal from "./ConfirmationModal";

const AdminProfile = () => {
  // const { currentUser } = useSelector((state) => state.user);

  const [showTab, setShowTab] = useState(false);
  const buttonText = showTab ? "Cancel" : "Edit profile";
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, response, error } = useSelector((state) => state.user);
  const address = "Admin";

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState("");
  const [schoolName, setSchoolName] = useState(currentUser.schoolName);

  const fields =
    password === ""
      ? { name, email, schoolName }
      : { name, email, password, schoolName };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateUser(fields, currentUser._id, address));
  };

  const handleDeleteConfirmation = () => {
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    dispatch(deleteUser(currentUser._id, address));
    dispatch(authLogout());
    navigate("/");
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div>
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
          <Typography variant="subtitle1" sx={{ m: 1 }}>
            Name: {currentUser.name}{" "}
          </Typography>
          <Typography variant="subtitle1" sx={{ m: 1 }}>
            Email: {currentUser.email}{" "}
          </Typography>
          <Typography variant="subtitle1" sx={{ m: 1 }}>
            School: {currentUser.schoolName}
          </Typography>
        </Paper>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteConfirmation}
          sx={{ m: 2 }}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          onClick={() => setShowTab(!showTab)}
          sx={{ m: 2 }}
        >
          {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          {buttonText}
        </Button>
        <ConfirmationModal
          open={showDeleteModal}
          handleClose={handleCloseDeleteModal}
          handleConfirm={handleDelete}
          message="Are you sure you want to delete your admin profile? This will lead to the loss of all student data, class data, and teacher data."
        />
      </Box>

      <Collapse in={showTab} timeout="auto" unmountOnExit>
        <div className="register">
          <form className="registerForm" onSubmit={submitHandler}>
            <span className="registerTitle">Edit Details</span>
            <label>Name</label>
            <input
              className="registerInput"
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              required
            />

            <label>School</label>
            <input
              className="registerInput"
              type="text"
              placeholder="Enter your school name..."
              value={schoolName}
              onChange={(event) => setSchoolName(event.target.value)}
              autoComplete="name"
              required
            />

            <label>Email</label>
            <input
              className="registerInput"
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />

            <label>Password</label>
            <input
              className="registerInput"
              type="password"
              placeholder="Enter your password..."
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
            />

            <button className="registerButton" type="submit">
              Update
            </button>
          </form>
        </div>
      </Collapse>
    </div>
  );
};

export default AdminProfile;
