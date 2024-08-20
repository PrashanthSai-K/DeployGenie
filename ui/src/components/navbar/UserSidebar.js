import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getRequest, userGetRequest } from '../others/extras';

function UserSidebar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleNavBar = () => {
        setIsOpen(!isOpen);
    }

    const [userOpen, setUserOpen] = useState(false);

    const toggleUserNavBar = () => {
        setUserOpen(!userOpen);
    }

    const [dropDown, setDropDown] = useState(false)

    const toggleDropDown = () => {
        setDropDown(!dropDown);
    }

    const navigate = useNavigate();
    const [user, setUser] = useState();

    const getUser = async () => {
        try {
            const response = await userGetRequest("/v1/api/auth/user");
            localStorage.setItem('User', JSON.stringify(response.data.claims));
            setUser(response.data.claims);
        } catch (error) {
            console.log(error);
        }
    }

    const validate = () => {
        const token = localStorage.getItem("userKey")
        if (token == null) {
            navigate("/")
        } else {
            getUser();
        }
    }

    const logout = () => {
        localStorage.removeItem("userKey");
        navigate("/")
    }

    useEffect(() => {
        validate();
    }, [])

    if(!user) return null

    return (
        <> 
            <nav className='fixed top-0 h-20 z-40 p-2 w-full '>
                <div className='flex bg-dark-blue w-full h-full rounded-2xl items-center justify-between p-5'>
                    <div className=' flex items-center justify-center gap-3'>
                        <div
                            data-drawer-target="side-bar"
                            data-drawer-toggle="side-bar"
                            aria-controls="side-bar"
                            className={` sm:hidden transition-all duration-500 ${isOpen ? "" : "rotate-90"}`}
                            onClick={toggleNavBar}
                        >
                            <img src='/images/app.png' className=' w-6 text-white' />
                        </div>
                        <img className='w-40 sm:w-56' src="/images/logo-no-background.png" alt="" />
                    </div>
                    <div className=''>
                        <img
                            src='/images/user.png'
                            className='w-8 hover:opacity-85'
                            onClick={toggleUserNavBar}
                        />
                    </div>

                    {
                        <div className={` fixed p-2 z-50 top-20 right-5 w-56 bg-white border rounded-xl border-dark-blue ${userOpen ? "block" : "hidden"}`}>
                            <div className='absolute -top-3 right-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="triangle-svg">
                                    <path d="M3 12 L8 5 L13 12 Z" fill="white" stroke="none" />
                                    <path d="M3 12 L8 5" stroke="black" stroke-width="1" />
                                    <path d="M8 5 L13 12" stroke="black" stroke-width="1" />
                                </svg>
                            </div>
                            <p className='text-center'>{user.UserFirstname} {user.UserLastname}</p>
                            <p className='text-gray-400 text-xs text-center' title='hariharan.cs21@bitsathy.ac.in'>{user.UserEmail}</p>
                            <div className='w-full pt-2 border-b border-dark-blue'></div>
                            <div className='pl-3' data-popover="popover">
                                <button className='text-gray-600 text-sm pt-3 flex items-center  gap-2 '>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-hearts" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.5 1.246c.832-.855 2.913.642 0 2.566-2.913-1.924-.832-3.421 0-2.566M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4m13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276ZM15 2.165c.555-.57 1.942.428 0 1.711-1.942-1.283-.555-2.281 0-1.71Z" />
                                    </svg>
                                    My Profile
                                </button>
                                <button className='text-gray-600 text-sm pt-3 flex items-center  gap-2 '>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                    Edit Profile
                                </button>
                                <button
                                    className='text-gray-600 text-sm pt-3 flex items-center  gap-2 '
                                    onClick={logout}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />
                                        <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
                                    </svg>
                                    Logout
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </nav>

            <aside
                id='side-bar'
                className={`rounded-xl fixed top-0 left-0 h-5/6 sm:h-89 w-64 mt-20 z-40 bg-dark-blue transition-transform sm:translate-x-0 sm:ml-2 ${isOpen ? "translate-x-0 ml-2 " : "-translate-x-full "}`}
                aria-label="Sidebar"
            >
                <div className='text-white h-full '>
                    <ul className='pt-5 ml-2'>
                        <li
                            className='flex items-center p-2 rounded-lg hover:text-gray-400 cursor-pointer'
                            onClick={() => navigate("/user")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-speedometer2" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.39.39 0 0 0-.029-.518z" />
                                <path fill-rule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A8 8 0 0 1 0 10m8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3" />
                            </svg>
                            <span class="ml-3">Dashboard</span>
                        </li>
                        <li className='p-2 rounded-lg transition-all duration-500 '>
                            <div
                                className='flex items-center cursor-pointer hover:text-gray-400 '
                                onClick={toggleDropDown}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-boxes" viewBox="0 0 16 16">
                                    <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434zM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21zM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z" />
                                </svg>
                                <span class="ml-3">Container</span>
                            </div>
                            {dropDown && <ul className='ml-12 flex flex-col gap-2 pt-2'>
                                <li
                                    className='flex items-center gap-1 cursor-pointer hover:text-gray-400 '
                                    onClick={() => navigate("/user/container/new")}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                    </svg>
                                    <span>New Container</span>
                                </li>
                                <li
                                    className='flex items-center gap-1 cursor-pointer hover:text-gray-400 '
                                    onClick={() => navigate("/user/container/manage")}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                    </svg>
                                    <span>Manage</span>
                                </li>
                            </ul>}
                        </li>
                        <li
                            className='flex items-center p-2 rounded-lg hover:text-gray-400 cursor-pointer'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                                <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                            </svg>
                            <span class="ml-3">Images</span>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default UserSidebar