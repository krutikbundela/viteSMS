import axios from "axios";
import { getRequest, getSuccess, getFailed, getError } from "./subjectSlice";
const REACT_APP_BASE_URL = "http://localhost:5000";


export const deleteSubject = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.delete(`${REACT_APP_BASE_URL}/Subject/${id}`);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const deleteAllSubject = (id, address) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.delete(`${REACT_APP_BASE_URL}/${address}/${id}`);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};