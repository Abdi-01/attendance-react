const INITIAL_STATE = {
    dataSessionStudent : []
}

export const attendanceReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_SESSION_STUDENT_SUCCESS':
            return {
                ...state,
                dataSesionStudent: action.payload
            }
    
        default:
            return state
    }
} 