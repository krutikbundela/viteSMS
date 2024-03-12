import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Paper, Box, IconButton, Typography, Divider } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getAllNotices,
  deleteNotice,
} from "../../../redux/noticeRelated/noticeHandle";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import TableTemplate from "../../../components/TableTemplate";
import { GreenButton } from "../../../components/buttonStyles";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";

const ShowNotices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { noticesList, loading, error, response } = useSelector(
    (state) => state.notice
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllNotices(currentUser._id, "Notice"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const deleteHandler = (deleteID, address) => {
    dispatch(deleteNotice(deleteID, address)).then(() => {
      dispatch(getAllNotices(currentUser._id, "Notice"));
    });
  };

  const noticeColumns = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "details", label: "Details", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 170 },
  ];

  const noticeRows =
    noticesList &&
    noticesList.length > 0 &&
    noticesList.map((notice) => {
      const date = new Date(notice.date);
      const dateString =
        date.toString() !== "Invalid Date"
          ? date.toISOString().substring(0, 10)
          : "Invalid Date";
      return {
        title: notice.title,
        details: notice.details,
        date: dateString,
        id: notice._id,
      };
    });

  const NoticeButtonHaver = ({ row }) => {
    console.log("NoticeButtonHaver ~ row:", row.id);
    return (
      <>
        <IconButton onClick={() => deleteHandler(row.id, "Notice")}>
          <DeleteIcon color="error" />
        </IconButton>
      </>
    );
  };

  const actions = [
    {
      icon: <NoteAddIcon color="primary" />,
      name: "Add New Notice",
      action: () => navigate("/Admin/addnotice"),
    },
    {
      icon: <DeleteIcon color="error" />,
      name: "Delete All Notices",
      action: () => deleteHandler(currentUser._id, "Notices"),
    },
  ];

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
          <Typography variant="h2">Notice</Typography>
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
          <div>Loading...</div>
        ) : (
          <>
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
                <GreenButton
                  variant="contained"
                  onClick={() => navigate("/Admin/addnotice")}
                  sx={{
                    width: "10%",
                  }}
                >
                  Add Notice
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
                  <h3>No Notice Added </h3>
                </Paper>
              </Box>
            ) : (
              <Paper sx={{ width: "90%", overflow: "hidden", p: 2, m: 2 }}>
                {Array.isArray(noticesList) && noticesList.length > 0 && (
                  <TableTemplate
                    buttonHaver={NoticeButtonHaver}
                    columns={noticeColumns}
                    rows={noticeRows}
                  />
                )}
                <SpeedDialTemplate actions={actions} />
              </Paper>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default ShowNotices;
