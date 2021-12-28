const initialState =  {
    usuario: {},
    token: false,
    nombre: false,
    foto: false,
    _id: false
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