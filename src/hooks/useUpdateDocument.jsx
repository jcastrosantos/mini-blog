import { useReducer } from "react";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};
const updateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const useUpdateDocument = (docCollection) => {
  const [response, dispatch] = useReducer(updateReducer, initialState);

  const updateDocument = async (id, data) => {
    dispatch({ type: "LOADING" });
    let active = true;
    try {
      const docRef = await doc(db, docCollection, id);
      const updateDocument = await updateDoc(docRef, data);

      if (active) {
        dispatch({
          type: "UPDATED_DOC",
          payload: updateDocument,
        });
      }
    } catch (error) {
      if (active) {
        dispatch({
          type: "ERROR",
          payload: error.message,
        });
      }
    }
  };

  return {
    updateDocument,
    response,
  };
};
