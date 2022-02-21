// Library link : https://www.npmjs.com/package/react-pro-sidebar
import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { connect } from 'react-redux';
import 'react-pro-sidebar/dist/css/styles.css';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <ProSidebar  className='bg-light' style={{ height: '100vh' }}>
                <SidebarHeader className='text-center' style={{margin:"10%"}}>
                    <div>
                        <img src={this.props.data.photo} style={{width:'50%', borderRadius:"50%"}}/>
                    </div>
                    <div>
                        <h3>{this.props.data.fullname}</h3>
                        <p className='lead'>{this.props.data.nis}</p>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu>
                        <MenuItem >Dashboard</MenuItem>
                        <MenuItem >Attendance List</MenuItem>
                        <MenuItem >My Profile</MenuItem>
                        <MenuItem >Student Attendance</MenuItem>
                        <MenuItem >Registration Student</MenuItem>
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