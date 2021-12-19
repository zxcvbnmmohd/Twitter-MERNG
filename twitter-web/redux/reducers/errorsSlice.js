import { ERRORS_FETCH, ERRORS_CLEAR } from '../types'

const initState = {
    errors: {},
    status: null,
    id: null,
}

export const errorsReducer = (state = initState, action) => {
    switch(action.type) {
        case ERRORS_FETCH:
            return {
                errors: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id,
            };
        case ERRORS_CLEAR:
            return {
                errors: {},
                status: null,
                id: null,
            }
        default:
            return state;
    }
}