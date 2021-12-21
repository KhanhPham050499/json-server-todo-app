import axios from 'axios';

const BASE_URL = 'https://json-server-todo-app-demo.herokuapp.com/api'

export const getApi = async (url, params, cb, cbErr) => {
        try {
            const { data, status } = await axios.get(`${BASE_URL}/${url}`, {
                params: {
                    ...params,
                    '_sort': 'id',
                    '_order': 'desc',
                },

                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (status === 200) {
                cb(data);
            }
        } catch (error) {
            cbErr(error.message);
        }
}

export const postApi = async (url, params, cb, cbErr) => {
        try {
            const { data, status } = await axios.post(`${BASE_URL}/${url}`, params);
            if (status === 201) {
                cb(data);
            }
        } catch (error) {
            // if (error.response) {
            //     console.log(error.response.data);
            //     console.log(error.response.status);
            //     console.log(error.response.headers);
            //   }
            cbErr(error.message);
        }
}

export const putApi = async (url, params, cb, cbErr) => {
    try {
        const { data, status } = await axios.put(`${BASE_URL}/${url}`, params);
        if (status === 200) {
            cb(data);
        }
    } catch (error) {
        cbErr(error.message);
    }
}

export const deleteApi = async (url, params, cb, cbErr) => {
    try {
        const { data, status } = await axios.delete(`${BASE_URL}/${url}`, params);
        if (status === 200) {
            cb(data);
        }
    } catch (error) {
        cbErr(error.message);
    }
}