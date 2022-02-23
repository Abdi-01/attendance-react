import { Button, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Table, UncontrolledDropdown } from 'reactstrap';
import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../helper';
import SortIcon from '@mui/icons-material/Sort';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import ModalAttendance from '../components/ModalAttendance';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAction } from '../redux/actions'

class StudentManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            modalOpen: false,
            detail: {},
            iduser: null,
            redirect: false
        }
    }

    componentDidMount() {
        this.getAttendance()
    }

    getAttendance = () => {
        axios.get(`${API_URL}/attendance`)
            .then(res => {
                console.log(res.data.dataStudents)
                this.setState({ students: res.data.dataStudents })
            })
            .catch(err => {
                console.log(err)
            })
    }

    btnLogout = () => {
        this.setState({ redirect: true });
        localStorage.removeItem('data');
        this.props.logoutAction();
    }

    filterBtn = () => {
        if (this.inSearchName.value && this.inSearchNis.value) {
            console.log('ini nama dan nis')
            axios.get(`${API_URL}/attendance?fullname=${this.inSearchName.value}&nis=${this.inSearchNis.value}`)
                .then(res => {
                    console.log(res.data.dataStudents)
                    this.setState({ students: res.data.dataStudents })
                })
                .catch(err => {
                    console.log(err)
                })
        } else if (this.inSearchNis.value) {
            console.log('test', this.inSearchNis.value)
            axios.get(`${API_URL}/attendance?nis=${this.inSearchNis.value}`)
                .then(res => {
                    console.log(res.data.dataStudents)
                    this.setState({ students: res.data.dataStudents })
                })
                .catch(err => {
                    console.log(err)
                })
        } else if (this.inSearchName.value) {
            console.log('ini nama')
            axios.get(`${API_URL}/attendance?fullname=${this.inSearchName.value}`)
                .then(res => {
                    console.log(res.data.dataStudents)
                    this.setState({ students: res.data.dataStudents })
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            return alert('data belum lengkap')
        }
    }

    getNameAsc = () => {
        axios.get(`${API_URL}/attendance?_sort=fullname&_order=asc`)
            .then(res => {
                console.log(res.data.dataStudents)
                this.setState({ students: res.data.dataStudents })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getNameDesc = () => {
        axios.get(`${API_URL}/attendance?_sort=fullname&_order=desc`)
            .then(res => {
                console.log(res.data.dataStudents)
                this.setState({ students: res.data.dataStudents })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getNisAsc = () => {
        axios.get(`${API_URL}/attendance?_sort=nis&_order=asc`)
            .then(res => {
                console.log(res.data.dataStudents)
                this.setState({ students: res.data.dataStudents })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getNisDesc = () => {
        axios.get(`${API_URL}/attendance?_sort=nis&_order=desc`)
            .then(res => {
                console.log(res.data.dataStudents)
                this.setState({ students: res.data.dataStudents })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getDateDesc = () => {
        axios.get(`${API_URL}/attendance?date_sort=date&date_order=desc`)
            .then(res => {
                console.log(res.data.dataStudents)
                this.setState({ students: res.data.dataStudents })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        console.log('redirect', this.state.redirect)
        if (this.state.redirect) {
            return <Navigate to='/' />
        }
        return (
            <div className='mx-3'>
                <ModalAttendance
                    modalOpen={this.state.modalOpen}
                    detailStudent={this.state.detail}
                    btClose={() => this.setState({ modalOpen: !this.state.modalOpen })}
                    getDateAsc={() => this.getDateDesc()}
                    iduser={this.state.iduser}
                />
                <div className='d-flex justify-content-between my-3'>
                    <h2>Students Attendance</h2>
                    <Button type='button' color='danger' outline onClick={this.btnLogout}>Logout</Button>
                </div>
                <div className='d-flex justify-content-between my-2'>
                    <div>
                        <p>Students List</p>
                    </div>
                    <div className='d-flex'>
                        <div className='d-flex' style={{ cursor: 'pointer' }}>
                            <UncontrolledDropdown>
                                <DropdownToggle caret size='sm' outline>
                                    <SortIcon /> Sort
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => this.getNameAsc()} >
                                        A-Z
                                    </DropdownItem>
                                    <DropdownItem onClick={() => this.getNameDesc()}>
                                        Z-A
                                    </DropdownItem>
                                    <DropdownItem onClick={() => this.getNisAsc()}>
                                        NIS Asc
                                    </DropdownItem>
                                    <DropdownItem onClick={() => this.getNisDesc()}>
                                        NIS Desc
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                        <div>
                            <UncontrolledDropdown>
                                <DropdownToggle caret size='sm' outline>
                                    <FilterAltOutlinedIcon /> Filter
                                </DropdownToggle>
                                <DropdownMenu className='px-2'>
                                    <div className='my-3'>
                                        <Label>Filter By</Label>
                                        <Input className='my-2' placeholder='Search Name' innerRef={(element) => this.inSearchName = element} />
                                        <Input placeholder='Search NIS' innerRef={(element) => this.inSearchNis = element} />
                                    </div>

                                    <div>
                                        <Button color='primary' onClick={this.filterBtn}>Filter</Button>
                                        <Button color='warning'>Reset</Button>
                                    </div>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </div>
                </div>
                <div>
                    <Table style={{ width: '84vw' }}>
                        <thead className='text-muted px-2'>
                            <tr>
                                <th>
                                    No.
                                </th>
                                <th>
                                    NIS
                                </th>
                                <th>
                                    Fullname
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    No. Telepon
                                </th>
                                <th>
                                    Session
                                </th>
                                <th>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className='px-2'>
                            {
                                this.state.students.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                {item.iduser}
                                            </td>
                                            <td>
                                                {item.nis}
                                            </td>
                                            <td>
                                                {item.fullname}
                                            </td>
                                            <td>
                                                {item.email}
                                            </td>
                                            <td>
                                                {item.phone}
                                            </td>
                                            <td>
                                                {item.session}
                                            </td>
                                            <td>
                                                <Button outline color='warning' onClick={() => this.setState({ modalOpen: !this.state.modalOpen, detail: item, iduser: item.iduser })}>Detail</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        data: state.userReducer,
    }
}

export default connect(mapToProps, { logoutAction })(StudentManagement);