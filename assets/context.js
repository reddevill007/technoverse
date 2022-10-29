import React, { useEffect, useContext, useReducer } from "react";
import reducer from "./reducer";

const AppContext = React.createContext();

let API = "https://hn.algolia.com/api/v1/search?";

const initialState = {
  isLoading: true,
  query: "HTML",
  nbPages: 0,
  page: 0,
  hits: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchApiData = async (url) => {
    dispatch({ type: "SET_LOADING" });

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      dispatch({
        type: "GET_STORIES",
        payload: {
          hits: data.hits,
          nbPages: data.nbPages,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removePost = (post_id) => {
    dispatch({ type: "REMOVE_POST", payload: post_id });
  };

  useEffect(() => {
    fetchApiData(`${API}query=${state.query}`);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, removePost }}>
      {children}
    </AppContext.Provider>
  );
};

// custom hook

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
