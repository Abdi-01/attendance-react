import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Input, Label, Table } from 'reactstrap'
import SidebarComp from '../components/Sidebar';
import { API_URL } from '../helper';
import { deleteSession, getSessionAction, sidebarAction } from '../redux/actions';
class ManageSession extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIdx: null
        }
    }
    
    componentDidMount() {
        this.props.getSessionAction()
        this.props.sidebarAction('/session')
    }
    printSession = () => {
        return this.props.session.map((value, index) => {
            console.log(value.session)
            return (
                <>
                    {this.state.selectedIdx !== index ?
                        <tr>
                            <td>
                                <p>{value.session}</p>
                            </td>
                            <td className="text-center">
                                <p>{value.timein.slice(0, 5)}</p>
                            </td>
                            <td className="text-center">
                                <p>{value.timeout.slice(0, 5)}</p>
                            </td>
                            <td className="text-center">
                                <Button outline color="warning" onClick={() => this.setState({ selectedIdx: index })}>EDIT</Button>
                                <Button outline color="danger" style={{ marginLeft: 20 }} onClick={() => this.btnDelete(index)}>DELETE</Button>
                            </td>
                        </tr>
                        :
                        <tr>
                            <td>
                                <Input defaultValue={value.session} innerRef={(element) => this.inEditSession = element} type="text"></Input>
                            </td>
                            <td>
                                <Input defaultValue={value.timein.slice(0, 5)} innerRef={(element) => this.inEditTimein = element} type="text"></Input>
                            </td>
                            <td>
                                <Input defaultValue={value.timeout.slice(0, 5)} innerRef={(element) => this.inEditTimeout = element} type="text"></Input>
                            </td>
                            <td className="text-center">
                                <Button outline color="success" onClick={() => this.btnSave(value.idsession, this.setState({ selectedIdx: null }))}>SAVE</Button>
                                <Button outline color="danger" style={{ marginLeft: 20 }} onClick={() => this.setState({ selectedIdx: null })}>CANCEL</Button>
                            </td>
                        </tr>

                    }
                </>
            )
        })
    }
    btnAdd = () => {
        let data = {
            session: this.inSession.value,
            timein: this.inTimein.value,
            timeout: this.inTimeout.value
        }
        let token = localStorage.getItem('data')
        if (token) {
            axios.post(`${API_URL}/session`, data,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    this.props.getSessionAction()
                    alert("Session berhasil bertambah")
                    this.inSession.value = ''
                    this.inTimein.value = ''
                    this.inTimeout.value = ''
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    btnSave = (id) => {
        let data = {
            session: this.inEditSession.value,
            timein: this.inEditTimein.value,
            timeout: this.inEditTimeout.value
        }
        let token = localStorage.getItem("data");
        if (token) {
            axios.patch(`${API_URL}/session/${id}`, data, {
               headers:{
                   'Authorization': `Bearer ${token}`
               }
            })
                .then((res) => {
                    this.props.getSessionAction()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    btnDelete = (index) => {
        let temp = [...this.props.session]
        this.props.deleteSession(temp[index].idsession)
    }
    render() {
        return (
            <div className="container-fluid">
                {/* <div className="row"> */}
                {/* <div className="col-3"> */}
                {/* <h2>Side Bar</h2> */}
                {/* <SidebarComp/> */}
                {/* </div> */}
                <div className="p-3">
                    <div className="d-flex" style={{ justifyContent: 'space-between', marginBottom: 20 }}>
                        <h2>Manage Sessions</h2>
                        <Button outline color="danger" style={{ width: '120px' }}>LOGOUT</Button>
                    </div>
                    <div className="row">
                        <div className="col-4" style={{ marginTop: 5 }}>
                            <FormGroup>
                                <Label style={{ fontWeight: 'bold' }}>Session Name</Label>
                                <Input innerRef={(element) => this.inSession = element} type="text"></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label style={{ fontWeight: 'bold' }}>Timein</Label>
                                <Input innerRef={(element) => this.inTimein = element} type="text"></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label style={{ fontWeight: 'bold' }}>Timeout</Label>
                                <Input innerRef={(element) => this.inTimeout = element} type="text"></Input>
                            </FormGroup>
                            <Button color="primary" style={{ width: '100%' }} onClick={this.btnAdd}>ADD</Button>
                        </div>
                        <div className="col-8">
                            <Table>
                                <thead>
                                    <tr>
                                        <th style={{ width: '5vw' }}>Session Name</th>
                                        <th className="text-center" style={{ width: '5vw' }}>Timein</th>
                                        <th className="text-center" style={{ width: '5vw' }}>Timeout</th>
                                        <th className="text-center" style={{ width: '5vw' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.printSession()}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
        );
    }
}
const mapToProps = (state) => {
    return {
        session: state.sessionReducer.session
    }
}
export default connect(mapToProps, { getSessionAction, deleteSession,sidebarAction })(ManageSession);