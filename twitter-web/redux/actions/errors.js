import * as TYPES from "../types"

export const returnErrors = (msg, status, id = null) => {
    return {
        type: TYPES.ERRORS_FETCH,
        payload: {
            msg,
            status,
            id,
        }
    }
}

export const clearErrors = () => {
    return {
        type: TYPES.ERRORS_FETCH,
    }
}