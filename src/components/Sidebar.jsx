// Library link : https://www.npmjs.com/package/react-pro-sidebar
import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { connect } from 'react-redux';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        console.log(window.location.pathname);
        return (
            <ProSidebar className='bg-light' style={{ height: '100vh' }}>
                <SidebarHeader className='text-center' style={{ margin: "10%" }}>
                    <div>
                        <img src={this.props.data.photo} style={{ width: '50%', borderRadius: "50%" }} />
                    </div>
                    <div>
                        <h3>{this.props.data.fullname}</h3>
                        <p className='lead'>{this.props.data.nis}</p>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu>
                        <MenuItem ><Link style={{ color: this.props.pathname == '/dashboard' ? 'skyblue' : 'white' }} to='/dashboard'>
                            Dashboard
                        </Link></MenuItem>
                        <MenuItem style={{ color: this.props.pathname == '' ? 'skyblue' : 'white' }} >Attendance List</MenuItem>
                        <MenuItem style={{ color: this.props.pathname == '' ? 'skyblue' : 'white' }} >My Profile</MenuItem>
                        {
                            this.props.data.role == "admin" &&
                            <>
                                <MenuItem style={{ color: this.props.pathname == '' ? 'skyblue' : 'white' }} >Student Attendance</MenuItem>
                                <MenuItem >
                                    <Link style={{ color: this.props.pathname == '/session' ? 'skyblue' : 'white' }} to='/session'>
                                        Sessions
                                    </Link>
                                </MenuItem>
                                <MenuItem >
                                    <Link style={{ color: this.props.pathname == '/register' ? 'skyblue' : 'white' }} to='/register'>
                                        Registration Student
                                    </Link>
                                </MenuItem>
                                <MenuItem >
                                    <Link style={{ color: this.props.pathname == '/student-management' ? 'skyblue' : 'white' }} to='/student-management'>
                                        Student Attendance
                                    </Link>
                                </MenuItem>
                            </>
                        }
                    </Menu>
                </SidebarContent>
            </ProSidebar>
        );
    }
}


const maptoprops = (state) => {
    return {
        data: state.userReducer,
        pathname: state.userReducer.pathname
    }
}

export default connect(maptoprops)(Sidebar);
