import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import Sidebar from '../components/Sidebar';
import {logoutAction} from '../redux/actions'

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect : false
        }
    }

    btnLogout =()=>{
        localStorage.removeItem('data');
        this.props.logoutAction();
        this.setState({redirect:true});
        
    }

    render() {
        // untuk redirect saat logout
        console.log(this.state.redirect)
        if(this.state.redirect){
            return <Navigate to="/"/>
        }
        return (
            <div className='d-flex'>
                <div className='bg-light'>
                    <Sidebar />
                </div>
                <div style={{marginLeft:'5%'}}>
                    <h1>Hello, {this.props.data.fullname}</h1>
                    <h1>Dashboard</h1>
                    <Button outline color='danger' onClick={this.btnLogout} >LOGOUT</Button>
                </div>
            </div>
        );
    }
}

//tipe data untuk data student : object.
const maptoprops = (state) => {
    return {
        // variabel data mencakup semua data login
        data: state.userReducer,
    }
}

export default connect(maptoprops,{logoutAction})(Dashboard);