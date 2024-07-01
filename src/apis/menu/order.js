import axios from "axios";
import constants from "../../constants/constants";

const URL = `${constants.URL}/orders`

const makeOrder = async ({ data, access_token }) => {
    const res = await axios.post(`${URL}/create-order`, data, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
    return res.data;
}
const getOrders = async ({ access_token }) => {
    const res = await axios.get(`${URL}/`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
    return res.data;

}

export { makeOrder, getOrders }