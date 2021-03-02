import { SAVE_USERS, SAVE_ME_DATA} from "../constants/types"

const INITIAL_STATE = {
  users:  [],
  me: {},
  token: ""
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_ME_DATA:
            return {
                ...state,
                me: action.payload.me,
                token: action.payload.token
            }
        case SAVE_USERS: 
            return {
                ...state,
                users: action.payload
            }
        default:
            return {
                ...state,
              }
    }
}

export default userReducer;