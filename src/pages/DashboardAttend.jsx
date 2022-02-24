import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap'
import Clock from 'react-live-clock';
import Calendar from 'react-calendar';
import iconCheckIn from '../assets/Component 2.png'
import iconSession from '../assets/Component 1.png'
import iconCheckOut from '../assets/Component 3.png'
import iconAvaVespa from '../assets/avatar_vespa.png'
import axios from 'axios';
import { API_URL } from '../helper';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { sidebarAction } from '../redux/actions';
import { logoutAction } from '../redux/actions';
import { Navigate } from 'react-router-dom';

const DashboardAttend = (props) => {
    let dispatch = useDispatch()

    let date = new Date()
    let tanggal = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    const [calendar, setCalendar] = useState(new Date());
    const [attendanceStudent, setAttendanceStudent] = useState([]);
    const [btnCheckOut, setBtnCheckOut] = useState(true);
    const [idattendance, setIdAttendance] = useState(null);
    const [redirect, setRedirect] = useState(false)
    //ambil data session student dari reducer
    const { dataSession, userData } = useSelector((state) => {
        return {
            dataSession: state.attendanceReducer.dataSessionStudent,
            userData: state.userReducer
        }
    })

    useEffect(() => {
        getDataAttendance()
        dispatch(sidebarAction('/dashboard'))
    }, [])

    const getDataAttendance = async () => {
        try {
            let token = localStorage.getItem('data');
            if (token) {
                let res = await axios.get(`${API_URL}/attendance/${tanggal}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.dataAttendance.length > 0) {
                    setAttendanceStudent(res.data.dataAttendance[0])
                    if (res.data.dataAttendance[0].check_in) {
                        setBtnCheckOut(false)
                        if (res.data.dataAttendance[0].check_out) {
                            setBtnCheckOut(true)
                        } else {
                            setBtnCheckOut(false)
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onBtCheckIn = async () => {
        let time = new Date()
        let checkin = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
        let data = {
            date: tanggal,
            checkin: checkin
        }
        try {
            let token = localStorage.getItem('data');
            if (token) {
                let res = await axios.post(`${API_URL}/attendance/checkin`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    getDataAttendance()
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Success Checkin'
                    })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const btnLogout = () => {
        setRedirect(true);
        localStorage.removeItem('data');
        dispatch(logoutAction());

    }

    const onBtCheckOut = async () => {
        let time = new Date()
        let checkout = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
        try {
            let token = localStorage.getItem('data');

            if (token) {
                let res = await axios.patch(`${API_URL}/attendance/checkout/${attendanceStudent.idattendance}`, { checkout }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (res.data.success) {

                    getDataAttendance()

                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Success Checkout'
                    })

                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    if (redirect) {
        return <Navigate to='/' />
    } else {
        return (
            <div className='row g-0 mt-5'>
                {console.log('isi datasession', dataSession)}
                <div className="col-7">
                    <div>
                        <h3>Dashboard</h3>
                        <div className='mx-4 mt-4'>
                            <h4>Attendance</h4>
                        </div>
                        <div className='mt-3' style={{ width: '40vw', height: '40vh', backgroundColor: '#F8F6F8', borderRadius: '10px' }}>
                            <div className='p-4 text-center '>
                                <div className='mt-3'>
                                    <h2>
                                        <Clock date={`${tanggal}`} format={'dddd, DD MMMM YYYY'} />
                                    </h2>
                                </div>
                                <div>
                                    <h1 style={{ fontWeight: 'bolder', color: '#7C7B7D', fontSize: '5vw' }}>
                                        <Clock
                                            format="HH:mm:ss" interval={1000} ticking={true}
                                        />
                                    </h1>
                                </div>
                            </div>
                            <div className='d-flex justify-content-evenly'>
                                <div>
                                    <Button color='info' onClick={onBtCheckIn} disabled={attendanceStudent.check_in ? true : false}>Checkin</Button>
                                </div>
                                <div>
                                    <Button color='danger' onClick={onBtCheckOut} disabled={btnCheckOut}>Checkout</Button>
                                </div>
                            </div>
                        </div>
                        <div className='my-5'>
                            <div className='d-flex justify-content-'>
                                <div className="d-flex">
                                    <img src={iconCheckIn} alt="" />
                                    <div className='mt-3'>
                                        <p style={{ margin: 0 }}>Check In</p>
                                        <p style={{ margin: 0 }}>{dataSession.timein}</p>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <img src={iconSession} alt="" />
                                    <div className='mt-3'>
                                        <p style={{ margin: 0 }}>Session</p>
                                        <p style={{ margin: 0 }}>{userData.session}</p>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <img src={iconCheckOut} alt="" />
                                    <div className='mt-3'>
                                        <p style={{ margin: 0 }}>Checkout</p>
                                        <p style={{ margin: 0 }}>{dataSession.timeout}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-5">
                    <div className='d-flex justify-content-end'>
                        <Button color='danger' outline onClick={btnLogout}>Logout</Button>
                    </div>
                    <div className="mt-4 mx-3" style={{ width: '30vw', height: '25vh', backgroundColor: '#69A0B1', borderRadius: '10px' }}>
                        <div className='d-flex p-3'>
                            <div>
                                <img src={iconAvaVespa} alt="" />
                            </div>
                            {
                                userData.fullname
                                    ?
                                    <div className='pt-4' >
                                        <h6 style={{ color: 'white', fontWeight: 'bold' }}>Welcome to the class {userData.fullname.split(' ')[0]} </h6>
                                        <p style={{ color: "white", fontSize: '13px' }}>don't forget to attendance</p>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>
                    <div className='my-5 mx-3'>
                        <div>
                            <Calendar onChange={setCalendar} value={calendar} />
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}

export default DashboardAttend;