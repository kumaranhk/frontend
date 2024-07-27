import axios from "axios";
import constants from "../../constants/constants";

// const URL = import.meta.env.BACK_END_URL;
const URL = constants.URL;

const createUser = async (data) => {
    try {
        let res = await axios.post(`${URL}/users/create-user`, data);
        console.log(URL, "sdhjha");
        return await res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const validateUser = async (obj) => {
    try {
        // console.log(URL, "sdhjha");
        let res = await axios.post(`${URL}/users/validate-user`, obj);
        console.log(await res.data);
        return await res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export { createUser, validateUser };