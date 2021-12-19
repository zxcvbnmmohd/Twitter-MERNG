import * as TYPES from "../types"

export const setUser = (user) => { 
    return {
        type: TYPES.AUTH_USER,
        payload: user
    }
}

export const clearUser = () => {
    console.log("clear")
    return {
        type: TYPES.AUTH_LOGOUT_SUCCESS,
    }
}
