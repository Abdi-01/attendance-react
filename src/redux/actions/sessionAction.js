import axios from "axios"
import { API_URL } from "../../helper"
// BELUM MENGGUNAKAN READTOKEN //
export const getSessionAction = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('data')
            if(token){
                let res = await axios.get(`${API_URL}/session`,{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                })
                dispatch({
                    type: 'GET_SESSION',
                    payload: res.data.session
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const deleteSession = (id) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('data')
            if(token){
                let res = await axios.delete(`${API_URL}/session/${id}`,{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    dispatch(getSessionAction())
                    return { success: true, message: "Delete Session success" }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}