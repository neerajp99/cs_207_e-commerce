// adding berer tokens as headers
import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // if token is available, add it to all the requests
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete the authorization header
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;
