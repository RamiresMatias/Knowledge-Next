import axios from "axios";
import { BASE_URL } from "../utils/utils";

function listCategories() {
    return axios.get(`${BASE_URL}/category`)
}

function getTree() {
    return axios.get(`${BASE_URL}/category/tree`)
}

export default { listCategories, getTree }