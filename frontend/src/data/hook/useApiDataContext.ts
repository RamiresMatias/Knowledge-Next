import { useContext } from "react";
import ApiDataContext from "../context/ApiDataContext";

const useApiDataContext = () => useContext(ApiDataContext)

export default useApiDataContext