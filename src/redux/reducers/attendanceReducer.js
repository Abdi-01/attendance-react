const INITIAL_STATE = {
    dataSessionStudent : []
}

export const attendanceReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_SESSION_STUDENT_SUCCESS':
            console.log('isi action.payload', action.payload)
            return {
                ...state,
                dataSessionStudent: action.payload
            }
    
        default:
            return state
    }
} 