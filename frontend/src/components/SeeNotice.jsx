import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotices } from "../redux/noticeRelated/noticeHandle";
import { Paper, Box, Typography, Divider } from "@mui/material";
import TableViewTemplate from "./TableViewTemplate";
import Loader from "./Loader";

const SeeNotice = () => {
  const dispatch = useDispatch();

  const { currentUser, currentRole } = useSelector((state) => state.user);
  const { noticesList, loading, error, response } = useSelector(
    (state) => state.notice
  );

  useEffect(() => {
    if (currentRole === "Admin") {
      dispatch(getAllNotices(currentUser._id, "Notice"));
    } else {
      dispatch(getAllNotices(currentUser.school._id, "Notice"));
    }
  }, [dispatch]);

  if (error) {
    console.log(error);
  }

  const noticeColumns = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "details", label: "Details", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 170 },
  ];

  const noticeRows = noticesList.map((notice) => {
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
  return (
    <Box
      sx={{
        width: "100%",
        height: "fit-content",
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
        <Loader/>
      ) : response ? (
        <div style={{ fontSize: "30px" }}>No Notices to Show Right Now</div>
      ) : (
        <>
          <Paper sx={{ width: "90%", overflow: "hidden", p: 2, m: 2 }}>
            {Array.isArray(noticesList) && noticesList.length > 0 && (
              <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
            )}
          </Paper>
        </>
      )}
    </Box>
  );
};

export default SeeNotice;
