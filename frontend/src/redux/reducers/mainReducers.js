import { combineReducers } from 'redux'
import usuarioReducer from '../reducers/usuarioReducer';

const mainReducer = combineReducers({
    usuarioReducer
})

export default mainReducer