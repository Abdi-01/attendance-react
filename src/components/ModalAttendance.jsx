import React, { Component } from 'react';
import { Modal, ModalHeader, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu, Label, Input, Button, ModalBody, Row, Col, Table } from 'reactstrap';
import SortIcon from '@mui/icons-material/Sort';
import axios from 'axios';
import { API_URL } from '../helper';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';



class ModalAttendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attendance: [],
            sort: false
        }
    }

    handleClose = () => {
        this.setState({ attendance: [], sort: false }, () => {
            this.props.btClose()
        })
    }

    printAttendance = () => {
        if (!this.state.sort) {
            return this.props.detailStudent.attendance.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>
                            {item.date.substr(0, 10)}
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
        } else {
            return this.state.attendance.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>
                            {item.date.substr(0, 10)}
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
    }

    filterBtn = () => {
        if (this.inSearchStartDate.value && this.inSearchEndDate.value) {
            axios.get(`${API_URL}/student?start_date=${this.inSearchStartDate.value}&end_date=${this.inSearchEndDate.value}`)
                .then(res => {
                    console.log(res.data.getAttendance)
                    this.setState({ attendance: res.data.getAttendance })
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            return alert('Fill all column')
        }
    }

    handleSortDesc = () => {
        axios.get(`${API_URL}/attendance/${this.props.iduser}/?_sort=date&_order=desc`)
            .then(res => {
                console.log(res.data.dataAttendance)
                this.setState({ attendance: res.data.dataAttendance, sort: true })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleSortAsc = () => {
        axios.get(`${API_URL}/attendance/${this.props.iduser}/?_sort=date&_order=asc`)
            .then(res => {
                console.log(res.data.dataAttendance)
                this.setState({ attendance: res.data.dataAttendance, sort: true })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        console.log('get', this.state.attendance)
        console.log('iduser', this.props.iduser)

        return (
            <Modal isOpen={this.props.modalOpen} toggle={this.handleClose} size='xl' >
                <div className='d-flex justify-content-between my-3 mx-3'>
                    <div>
                        <h4>Detail</h4>
                    </div>
                    <div className='d-flex'>
                        <div className='d-flex' style={{ cursor: 'pointer' }}>
                            <UncontrolledDropdown>
                                <DropdownToggle caret size='sm' outline>
                                    <SortIcon /> Sort
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={this.handleSortAsc} >
                                        Date Asc
                                    </DropdownItem>
                                    <DropdownItem onClick={this.handleSortDesc} >
                                        Date Desc
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
                                        <Input type='date' className='my-2' placeholder='Start Date' innerRef = {(element) => this.inSearchStartDate = element} />
                                        <Input type='date' className='my-2' placeholder='End Date' innerRef={(element) => this.inSearchEndDate = element} />
                                    </div>
                                    <div>
                                        <Button color='primary'>Filter</Button>
                                        <Button color='warning'>Reset</Button>
                                    </div>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </div>
                </div>
                <div>
                    <ModalBody>
                        <Row>
                            <Col className='col-md-4'>
                                <div className='row'>
                                    <div className='col-md-6' >
                                        <img src="https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image.jpg" width="100%" />
                                    </div>
                                    <div className='col-md-6' >
                                        <Label className='text-muted' style={{ fontSize: 12 }}>
                                            NIS
                                        </Label>
                                        <p>{this.props.detailStudent.nis}</p>
                                        <Label className='text-muted' style={{ fontSize: 12 }}>
                                            Full Name
                                        </Label>
                                        <p>{this.props.detailStudent.fullname}</p>
                                        <Label className='text-muted' style={{ fontSize: 12 }}>
                                            Email
                                        </Label>
                                        <p>{this.props.detailStudent.email}</p>
                                        <Label className='text-muted' style={{ fontSize: 12 }}>
                                            Phone
                                        </Label>
                                        <p>{this.props.detailStudent.phone}</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-md-3">
                                        <Label className='text-muted' style={{ fontSize: 12 }}>
                                            Age
                                        </Label>
                                        <p>{this.props.detailStudent.age}</p>
                                        <Label className='text-muted' style={{ fontSize: 12 }}>
                                            Gender
                                        </Label>
                                        <p>{this.props.detailStudent.gender}</p>
                                    </div>
                                    <div className="col-md-9">
                                        <Label className='text-muted' style={{ fontSize: 12 }}>
                                            Address
                                        </Label>
                                        <p>{this.props.detailStudent.address}</p>
                                        <Label className='text-muted' style={{ fontSize: 12 }}>
                                            Session 1
                                        </Label>
                                        <p>{this.props.detailStudent.session}</p>
                                    </div>
                                </div>
                            </Col>
                            <Col className='col-md-8'>
                                <Table className='text-muted' style={{ fontSize: 12 }} >
                                    <thead color='black'>
                                        <tr>
                                            <th>
                                                Tanggal
                                            </th>
                                            <th>
                                                Check-In
                                            </th>
                                            <th>
                                                Check-Out
                                            </th>
                                            <th>
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.detailStudent.attendance ?
                                                this.printAttendance()
                                                :
                                                null
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </ModalBody>
                </div>

            </Modal>
        );
    }
}

export default ModalAttendance;