import { combineReducers } from 'redux'
import { authReducer } from './authSlice'
import { chatsReducer } from './chatsSlice'
import { errorsReducer } from './errorsSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    chats: chatsReducer,
    errors: errorsReducer,
});

export default rootReducer