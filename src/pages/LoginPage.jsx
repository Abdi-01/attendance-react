import React from 'react';
import { Button, InputGroup, Input, InputGroupText, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import {loginAction} from '../redux/actions'
import { connect } from 'react-redux';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            typePass : true
        }
    }

    btnLogin = () => {
        this.props.loginAction(this.inputNIS.value, this.inputPassword.value)
        // menggunakan promise untuk proteksi saat password salah
        .then((res)=>{
            if(res.success){
                this.setState({redirect:true});
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'NIS or Password incorect!'
                  })
            }
        })
    }

    render() {
        // untuk redirect ke halaman selanjutnya
        if (this.state.redirect) {
            return <Navigate to='/dashboard' />
        }
        return (
            <div className='d-flex' style={{ padding: '10%' }}>
                <div className='container shadow' style={{ width: '35%', padding: '2% 5% 3% 5%', borderRadius: 20 }}>
                    <h1>Login</h1>
                    <Label for='NIS' style={{ color: '#673AB7' }}>NIS</Label>
                    <InputGroup>
                        <Input id='NIS' type='text' innerRef={(e) => this.inputNIS = e} />
                    </InputGroup>
                    <Label for='password' style={{ color: '#673AB7', marginTop:'1%' }}>Password</Label>
                    <InputGroup >
                        <Input id='password' type={this.state.typePass? "password" : "text"} innerRef={(e) => this.inputPassword = e} style={{borderRight:'none'}}/>
                        <InputGroupText style={{backgroundColor:'white',fontSize:'25px', cursor:'pointer', color:'#673AB7'}} onClick={()=>this.setState({typePass: !this.state.typePass})}>
                            {
                                this.state.typePass ? <AiFillEye /> : <AiFillEyeInvisible />
                            }
                            </InputGroupText>
                    </InputGroup>
                    <Button className='my-2' type='button' style={{ width: '100%', fontWeight: 'bold' }} color="primary" onClick={this.btnLogin}>Login</Button>
                </div>
            </div>
        );
    }
}

const maptoprops=(state)=>{
    return {
        data : state.userReducer,
    }
}

export default connect(maptoprops,{loginAction}) (LoginPage);