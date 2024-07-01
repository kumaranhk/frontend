import axios from "axios";
import constants from "../../constants/constants";

const URL = `${constants.URL}/users/customer-users`

const getUsers = async ({ customerId, id = undefined, access_token }) => {
    if (id) {
        const res = await axios.get(`${URL}/${id}`, {
            params: {
                customerId
            }
        }, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });
        // console.log(res.data);
        return res.data;

    }
    const res = await axios.get(`${URL}?customerId=${customerId}`, {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    });
    // console.log(res.data);
    return res.data;
}

const deleteUser = async ({ id, access_token }) => {
    const res = await axios.delete(`${URL}/${id}`, {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    });
    return res.data;
}
const createUser = async ({ obj, access_token }) => {
    const res = await axios.post(`${constants.URL}/users/create-user`, obj, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
    return res.data;
}
const editUser = async ({ id, obj, access_token }) => {
    const res = await axios.put(`${URL}/edit-user/${id}`, obj, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
    return res.data
}
export { getUsers, deleteUser, createUser, editUser };