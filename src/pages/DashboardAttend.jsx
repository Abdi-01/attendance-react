import React, { useState } from 'react'
import { Button } from 'reactstrap'
import Clock from 'react-live-clock';
import Calendar from 'react-calendar';
import iconCheckIn from '../assets/Component 2.png'
import iconSession from '../assets/Component 1.png'
import iconCheckOut from '../assets/Component 3.png'
import iconAvaVespa from '../assets/avatar_vespa.png'
import axios from 'axios';
import { API_URL } from '../helper';
import { useSelector } from 'react-redux';

const DashboardAttend = () => {


    let date = new Date()
    let est = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    const [tanggal, setTanggal] = useState(est);
    const [calendar, setCalendar] = useState(new Date());
    const [idattendance,setIdAttendance] = useState(null);

    //ambil data session student dari reducer
    // const {dataSession} = useSelector((state) => {
    //     return {
    //         dataSession : state.attendanceReducer.dataSessionStudent
    //     } 
    // })

    const onBtCheckIn = async () => {

        let time = new Date()
        let checkin = time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
        
        let data = {
            date: tanggal,
            checkin: checkin
        }
        try {
            let token = localStorage.getItem('data');
            if(token) {

                let res = await axios.post(`${API_URL}/attendance/checkin`,data,{
                    headers: {
                        'Athorization' : `Bearer ${token}`
                    }
                })

                if(res.data.succes) {
                    //set idattendance ke state idattendance untuk keperluan checkout
                    setIdAttendance(res.data.data_IdAttendance)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onBtCheckOut = async () => {

        let time = new Date()
        let checkout = time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()
        
        try {
            let res = await axios.patch(`${API_URL}/attendance/checkout/${idattendance}`, checkout)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='row g-0 mt-5'>
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
                                <Button color='info' onClick={onBtCheckIn}>Checkin</Button>
                            </div>
                            <div>
                                <Button color='danger' onClick={onBtCheckOut}>Checkout</Button>
                            </div>
                        </div>
                    </div>
                    <div className='my-5'>
                        <div className='d-flex justify-content-'>
                            <div className="d-flex">
                                <img src={iconCheckIn} alt="" />
                                <div className='mt-3'>
                                    <p style={{ margin: 0 }}>Check In</p>
                                    <p style={{ margin: 0 }}>09:00</p>
                                </div>
                            </div>
                            <div className="d-flex">
                                <img src={iconSession} alt="" />
                                <div className='mt-3'>
                                    <p style={{ margin: 0 }}>Session</p>
                                    <p style={{ margin: 0 }}>1</p>
                                </div>
                            </div>
                            <div className="d-flex">
                                <img src={iconCheckOut} alt="" />
                                <div className='mt-3'>
                                    <p style={{ margin: 0 }}>Checkout</p>
                                    <p style={{ margin: 0 }}>18:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-5">
                <div className='d-flex justify-content-end mx-5'>
                    <Button color='danger' outline>Logout</Button>
                </div>
                <div className="mt-4" style={{ width: '30vw', height: '25vh', backgroundColor: '#69A0B1', borderRadius: '10px' }}>
                    <div className='d-flex p-3'>
                        <div>
                            <img src={iconAvaVespa} alt="" />
                        </div>
                        <div className='pt-4' >
                            <h6 style={{ color: 'white', fontWeight: 'bold' }}>Welcome to the class bob</h6>
                            <p style={{ color: "white", fontSize: '13px' }}>don't forget to attendance</p>
                        </div>
                    </div>
                </div>
                <div className='my-5'>
                    <div>
                        <Calendar onChange={setCalendar} value={calendar}  />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardAttend