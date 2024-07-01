import axios from "axios"
import constants from "../../constants/constants"

const URL = `${constants.URL}/vendors`;
const getVendors = async ({id = undefined, access_token = null}) => {
    if (id) {
        const res = await axios.get(`${URL}/${id}`, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });
        console.log(res.data);
        return res.data;

    }
    const res = await axios.get(`${URL}`, {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    });
    console.log(res.data);
    return res.data;
}

const deleteVendor = async ({ id, access_token }) => {
    const res = await axios.delete(`${URL}/${id}`, {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    });
    return res.data;
}
const createVendor = async ({ obj, access_token }) => {
    const res = await axios.post(`${URL}/create-vendor`, obj, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
    return res.data;
}
const editVendor = async ({ id, obj, access_token }) => {
    const res = await axios.put(`${URL}/edit-vendor/${id}`, obj, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
    return res.data
}
export { getVendors, deleteVendor, createVendor, editVendor };