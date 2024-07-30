import React, { useEffect, useState } from 'react'
import AdminSidebar from '../navbar/AdminSidebar'
import { ErrorNotify, getRequest, postRequest, SuccessNotify } from '../others/extras';

function AdminUsersManage() {

    const [message, setMessage] = useState();
    const [error, setError] = useState();

    const clearNotify = () => {
        setTimeout(() => {
            setMessage();
            setError();
        }, 5000)
    }

    const [users, setUsers] = useState([]);
    const [main, setMain] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await getRequest("/api/user")
            setUsers(response.data.data)
            setMain(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const ApproveUser = async (user) => {
        try {
            const response = await postRequest("/api/user/approve", user);
            if (response) {
                setMessage("User Approved Successfully");
                fetchUsers();
                clearNotify();
            }
        } catch (error) {
            console.log(error);
            setError("Some error try after sometime");
            clearNotify();
        }
    }

    const RejectUser = async (user) => {
        try {
            const response = await postRequest("/api/user/reject", user);
            if (response) {
                setMessage("User Rejected Successfully");
                fetchUsers();
                clearNotify();
            }
        } catch (error) {
            console.log(error);
            setError("Some error try after sometime");
            clearNotify();
        }
    }

    const InactiveUser = async (user) => {
        try {
            const response = await postRequest("/api/user/inactive", user);
            if (response) {
                setMessage("User disabled successfully");
                fetchUsers();
                clearNotify();
            }
        } catch (error) {
            console.log(error);
            setError("Some error try after sometime");
            clearNotify();
        }
    }

    const [filterStatus, setFilterStatus] = useState();

    const filterData = (e) => {
        const status = e.target.value;
        setFilterStatus(status)
        console.log(status);
        if (status === "ALL") {
            fetchUsers();
            return;
        }
        const data = main.filter((user) => user.Status === status);
        setUsers(data);
    }

    useEffect(() => {
        fetchUsers();
    }, [])



    return (
        <>
            <AdminSidebar />

            {message ? <SuccessNotify message={message} /> : null}
            {error ? <ErrorNotify message={error} /> : null}

            <div className='ml-2  sm:ml-72 mt-24'>
                <div className='bg-gray-300 p-1  rounded-lg mr-2 flex items-center gap-2'>
                    <div className='flex items-center justify-start gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
                            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
                        </svg>
                        <span>Home</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                    </svg>
                    <div className='flex items-center justify-start gap-2'>
                        <span>Users</span>
                    </div>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                    </svg>
                    <div className='flex items-center justify-start gap-2'>
                        <span>Manage</span>
                    </div> */}
                </div>

                <section class="pt-5 dark:bg-gray-900 w-full h-full pr-3">
                    <div class="mx-auto max-w-screen ">
                        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                            <div class="flex items-center space-y-3 md:space-y-0 md:space-x-4 p-2 ">
                                <caption class="w-full p-2 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                    Manage Users
                                </caption>
                                <select type="text" onChange={(e) => filterData(e)} name="full_name" id="full_name" class="text-sm h-8 w-48 border mt-1 rounded px-3 bg-gray-50" value={filterStatus} >
                                    <option value="ALL">All</option>
                                    <option value="ACTIVE">Active</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="INACTIVE">Inactive</option>
                                    <option value="REJECTED">Rejected</option>
                                </select>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tools" viewBox="0 0 16 16">
                                    <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" />
                                </svg>
                            </div>
                            <div class="overflow-x-auto">
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="p-4">
                                                <div class="flex items-center">
                                                    <input
                                                        id="checkbox-all"
                                                        type="checkbox"
                                                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    />
                                                    <label for="checkbox-all" class="sr-only">
                                                        checkbox
                                                    </label>
                                                </div>
                                            </th>

                                            <th scope="col" class="px-4 py-3 ">
                                                Fullname
                                            </th>
                                            <th scope="col" class="px-4 py-3">
                                                Email
                                            </th>

                                            <th scope="col" class="px-4 py-3">
                                                Username
                                            </th>

                                            <th scope="col" class="px-4 py-3">
                                                DOB
                                            </th>
                                            <th scope="col" class="px-4 py-3">
                                                Contact No
                                            </th>
                                            <th scope="col" class="px-4 py-3">
                                                status
                                            </th>
                                            <th scope="col" class="px-4 py-3 text-center">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.length > 0 && users.map((user) => {
                                            return (
                                                <tr class="border-b  dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td class="w-4 px-4 py-3">
                                                        <div class="flex items-center">
                                                            <input
                                                                id="checkbox-table-search-1"
                                                                type="checkbox"
                                                                onclick="event.stopPropagation()"
                                                                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                            />
                                                            <label
                                                                for="checkbox-table-search-1"
                                                                class="sr-only"
                                                            >
                                                                checkbox
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <th
                                                        scope="row"
                                                        class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        {user.UserFirstname + " " + user.UserLastname}
                                                    </th>
                                                    <td class="px-4 py-3 ">
                                                        {user.UserEmail}
                                                    </td>
                                                    <td class="px-4 py-3 text-center">
                                                        {user.UserName}
                                                    </td>
                                                    <td class="px-4 py-3 ">
                                                        {user.DOB}
                                                    </td>
                                                    <td class="px-4 py-3 ">
                                                        {user.ContactNo}
                                                    </td>
                                                    <td class="px-4 py-3 text-center">
                                                        {user.Status == "PENDING" &&
                                                            <div className='border border-orange-400 flex items-center justify-center w-24 p-1 rounded-lg bg-orange-100 gap-2 ' >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" class="bi bi-clock" viewBox="0 0 16 16">
                                                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                                                </svg>
                                                                <span className='text-xs text-orange-400 font-medium'>Pending</span>
                                                            </div>
                                                        }
                                                        {user.Status == "REJECTED" &&
                                                            <div className='border border-red-400 flex items-center justify-center w-24 p-1 rounded-lg bg-red-100 gap-2 ' >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-person-slash" viewBox="0 0 16 16">
                                                                    <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465m-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                                                                </svg>
                                                                <span className='text-xs text-red-400 font-medium'>Rejected</span>
                                                            </div>
                                                        }
                                                        {user.Status == "ACTIVE" &&
                                                            <div className='border border-green-400 flex items-center justify-center w-24 p-1 rounded-lg bg-green-100 gap-2 ' >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-person-check-fill" viewBox="0 0 16 16">
                                                                    <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                                                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                                                </svg>
                                                                <span className='text-xs text-green-400 font-medium'>Active</span>
                                                            </div>
                                                        }
                                                        {user.Status == "INACTIVE" &&
                                                            <div className='border border-red-400 flex items-center justify-center w-24 p-1 rounded-lg bg-red-100 gap-2 ' >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-person-x-fill" viewBox="0 0 16 16">
                                                                    <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708" />
                                                                </svg>
                                                                <span className='text-xs text-red-400 font-medium'>Inactive</span>
                                                            </div>
                                                        }
                                                    </td>
                                                    <td class="px-4 py-3 text-center ">
                                                        <div className='relative flex gap-2 items-center justify-center'>
                                                            <button
                                                                className='px-3 py-1 rounded-lg border-blue-400 border bg-blue-400 text-white hover:bg-blue-500'
                                                            >
                                                                View
                                                            </button>
                                                            {user.Status == "ACTIVE" &&
                                                                <button
                                                                    className='px-3 py-1 rounded-lg border-orange-400 border bg-orange-400 text-white hover:bg-orange-500'
                                                                    onClick={() => InactiveUser(user)}
                                                                >
                                                                    Inactive
                                                                </button>
                                                            }
                                                            {user.Status == "INACTIVE" &&
                                                                <button
                                                                    className='px-3 py-1 rounded-lg border-green-400 border bg-green-400 text-white hover:bg-green-500'
                                                                    onClick={() => ApproveUser(user)}
                                                                >
                                                                    Active
                                                                </button>}
                                                            {user.Status === "PENDING" &&
                                                                <>
                                                                    <button
                                                                        className='px-3 py-1 rounded-lg border-green-400 border bg-green-400 text-white hover:bg-green-500'
                                                                        onClick={() => ApproveUser(user)}
                                                                    >
                                                                        Approve
                                                                    </button>
                                                                    <button
                                                                        className='px-3 py-1 rounded-lg border-red-400 border bg-red-400 text-white hover:bg-red-500'
                                                                        onClick={() => RejectUser(user)}
                                                                    >
                                                                        Reject
                                                                    </button>
                                                                </>
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default AdminUsersManage