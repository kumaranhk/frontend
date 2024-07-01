import axios from "axios";
import constants from "../../constants/constants";

const URL = `${constants.URL}/products`;

const getProducts = async ({ id = null, access_token }) => {
    if (id) {
        const res = await axios.get(`${URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        return res.data;
    }
    const res = await axios.get(`${URL}`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
    return res.data;
}
const createProduct = async ({ data, access_token }) => {
    const res = await axios.post(`${URL}/create-product`, data, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
    return res.data;
}
const deleteProduct = async ({ id, access_token }) => {
    const res = await axios.delete(`${URL}/${id}`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
    return res.data;
}
export { getProducts, createProduct, deleteProduct };