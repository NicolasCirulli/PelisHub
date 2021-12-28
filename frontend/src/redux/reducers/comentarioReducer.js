const initialState =  {
    comentarios: []
}

const comentarioReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_COMENTARY': 
            let loquevosquieras = {...state.comentarios}
            loquevosquieras.push(action.payload)
            return { 
                ...state, 
                comentarios: loquevosquieras
            }
        case 'GET_COMENTARY': 
            return { 
                ...state, 
                comentarios: action.payload
            }

        default :
            return state
    }
}

export default comentarioReducer