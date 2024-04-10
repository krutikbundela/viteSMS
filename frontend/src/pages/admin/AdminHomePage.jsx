import {
  Container,
  Grid,
  Paper,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import SeeNotice from "../../components/SeeNotice";
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import styled from "styled-components";
import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSclasses } from "../../redux/sclassRelated/sclassHandle";
import { getAllStudents } from "../../redux/studentRelated/studentHandle";
import { getAllTeachers } from "../../redux/teacherRelated/teacherHandle";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const { studentsList } = useSelector((state) => state.student);
  const { sclassesList } = useSelector((state) => state.sclass);
  const { teachersList } = useSelector((state) => state.teacher);

  const { currentUser } = useSelector((state) => state.user);

  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllStudents(adminID));
    dispatch(getAllSclasses(adminID, "Sclass"));
    dispatch(getAllTeachers(adminID));
  }, [adminID, dispatch]);

  const numberOfStudents = studentsList && studentsList.length;
  const numberOfClasses = sclassesList && sclassesList.length;
  const numberOfTeachers = teachersList && teachersList.length;

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
          <Typography variant="h2">{currentUser.schoolName}</Typography>
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

        <Container maxWidth="lg" sx={{ mt: 7, mb: 4 }}>
          <Grid container spacing={3}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
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
                  <Title>Total Classes</Title>
                  <Data start={0} end={numberOfClasses} duration={5} />
                </StyledPaper>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <StyledPaper>
                  <img src={Teachers} alt="Teachers" />
                  <Title>Total Teachers</Title>
                  <Data start={0} end={numberOfTeachers} duration={2.5} />
                </StyledPaper>
              </Grid>
            </Box>
            {/* <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Fees} alt="Fees" />
                            <Title>
                                Fees Collection
                            </Title>
                            <Data start={0} end={23000} duration={2.5} prefix="$" />                        </StyledPaper>
                    </Grid> */}
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sx={{ padding: "0px !important", marginTop: "50px" }}
            >
              <Paper
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SeeNotice />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
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

export default AdminHomePage;
