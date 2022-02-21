import axios from "axios"
import { API_URL } from "../../helper"


export const getStudentSessionAction = () => {

    return async (dispatch) => {

        try {
            let token = localStorage.getItem('data');

            if (token) {

                let res = await axios.get(`${API_URL}/attendance`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (res.data.success) {

                    dispatch({
                        type: 'GET_SESSION_STUDENT_SUCCESS',
                        payload: res.data.dataSessionStudent
                    })

                    return { success: res.data.success }
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

}