import * as TYPES from "../types";

const initState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case TYPES.AUTH_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
            };

        case TYPES.AUTH_USER_LOADING:
        case TYPES.AUTH_REGISTER_LOADING:
        case TYPES.AUTH_LOGIN_LOADING:
        case TYPES.AUTH_LOGOUT_LOADING:
            return {
                ...state,
                isLoading: true,
            };

        case TYPES.AUTH_REGISTER_SUCCESS:
        case TYPES.AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };

        case TYPES.AUTH_REGISTER_FAIL:
        case TYPES.AUTH_LOGIN_FAIL:
        case TYPES.AUTH_LOGOUT_SUCCESS:
            localStorage.removeItem("token");
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };

        default:
            return state;
    }
};
