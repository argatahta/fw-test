import axios from "axios";

import { baseUrl } from "./endpoints";

const serverLogin = ({email, password}) => new Promise((resolve, reject)=>{
    return axios.post(`${baseUrl}/user/login`, {email, password})
    .then(response => {
        const result = response.data;
        resolve({
            meta: {
                status: "success",
                error: '',
            },
            data: result || {},
        })
    })
    .catch(error => {
        const errorData = error?.response?.data ?? {}
        reject(errorData)
    })
})

const clientLogin = (email, password) => new Promise((resolve, reject) => {
    return axios.get(`/api/login?email=${email}&password=${password}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            const result = response.data
            resolve({
                meta: {
                    status: "success",
                    error: '',
                },
                data: result || [],
            })
        })
        .catch(error => {
            const errorData = error?.response?.data ?? {}
            reject(errorData)
        })
});

const getUsersServer = (token, page) => new Promise((resolve, reject)=> {
    return axios.get(`${baseUrl}/user?page=${page}&limit=100`, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        }
    })
    .then(response => {
        const result = response?.data?.data
        resolve({
            meta: {
                status: "success",
                error: '',
            },
            data: result || [],
        })
    })
    .catch(error => {
        const errorData = error?.response?.data ?? {}
        reject(errorData)
    })
})

const getUsersClient = (token, page) => new Promise((resolve, reject) => {
    return axios.get(`api/user?token=${token}&page=${page}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        const result = response.data
        resolve({
            meta: {
                status: "success",
                error: '',
            },
            data: result || [],
        })
    })
    .catch(error => {
        const errorData = error?.response?.data ?? {}
        reject(errorData)
    })
})

const createUserServer = (token, payload) => new Promise((resolve, reject)=> {
    return axios.post(`${baseUrl}/user/create`, payload, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        }
    })
    .then(response => {
        const result = response.data;
        resolve({
            meta: {
                status: "success",
                error: '',
            },
            data: result || {},
        })
    })
    .catch(error => {
        const errorData = error?.response?.data ?? {}
        reject(errorData)
    })
})

const createUserClient = (token, payload) => new Promise((resolve, reject) => {
    return axios.get(`/api/createUser?token=${token}&payload=${payload}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            const result = response.data
            resolve({
                meta: {
                    status: "success",
                    error: '',
                },
                data: result || [],
            })
        })
        .catch(error => {
            const errorData = error?.response?.data ?? {}
            reject(errorData)
        })
});

const updateUserServer = (token, payload) => new Promise((resolve, reject)=> {
    return axios.put(`${baseUrl}/user`, payload, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        }
    })
    .then(response => {
        const result = response.data;
        resolve({
            meta: {
                status: "success",
                error: '',
            },
            data: result || {},
        })
    })
    .catch(error => {
        const errorData = error?.response?.data ?? {}
        reject(errorData)
    })
})

const updateUserClient = (token, payload) => new Promise((resolve, reject) => {
    return axios.get(`/api/updateUser?token=${token}&payload=${payload}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            const result = response.data
            resolve({
                meta: {
                    status: "success",
                    error: '',
                },
                data: result || [],
            })
        })
        .catch(error => {
            const errorData = error?.response?.data ?? {}
            reject(errorData)
        })
});

const deleteUserServer = (token, payload) => new Promise((resolve, reject)=> {
    return axios.delete(`${baseUrl}/user`, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        },
        data: payload
    })
    .then(response => {
        const result = response.data;
        resolve({
            meta: {
                status: "success",
                error: '',
            },
            data: result || {},
        })
    })
    .catch(error => {
        const errorData = error?.response?.data ?? {}
        reject(errorData)
    })
})

const deleteUserClient = (token, payload) => new Promise((resolve, reject) => {
    return axios.delete(`/api/deleteUser?token=${token}&payload=${payload}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            const result = response.data
            resolve({
                meta: {
                    status: "success",
                    error: '',
                },
                data: result || [],
            })
        })
        .catch(error => {
            const errorData = error?.response?.data ?? {}
            reject(errorData)
        })
});

export default {
    serverLogin,
    clientLogin,
    getUsersServer,
    getUsersClient,
    createUserServer,
    createUserClient,
    updateUserServer,
    updateUserClient,
    deleteUserClient,
    deleteUserServer
}