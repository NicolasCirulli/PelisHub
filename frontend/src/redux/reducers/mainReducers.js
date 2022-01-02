import { combineReducers } from 'redux'
import usuarioReducer from '../reducers/usuarioReducer';
import comentarioReducer from '../reducers/comentarioReducer'
const mainReducer = combineReducers({
    usuarioReducer,
    comentarioReducer
})

export default mainReducer