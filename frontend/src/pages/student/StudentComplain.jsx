import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import Popup from "../../components/Popup";
import { BlueButton } from "../../components/buttonStyles";
import { addStuff } from "../../redux/userRelated/userHandle";
import { useDispatch, useSelector } from "react-redux";

const StudentComplain = () => {
  const [complaint, setComplaint] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const { status, currentUser, error } = useSelector((state) => state.user);

  const user = currentUser._id;
  const school = currentUser.school._id;
  const address = "Complain";

  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const fields = {
    user,
    date,
    complaint,
    school,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === "added") {
      setLoader(false);
      setShowPopup(true);
      setMessage("Done Successfully");
    } else if (error) {
      setLoader(false);
      setShowPopup(true);
      setMessage("Network Error");
    }
  }, [status, error]);

  return (
    <>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
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
            <Typography variant="h2">Complain</Typography>
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
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <form onSubmit={submitHandler}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Select Date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  label="Write your complain"
                  variant="outlined"
                  value={complaint}
                  onChange={(event) => {
                    setComplaint(event.target.value);
                  }}
                  required
                  multiline
                  maxRows={4}
                />
              </Stack>
              <BlueButton
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                variant="contained"
                type="submit"
                disabled={loader}
              >
                {loader ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Add"
                )}
              </BlueButton>
            </form>
          </div>
        </Box>
      </Box>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default StudentComplain;
