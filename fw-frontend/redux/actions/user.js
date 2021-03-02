import { SAVE_ME_DATA, SAVE_USERS } from "../constants/types";

export const saveMe = (data = {}) => {
    return {
        type: SAVE_ME_DATA,
        payload: {
            me: data.user,
            token: data.token
        }
    }
}

export const saveUsersData  = (data = []) => ({
    type: SAVE_USERS,
    payload: data
})

export const clearUser = () => ({
    type: CLEAR_USERS
})
