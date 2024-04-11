import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography, Divider, Paper } from "@mui/material";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import { useNavigate } from "react-router-dom";
import { PurpleButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import { BlueButton, GreenButton } from "../../../components/buttonStyles";
import Loader from "../../../components/Loader";
const ChooseClass = ({ situation }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector(
    (state) => state.sclass
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllSclasses(currentUser._id, "Sclass"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const navigateHandler = (classID) => {
    if (situation === "Teacher") {
      navigate("/Admin/teachers/choosesubject/" + classID);
    } else if (situation === "Subject") {
      navigate("/Admin/addsubject/" + classID);
    }
  };

  const sclassColumns = [{ id: "name", label: "Class Name", minWidth: 170 }];

  const sclassRows =
    sclassesList &&
    sclassesList.length > 0 &&
    sclassesList.map((sclass) => {
      return {
        name: sclass.sclassName,
        id: sclass._id,
      };
    });

  const SclassButtonHaver = ({ row }) => {
    return (
      <>
        <PurpleButton
          variant="contained"
          onClick={() => navigateHandler(row.id)}
        >
          Choose
        </PurpleButton>
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
          <Typography variant="h2">Choose A Class</Typography>
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
            {getresponse ? (
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
                  onClick={() => navigate("/Admin/addclass")}
                  sx={{
                    width: "fit-content",
                  }}
                >
                  Add Class
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
                  <h3>No Class Added </h3>
                </Paper>
              </Box>
            ) : (
              <>
                <Paper sx={{ width: "90%", overflow: "hidden", p: 2, m: 2 }}>
                  {Array.isArray(sclassesList) && sclassesList.length > 0 && (
                    <TableTemplate
                      buttonHaver={SclassButtonHaver}
                      columns={sclassColumns}
                      rows={sclassRows}
                    />
                  )}
                </Paper>
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default ChooseClass;
