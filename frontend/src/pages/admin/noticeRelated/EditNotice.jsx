import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import Popup from "../../../components/Popup";
import {
  getNotice,
  updateNotice,
} from "../../../redux/noticeRelated/noticeHandle";

const EditNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { noticeId } = useParams();
  const {
    title: noticesListTitle,
    details: noticesListDetails,
    date: noticesListDate,
    success,
    error: errorMsg,
  } = useSelector((state) => state.notice.noticesList);

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const fields = { title, details, date };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(updateNotice(noticeId, fields));
  };

  useEffect(() => {
    dispatch(getNotice(noticeId)).then(() => {
      if (noticesListTitle) setTitle(noticesListTitle);
      if (noticesListDetails) setDetails(noticesListDetails);
      if (noticesListDate) {
        const date = new Date(noticesListDate);
        const dateString =
          date.toString() !== "Invalid Date"
            ? date.toISOString().substring(0, 10)
            : "Invalid Date";
        setDate(dateString);
      }
    });
  }, [
    dispatch,
    noticeId,
    noticesListTitle,
    noticesListDetails,
    noticesListDate,
  ]);

  useEffect(() => {
    if (success) {
      setShowPopup(true);
      navigate("/Admin/notices");
    }
    if (errorMsg) {
      setShowPopup(true);
      console.error("Error:", errorMsg); // Log the error message
    }
    setLoader(false);
  }, [success, errorMsg, navigate]);

  return (
    <>
      <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="registerTitle">Edit Notice</span>
          <label>Title</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter notice title..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <label>Details</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter notice details..."
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            required
          />

          <label>Date</label>
          <input
            className="registerInput"
            type="date"
            placeholder="Enter notice date..."
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />

          <button className="registerButton" type="submit" disabled={loader}>
            {loader ? <CircularProgress size={24} color="inherit" /> : "Edit"}
          </button>
        </form>
      </div>
      <Popup
        message={errorMsg}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default EditNotice;
