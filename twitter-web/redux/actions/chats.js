import * as TYPES from "../types"

export const setChats = (chats) => {
    return {
        type: TYPES.SET_CHATS,
        payload: chats,
    }
}

export const clearChats = () => {
    return {
        type: TYPES.CLEAR_CHATS,
        payload: [],
    }
}

export const setActiveChat = (chat) => { 
    return {
        type: TYPES.SET_ACTIVE_CHAT,
        payload: chat,
    }
}

export const clearActiveChat = () => {
    return {
        type: TYPES.CLEAR_ACTIVE_CHAT,
    }
}