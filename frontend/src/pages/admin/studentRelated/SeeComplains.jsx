import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Box,IconButton, Typography, Divider } from "@mui/material";
import { deleteComplain, getAllComplains } from "../../../redux/complainRelated/complainHandle";
import TableTemplate from "../../../components/TableTemplate";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../../components/Loader";

const SeeComplains = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector(
    (state) => state.complain
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

    const deleteHandler = (deleteID, address) => {
      dispatch(deleteComplain(deleteID, address)).then(() => {
        dispatch(getAllComplains(currentUser._id, "Complain"));
      });
    };

  const complainColumns = [
    { id: "user", label: "User", minWidth: 170 },
    { id: "complaint", label: "Complaint", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 170 },
  ];

  const complainRows =
    complainsList &&
    complainsList.length > 0 &&
    complainsList.map((complain) => {
      const date = new Date(complain.date);
      const dateString =
        date.toString() !== "Invalid Date"
          ? date.toISOString().substring(0, 10)
          : "Invalid Date";
      return {
        user: complain.user.name,
        complaint: complain.complaint,
        date: dateString,
        id: complain._id,
      };
    });

  const ComplainButtonHaver = ({ row }) => {
    return (
      <>
        {/* <IconButton onClick={() => navigate(`/Admin/editnotice/${row.id}`)}>
          <EditNoteIcon color="success" />
        </IconButton> */}
        <IconButton onClick={() => deleteHandler(row.id, "Complain")}>
          <DeleteIcon color="error" />
        </IconButton>
      </>
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
          <Typography variant="h2">Complaints</Typography>
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
                  <h3>No Complains Right Now </h3>
                </Paper>
              </Box>
            ) : (
              <Paper sx={{ width: "90%", overflow: "hidden", p: 2, m: 2 }}>
                {Array.isArray(complainsList) && complainsList.length > 0 && (
                  <TableTemplate
                    buttonHaver={ComplainButtonHaver}
                    columns={complainColumns}
                    rows={complainRows}
                  />
                )}
              </Paper>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default SeeComplains;
