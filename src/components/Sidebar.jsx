// Library link : https://www.npmjs.com/package/react-pro-sidebar
import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
class SidebarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <ProSidebar  className='bg-light' style={{ height: '100vh' }}>
                <SidebarHeader className='text-center' style={{margin:"10%"}}>
                    <div>
                        <img  style={{width:'50%', borderRadius:"50%"}}/>
                    </div>
                    <div>
                        <h3></h3>
                        <p className='lead'></p>
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
            </div>
        );
    }
}

export default SidebarComp;