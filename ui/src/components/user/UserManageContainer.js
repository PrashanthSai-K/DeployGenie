import React, { useState, useEffect } from 'react'
import UserSidebar from '../navbar/UserSidebar';

function UserManageContainer() {

    const [appointmentdata, setAppointmentdata] = useState();

    const [medicalrecords, setmedicalrecords] = useState();


    const [Prescription, setPrescription] = useState();


    return (
        <>
            <UserSidebar />
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
                        <span>Container</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                    </svg>
                    <div className='flex items-center justify-start gap-2'>
                        <span>Manage</span>
                    </div>
                </div>

                <section class="pt-5 dark:bg-gray-900 w-full h-full pr-3">
                    <div class="mx-auto max-w-screen ">
                        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                            <div class="flex items-center space-y-3 md:space-y-0 md:space-x-4 p-2 ">
                                <caption class="w-full p-2 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                    Manage Containers
                                </caption>
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
                                                Container id
                                            </th>
                                            <th scope="col" class="px-4 py-3">
                                                Conatiner Name
                                            </th>

                                            <th scope="col" class="px-4 py-3">
                                                service type
                                            </th>

                                            <th scope="col" class="px-4 py-3">
                                                image name
                                            </th>
                                            <th scope="col" class="px-4 py-3">
                                                expiry date
                                            </th>
                                            <th scope="col" class="px-4 py-3">
                                                status
                                            </th>
                                            <th scope="col" class="px-4 py-3">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                                                {/* {new Date(
                                                        appointmentdata.AppointmentDate
                                                    ).toLocaleDateString()} */}
                                            </th>
                                            <td class="px-4 py-3 ">
                                                {/* {appointmentdata.AppointmentTime} */}
                                            </td>
                                            <td class="px-4 py-3 text-center">
                                                {/* {appointmentdata.AppointmentStatus ==
                                                        "completed" && (
                                                            <span class="bg-green-100 text-green-800 text-sm font-medium mr-2 inline-flex items-center px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 border border-green-400">
                                                                <svg
                                                                    class="w-3 h-3 mr-2 "
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path
                                                                        fill="currentColor"
                                                                        d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
                                                                    />
                                                                    <path
                                                                        fill="#fff"
                                                                        d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
                                                                    />
                                                                </svg>
                                                                Completed
                                                            </span>
                                                        )}
                                                    {appointmentdata.AppointmentStatus ==
                                                        "booked" && (
                                                            <span class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 inline-flex items-center px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 border border-blue-400">
                                                                <svg
                                                                    class="w-3 h-3 mr-2 "
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                                                                </svg>
                                                                Booked
                                                            </span>
                                                        )} */}
                                                {/* {appointmentdata.AppointmentStatus ==
                                                        "cancelled" && (
                                                            <span class="bg-red-100 text-red-800 text-sm font-medium mr-2 inline-flex items-center px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 border border-red-400">
                                                                <svg
                                                                    class="w-3 h-3 mr-2 "
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                                                                </svg>
                                                                Cancelled
                                                            </span>
                                                        )}
                                                    {appointmentdata.AppointmentStatus ==
                                                        "waiting" && (
                                                            <span class="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 inline-flex items-center px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 border border-yellow-400">
                                                                <svg
                                                                    class="w-3 h-3 mr-2 "
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                                                                </svg>
                                                                Waiting
                                                            </span>
                                                        )} */}
                                            </td>
                                            <td class="px-4 py-3 ">
                                                {/* {appointmentdata.AppointmentRemark} */}
                                            </td>
                                            <td class="px-4 py-3 ">
                                                {" "}
                                                {/* {appointmentdata.AppointmentReason} */}
                                            </td>
                                            <td class="px-4 py-3 text-center">
                                                {/* {appointmentdata.MedicalRecordStatus == 1 && (
                                                        <span class="inline-flex items-center justify-center w-6 h-6 mr-2 text-sm font-semibold text-green-800 bg-blue-100 rounded-full dark:bg-gray-700 dark:text-green-400">
                                                            <svg
                                                                class="w-4 h-4"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path
                                                                    fill="currentColor"
                                                                    d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
                                                                />
                                                                <path
                                                                    fill="#fff"
                                                                    d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
                                                                />
                                                            </svg>
                                                            <span class="sr-only">Done</span>
                                                        </span>
                                                    )}
                                                    {appointmentdata.MedicalRecordStatus == 0 && ( */}
                                                {/* <span class="inline-flex items-center justify-center w-6 h-6 mr-2 text-sm font-semibold text-red-800 bg-blue-100 rounded-full dark:bg-gray-700 dark:text-red-400">
                                                            <svg
                                                                class="w-4 h-4"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                                                            </svg>
                                                            <span class="sr-only">Done</span>
                                                        </span>
                                                    )} */}
                                            </td>
                                            <td class="px-4 py-3 text-center">
                                                <div className="flex space-x-2">
                                                    {/* {appointmentdata.MedicalRecordStatus == 1 && appointmentdata.AppointmentStatus == 'booked' && medicalrecords && (

                                                            < EditMedicalrecord
                                                                AppointmentId={appointmentdata.AppointmentId}
                                                                DoctorId={appointmentdata.DoctorId}
                                                                PatientId={appointmentdata.PatientId}
                                                                fetch_appointment_data={fetch_appointment_data}
                                                                row={medicalrecords}
                                                            />
                                                        )}
                                                        {appointmentdata.MedicalRecordStatus == 1 && (
                                                            <button
                                                                onClick={() =>
                                                                    navigate(`/user/medicalrecords/view/${appointmentdata.MedicalRecordId}/${appointmentdata.PatientId}`)
                                                                }
                                                                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                                                            >
                                                                View
                                                            </button>
                                                        )} */}
                                                </div>
                                                {/* {appointmentdata.MedicalRecordStatus == 0 && (
                                                        <AddMedicalrecord
                                                            AppointmentId={appointmentdata.AppointmentId}
                                                            DoctorId={appointmentdata.DoctorId}
                                                            PatientId={appointmentdata.PatientId}
                                                            fetch_appointment_data={fetch_appointment_data}
                                                        />
                                                    )} */}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* </div> */}
        </>
    )
}

export default UserManageContainer


