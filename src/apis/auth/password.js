import axios from "axios";
import constants from "../../constants/constants";

// const URL = import.meta.env.URL;
const URL = constants.URL;

const requirePassWordChnage = async (obj) => {
    try {
        let res = await axios.post(`${URL}/users/require-change-password`, obj);
        // console.log(await res.data, "hello");
        return await res.data;
    } catch (error) {
        console.log(error);
    }
}

const createNewPassword = async (obj) => {
    // console.log(`${URL}/users/create-password`, "helooo");
    try {
        let res = await axios.put(`${URL}/users/create-password`, obj)
        return await res.data;
    } catch (error) {
        console.log(error);
    }
}

export { requirePassWordChnage, createNewPassword };