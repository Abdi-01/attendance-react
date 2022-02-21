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
                        <img src="https://png.pngtree.com/png-clipart/20200701/original/pngtree-character-default-avatar-png-image_5407167.jpg" style={{ width: '50%', borderRadius: "50%" }} />
                    </div>
                    <div>
                        <h3>name</h3>
                        <p className='lead'>nis</p>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu>
                        <MenuItem >Dashboard</MenuItem>
                        <MenuItem >Attendance List</MenuItem>
                        <MenuItem >My Profile</MenuItem>
                        <Link to='/student-management'>
                            <MenuItem >Student Attendance</MenuItem>
                        </Link>
                        <MenuItem >Registration Student</MenuItem>
                    </Menu>
                </SidebarContent>
            </ProSidebar>
        );
    }
}



export default Sidebar;