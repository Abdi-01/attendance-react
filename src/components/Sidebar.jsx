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
                        <MenuItem ><Link to='/dashboard'>
                            Dashboard
                        </Link></MenuItem>
                        <MenuItem >Attendance List</MenuItem>
                        <MenuItem >My Profile</MenuItem>
                        {
                            this.props.data.role == "admin" &&
                            <>
                                <MenuItem >Student Attendance</MenuItem>
                                <MenuItem >
                                    <Link to='/session'>
                                        Sessions
                                    </Link>
                                </MenuItem>
                                <MenuItem >
                                    <Link to='/register'>
                                        Registration Student
                                    </Link>
                                </MenuItem>
                           <MenuItem >
                                         <Link to='/student-management'>
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
    }
}

export default connect(maptoprops)(Sidebar);
