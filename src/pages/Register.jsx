import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { sidebarAction } from '../redux/actions';
import { Button, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import { API_URL } from '../helper';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { Navigate } from 'react-router-dom';
import { logoutAction } from '../redux/actions'

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGender: "",
            images: null,
            radioCheckedMale: false,
            radioCheckedFemale: false,
            typePass: true,
            redirect: false
        }
    }
    componentDidMount() {
        this.props.sidebarAction('/register')
    }
    handleImages = (e) => {
        this.setState({ images: { name: e.target.files[0].name, file: e.target.files[0] } })
    }

    btRegis = () => {
        let token = localStorage.getItem("data");
        let formData = new FormData();
        let data = {
            nis: this.nisRegis.value,
            fullname: this.fullNameRegis.value,
            email: this.emailRegis.value,
            password: this.passwordRegis.value,
            phone: this.phoneRegis.value,
            address: this.addressRegis.value,
            age: this.ageRegis.value,
            gender: this.state.selectedGender,
            idsession: parseInt(this.sessionRegis.value),
            idrole: 2,
            idstatus: 1
        }
        if (this.nisRegis.value === "" || this.fullNameRegis.value === ""
            || this.emailRegis.value === "" || this.passwordRegis.value === ""
            || this.phoneRegis.value === "" || this.addressRegis.value === ""
            || this.ageRegis.value === "" || this.state.selectedGender === ""
            || this.sessionRegis.value === "") {
            alert("cant be empty value")
        } else {
            console.log("data", data)
            console.log('images', this.state.images.file)
            console.log("selectedGender", this.state.selectedGender)
            formData.append('data', JSON.stringify(data));
            formData.append('images', this.state.images.file)
            // this.state.images.map(val => formData.append('images', val.file))
            axios.post(`${API_URL}/users/regis`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                if (res.data.success) {
                    alert("success add users")
                    this.nisRegis.value = ""
                    this.fullNameRegis.value = ""
                    this.emailRegis.value = ""
                    this.passwordRegis.value = ""
                    this.phoneRegis.value = ""
                    this.addressRegis.value = ""
                    this.ageRegis.value = ""
                    this.sessionRegis.value = ""
                    this.setState({ radioCheckedMale: false })
                    this.setState({ radioCheckedFemale: false })
                    this.imagesRegis.value = ""
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }

    btClear = () => {
        this.nisRegis.value = ""
        this.fullNameRegis.value = ""
        this.emailRegis.value = ""
        this.passwordRegis.value = ""
        this.phoneRegis.value = ""
        this.addressRegis.value = ""
        this.ageRegis.value = ""
        this.sessionRegis.value = ""
        this.setState({ radioCheckedMale: false })
        this.setState({ radioCheckedFemale: false })
        this.imagesRegis.value = ""
    }

    btnLogout = () => {
        this.setState({ redirect: true });
        localStorage.removeItem('data');
        this.props.logoutAction();
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/" />
        }
        return (
            <div className='container' style={{ width: "90vw" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                    <h1>Regis Student</h1>
                    <Button outline color='danger' style={{ width: "100px", height: "40px" }} onClick={this.btnLogout} >Logout</Button>
                </div >
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                    <div>
                        <div>
                            <Label>NIS</Label>
                            <Input style={{ width: "600px" }} innerRef={(element) => this.nisRegis = element} />
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Label>Full Name</Label>
                            <Input innerRef={(element) => this.fullNameRegis = element} />
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Label>Email</Label>
                            <Input innerRef={(element) => this.emailRegis = element} />
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Label>Password</Label>
                            <InputGroup>
                                <Input type={this.state.typePass ? "password" : "text"} innerRef={(element) => this.passwordRegis = element} />
                                <InputGroupText onClick={() => this.setState({ typePass: !this.state.typePass })}>
                                    {
                                        this.state.typePass ? <AiFillEyeInvisible /> : <AiFillEye />
                                    }
                                </InputGroupText>
                            </InputGroup>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Label>Phone</Label>
                            <Input innerRef={(element) => this.phoneRegis = element} />
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Label>Address</Label>
                            <Input type='textarea' innerRef={(element) => this.addressRegis = element} />

                        </div>
                        <div style={{ display: "flex", marginTop: "20px" }}>
                            <div>
                                <Label>Age</Label>
                                <Input style={{ width: "300px" }} innerRef={(element) => this.ageRegis = element} />
                            </div>
                            <div onChange={this.onChangeValue}>
                                <Label style={{ marginLeft: "20px" }}>Gender</Label>
                                <div style={{ display: "flex", width: "200px", justifyContent: "space-between", marginLeft: "20px" }}>
                                    <FormGroup>
                                        <Input type='radio' value="Male" name='gender' checked={this.state.radioCheckedMale} onChange={(e) => this.setState({ selectedGender: e.target.value, radioCheckedMale: true, radioCheckedFemale: false })} />
                                        <Label>Male</Label>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type='radio' value="Female" name='gender' checked={this.state.radioCheckedFemale} onChange={(e) => this.setState({ selectedGender: e.target.value, radioCheckedFemale: true, radioCheckedMale: false })} />
                                        <Label>Female</Label>
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Label>Session</Label>
                            <Input type='select' innerRef={(element) => this.sessionRegis = element} >
                                <option value=""></option>
                                {
                                    this.props.session.map((value, index) => <option value={value.idsession} key={value.idsession}>{value.session}</option>)
                                }
                            </Input>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Button onClick={this.btClear}>Clear Form</Button>
                        </div>
                    </div>
                    <div>
                        <div>
                            {
                                this.state.images ?
                                    <img src={URL.createObjectURL(this.state.images.file)} alt='...' style={{ width: "500px" }} />
                                    :
                                    <img src='https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg' alt='...' style={{ width: "500px" }} />
                            }
                        </div>
                        <div style={{ marginTop: "20px" }} >
                            <Input type='file' onChange={(e) => this.handleImages(e)} innerRef={(e) => this.imagesRegis = e} />
                            <Button color='primary' style={{ width: "500px", marginTop: "20px" }} onClick={this.btRegis}>Register</Button>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

const mapToProps = (state) => {
    return {
        session: state.sessionReducer.session
    }
}

export default connect(mapToProps, { logoutAction, sidebarAction })(RegisterPage);
