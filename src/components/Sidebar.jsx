// Library link : https://www.npmjs.com/package/react-pro-sidebar
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { FaGem, FaHeart, FaUserAlt } from 'react-icons/fa';
import React from 'react';
import { Link } from 'react-router-dom';

const SidebarComponent = () => {
    return (
        <>
            <ProSidebar>
                <SidebarHeader>
                    <div className='text-center my-3'>
                        <img src="https://www.astralife.co.id/beta/wp-content/uploads/2019/11/default-img.png" width='100' height='100' alt="" style={{ borderRadius: '100%' }} />
                        <div className='mt-2'>
                            <h6>Bob Lightning</h6>
                            <p>JCW1902-001</p>
                        </div>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
                        <MenuItem icon={<FaHeart />}><Link to='/attendance'/> Attendance</MenuItem>
                        <MenuItem icon={<FaUserAlt/>}>My Profile</MenuItem>
                    </Menu>
                </SidebarContent>
            </ProSidebar>
        </>
    )
}

export default SidebarComponent