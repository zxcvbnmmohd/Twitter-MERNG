import jwtDecode from "jwt-decode";
import * as TYPES from "../types"

const setToken = () => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("token")) {
            const decodedToken = jwtDecode(localStorage.getItem("token"));
        
            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem("token");
            } else {
                initialState.user = decodedToken;
            }
        }
     }
}

const removeToken = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem('token')
     }
}

const initState = {
    token: setToken(),
    user: null,
    isAuthenticated: false,
    isLoading: false,
}

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
            removeToken()
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };
            
        default:
            return state;

    }
}