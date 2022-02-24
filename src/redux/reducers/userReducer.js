const INITIAL_STATE = {
    pathname: ''
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log('data login', action.payload);
            return {
                ...state, ...action.payload
            }
        case "LOGOUT":
            return {
                INITIAL_STATE
            }
        case "GET_PATHNAME":
            console.log("pathname",action.payload)
            return {
                ...state,pathname: action.payload
            }
        default:
            return state
    }
}