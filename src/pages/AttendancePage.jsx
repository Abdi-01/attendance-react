import React from 'react';
import { Button, DropdownItem, DropdownMenu, DropdownToggle, Table, UncontrolledDropdown, Label, Input } from 'reactstrap';
import axios from 'axios'
import { API_URL } from '../helper'
import { MdSort, MdOutlineFilterAlt } from 'react-icons/md';




class AttendancePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attendance: []
        }
    }

    componentDidMount() {
        this.getAttendance()
    }

    getAttendance = () => {
        axios.get(`${API_URL}/attendance`)
            .then(res => {
                console.log(res.data.getAttendance)
                this.setState({ attendance: res.data.getAttendance })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getDateAsc = () => {
        axios.get(`${API_URL}/attendance?_sort=date&_order=asc`)
            .then(res => {
                console.log(res.data.getAttendance)
                this.setState({ attendance: res.data.getAttendance })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getDateDesc = () => {
        axios.get(`${API_URL}/attendance?_sort=date&_order=desc`)
            .then(res => {
                console.log(res.data.getAttendance)
                this.setState({ attendance: res.data.getAttendance })
            })
            .catch(err => {
                console.log(err)
            })
    }

    filterBtn = () => {
        if (this.inSearchStartDate.value && this.inSearchEndDate.value) {
            console.log('ini nama dan nis')
            axios.get(`${API_URL}/attendance?start_date=${this.inSearchStartDate.value}&end_date=${this.inSearchEndDate.value}`)
                .then(res => {
                    console.log(res.data.getAttendance)
                    this.setState({ attendance: res.data.getAttendance })
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            return alert('Harus Isi Semua Kelom')
        }
    }
    resetBtn = () => {
        this.inSearchStartDate.value = null
        this.inSearchEndDate.value = null
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='d-flex p-4' style={{ justifyContent: "space-between" }}>
                    <h2>Attendance List</h2>
                    <Button color="danger" outline style={{ width: "120px", borderRadius:"10px" }}>Logout</Button>
                </div>
                <div style={{ border: "1px  grey", height: "80vh", justifyContent: "space-between", }}>
                    <div className='d-flex p-4'>
                        <div>
                            <h4>Your Attendance</h4>
                        </div>
                        {/* </div> */}
                        <div className='d-flex' style={{marginLeft:"auto" }}>
                            <div style={{ cursor: 'pointer', paddingRight:"10px"}}>
                                <UncontrolledDropdown>
                                    <DropdownToggle caret size='sm' outline style={{borderRadius:"10px"}}>
                                        <MdSort /> Sort
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => this.getDateAsc()}>
                                            Date Asc
                                        </DropdownItem>
                                        <DropdownItem onClick={() => this.getDateDesc()}>
                                            Date Desc
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>
                            <div className='d-flex' style={{ cursor: 'pointer' }}>
                                <UncontrolledDropdown>
                                    <DropdownToggle caret size='sm' outline style={{borderRadius:"10px"}}>
                                        <MdOutlineFilterAlt />Filter
                                    </DropdownToggle>
                                    <DropdownMenu className='px-2'>
                                        <div className='my-3'>
                                            <Label>Filter By</Label>
                                            <Input  type='date' placeholder='Start Date' innerRef={(element) => this.inSearchStartDate = element} />
                                            <Input placeholder='End Date' type='date' innerRef={(element) => this.inSearchEndDate = element} />
                                        </div>

                                        <div>
                                            <Button color='primary' onClick={this.filterBtn}>Filter</Button>
                                            <Button color='warning' onClick={this.resetBtn}>Reset</Button>
                                        </div>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Table>
                            <thead className='text-muted px-2'>
                                <tr>
                                    <th>Tanggal</th>
                                    <th>Check in</th>
                                    <th>Check out</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody className='px-2'>
                                {
                                    this.state.attendance.map((item, index) => {
                                        return (
                                            <tr key={index} >
                                                <td>
                                                    {item.date}
                                                </td>
                                                <td>
                                                    {item.checkin}
                                                </td>
                                                <td>
                                                    {item.checkout}
                                                </td>
                                                <td>
                                                    {item.status}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default AttendancePage;