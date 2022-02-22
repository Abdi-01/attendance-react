const INITIAL_STATE = {
    session: []
}

export const sessionReducer = (state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case 'GET_SESSION':
            console.log("cek session",action.payload);
            return {...state, session : action.payload};
        default:
            return state
    }
}