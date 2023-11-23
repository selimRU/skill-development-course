'use client';

import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Nav = () => {
    const { user, logOut } = useAuth()
    const navigate = useNavigate()
    const handleLogOut = () => {
        logOut()
        navigate('/signin')
    }
    return (
        <Navbar fluid rounded className=' bg-blue-300'>
            <Navbar.Brand href="/">
                <img src="https://i.ibb.co/fCGRmvZ/skill-logo-removebg-preview.png" className="mr-3 h-14" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap font-semibold dark:text-white rancho text-3xl">Skill Minds</span>
            </Navbar.Brand>
            <div className="flex md:order-2 items-center gap-3">
                <Link to='/signin'><button className=' bg-blue-50 px-3 py-2 rounded-md hover:bg-blue-400 hover:text-white font-bold roboto'>SignIn</button></Link>
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar title='User info' alt="User settings" img={user?.photoURL} rounded />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">{user?.displayName}</span>
                        <span className="block truncate text-sm font-medium">{user?.email}</span>
                    </Dropdown.Header>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogOut}>Sign out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <NavLink to="/" active>
                    Home
                </NavLink>
                <NavLink href="#">Teach on Skill Minds</NavLink>
                <NavLink href="#">Services</NavLink>
                <NavLink href="#">Pricing</NavLink>
                <NavLink href="#">Contact</NavLink>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Nav;