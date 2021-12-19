import * as TYPES from "../types"

const initState = {
    chats: [
        {
            id: 123,
            name: "mark",
            username: "facebook",
            recentMessage: "hey buddy!",
            updatedAt: "Dec 15",
        },
        {
            id: 456,
            name: "bill",
            username: "microsoft",
            recentMessage:
                "chill out bro and the big red lazy dog the big red lazy dog the big red lazy dog...",
            updatedAt: "Dec 20",
        },
    ],
    activeChat: null,
}

export const chatsReducer = (state = initState, action) => {
    switch(action.type) {
        case TYPES.SET_CHATS:
            return {
                ...state,
                chats: action.payload,
            }
        case TYPES.CLEAR_CHATS:
            return {
                ...state,
                chats: [],
            }
        case TYPES.SET_ACTIVE_CHAT:
            return {
                ...state,
                activeChat: action.payload
            }
        case TYPES.CLEAR_ACTIVE_CHAT:
            return {
                ...state,
                activeChat: null
            }
        default:
            return state;
    }
}