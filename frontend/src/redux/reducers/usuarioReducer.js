const initialState =  {
    usuario: {},
    token: {},
    nombre: {},
    foto: {},
    _id: {}
}

const usuarioReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGUEADO': 
            return { ...state, ...action.payload}
        case 'DESLOGUEARSE': 
            return { initialState }
        default :
            return state
    }
}

export default usuarioReducer