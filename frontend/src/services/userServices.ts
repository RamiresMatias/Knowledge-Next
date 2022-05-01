import axios from "axios";
import { BASE_URL } from "../utils/utils";

const BASE_URL_USER = `${BASE_URL}/validateToken`

function validateToken(token: string) {
    return axios.post(BASE_URL_USER)
}

export default { validateToken }