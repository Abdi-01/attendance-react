import axios from "axios";
import { getStudentSessionAction } from ".";
import { API_URL } from "../../helper";


export const loginAction = (nis, password) => {
    return async (dispatch) => {
        try {
            let dataForm = {
                nis: nis,
                password: password
            }
            let res = await axios.post(`${API_URL}/users/login`, dataForm);
            if (res.data.success) {
                localStorage.setItem('data', res.data.dataLogin.token);
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data.dataLogin
                })
                return { success: res.data.success }
            } else {
                return { success: res.data.success }
            }
        }
        catch (error) {
            console.log("login error :", error);
        }
    }
}

export const keepLogin = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("data");
            if (token) {
                let res = await axios.get(`${API_URL}/users/keeplogin`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    localStorage.setItem("data", res.data.dataKeep.token)
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: res.data.dataKeep
                    })

                    dispatch(getStudentSessionAction())
                    return { success: res.data.success }
                }
            }
        }
        catch (error) {
            console.log('keeplogin error', error);
        }
    }
}

export const logoutAction = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'LOGOUT'
            })
            return { success: true }
        }
        catch (error) {
            console.log("error logout", error);
        }
    }
}
export const sidebarAction = (url) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'GET_PATHNAME',
                payload: url
            })
        } catch (error) {
            console.log(error)
        }
    }
}