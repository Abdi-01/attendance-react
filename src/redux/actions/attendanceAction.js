import axios from "axios"
import { API_URL } from "../../helper"


export const getStudentSessionAction = () => {

    return async (dispatch) => {

        try {
            let token = localStorage.getItem('data');

            if (token) {

                let res = await axios.get(`${API_URL}/attendance/session`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                console.log(' res.data.dataSessionStudent =>' ,res.data.dataSessionStudent)
                if (res.data.success) {

                    dispatch({
                        type: 'GET_SESSION_STUDENT_SUCCESS',
                        payload: res.data.dataSessionStudent[0]
                    })

                    return { success: res.data.success }
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

}