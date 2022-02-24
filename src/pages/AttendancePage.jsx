import React from 'react';
import { Button, DropdownItem, DropdownMenu, DropdownToggle, Table, UncontrolledDropdown, Label, Input } from 'reactstrap';
import axios from 'axios'
import { API_URL } from '../helper'
import { MdSort, MdOutlineFilterAlt } from 'react-icons/md';
import { connect } from 'react-redux';
import { sidebarAction } from '../redux/actions';
import moment from 'moment';

class AttendancePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataAttendance: []
        }
    }

    componentDidMount() {
        this.getAttendance()
        this.props.sidebarAction('/attendance')

    }
    
    getAttendance = () => {
        let token = localStorage.getItem("data");
        if (token) {
            console.log(token)

            axios.get(`${API_URL}/attendance/student`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(res.data.dataAttendance)
                    this.setState({ dataAttendance: res.data.dataAttendance })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    getDateAsc = () => {
        let token = localStorage.getItem("data");
        if (token) {

            axios.get(`${API_URL}/attendance/student?_sort=date&_order=asc`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(res.data.dataAttendance)
                    this.setState({ dataAttendance: res.data.dataAttendance })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    getDateDesc = () => {
        let token = localStorage.getItem("data");
        if (token) {

            axios.get(`${API_URL}/attendance/student?_sort=date&_order=desc`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(res.data.dataAttendance)
                    this.setState({ dataAttendance: res.data.dataAttendance })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    filterBtn = () => {
        let token = localStorage.getItem("data");
        if (token) {

            if (this.inSearchStartDate.value && this.inSearchEndDate.value) {
                console.log('ini nama dan nis')
                axios.get(`${API_URL}/attendance/student?start_date=${this.inSearchStartDate.value}&end_date=${this.inSearchEndDate.value}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(res => {
                        console.log(res.data.dataAttendance)
                        this.setState({ dataAttendance: res.data.dataAttendance })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                return alert('Harus Isi Semua Kelom')
            }
        }
    }
    resetBtn = () => {
        this.inSearchStartDate.value = null
        this.inSearchEndDate.value = null
        this.state.dataAttendance = this.getAttendance()
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='d-flex p-4' style={{ justifyContent: "space-between" }}>
                    <h2>Attendance List</h2>
                    <Button color="danger" outline style={{ width: "120px", borderRadius: "10px" }}>Logout</Button>
                </div>
                <div style={{ border: "1px  grey", height: "80vh", justifyContent: "space-between", }}>
                    <div className='d-flex p-4'>
                        <div>
                            <h4>Your Attendance</h4>
                        </div>
                        {/* </div> */}
                        <div className='d-flex' style={{ marginLeft: "auto" }}>
                            <div style={{ cursor: 'pointer', paddingRight: "10px" }}>
                                <UncontrolledDropdown>
                                    <DropdownToggle caret size='sm' outline style={{ borderRadius: "10px" }}>
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
                                    <DropdownToggle caret size='sm' outline style={{ borderRadius: "10px" }}>
                                        <MdOutlineFilterAlt />Filter
                                    </DropdownToggle>
                                    <DropdownMenu className='px-2'>
                                        <div className='my-3'>
                                            <Label>Filter By</Label>
                                            <Input type='date' placeholder='Start Date' innerRef={(element) => this.inSearchStartDate = element} />
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
                                    this.state.dataAttendance.map((item, index) => {
                                        let newDate = moment(item.date).format('LL') 
                                        return (
                                            <tr key={index} >
                                                <td>
                                                    {newDate}
                                                </td>
                                                <td>
                                                    {item.check_in}
                                                </td>
                                                <td>
                                                    {item.check_out}
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
const mapToProps = (state) => {
    return {
        session: state.sessionReducer.session
    }
}
export default connect(mapToProps,{sidebarAction}) (AttendancePage);