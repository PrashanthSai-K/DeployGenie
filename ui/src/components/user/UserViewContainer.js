import React, { useEffect, useState, useRef } from 'react'
import UserSidebar from '../navbar/UserSidebar'
import { useAsyncError, useParams } from 'react-router-dom'
import ContainerCPUChart from '../others/ConatinerCPUChart';
import ContainerMemChart from '../others/ConatinerMemChart';
import { ErrorNotify, SuccessNotify, userGetRequest, userPostRequest } from '../others/extras';
import ContainerDiskMetrics from '../others/ContainerDiskMetrics';
import ApprovalPopup from '../others/ApprovalPopup';

function UserViewContainer() {

    // <<<<----------Message & Error realted variables and function------------->>>>
    const [message, setMessage] = useState();
    const [error, setError] = useState();

    const clearNotify = () => {
        setTimeout(() => {
            setMessage();
            setError();
        }, 5000)
    }

    const cont_name = useParams("name");

    const [containerData, setContainerData] = useState();
    const [portData, setPortdata] = useState();


    const fetchContData = async () => {
        try {
            const response = await userGetRequest(`/v1/api/container/byname/${cont_name.name}`);

            setContainerData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPortData = async () => {
        try {
            const response = await userGetRequest(`/v1/api/port/bycontainer/${cont_name.name}`)
            setPortdata(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchContData();
        fetchPortData();
    }, [])


    const [dropdownVisible, setDropdownVisible] = useState(null);
    const dropdownRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);


    const handleActionClick = (event, userId) => {
        event.stopPropagation();
        setDropdownVisible(dropdownVisible === userId ? null : userId);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(null);
        }
    };

    useEffect(() => {
        if (isLoading != false) {
            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, []);

    const StopRequest = async (data) => {
        try {
            setIsLoading(true);
            const response = await userPostRequest('/v1/api/container/user/stop', data);
            fetchContData();
            setIsLoading(false);
            setMessage(response.data.message);
            clearNotify();
            setDropdownVisible(null);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
                setIsLoading(false);
                clearNotify();
            }
        }
    }

    const StartRequest = async (data) => {
        try {
            setIsLoading(true);
            const response = await userPostRequest('/v1/api/container/user/start', data);
            fetchContData();
            setIsLoading(false);
            setMessage(response.data.message);
            clearNotify();
            setDropdownVisible(null);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
                clearNotify();
                setIsLoading(false);
            }
        }
    }

    const TerminateRequest = async (data) => {
        try {
            setIsLoading(true);
            const response = await userPostRequest('/v1/api/container/user/terminate', data);
            fetchContData();
            setMessage(response.data.message);
            clearNotify();
            setIsLoading(false);
            setDropdownVisible(null);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
                clearNotify();
                setIsLoading(false);
            }
        }
    }

    const [approvePopupVisible, setApprovePopupVisible] = useState(false);
    const [callbackFunction, setCallbackFunction] = useState(null);
    const [stage, setStage] = useState("");
    const [popupData, setPopupData] = useState({});

    return (
        <>
            <UserSidebar />

            {message ? <SuccessNotify message={message} /> : null}
            {error ? <ErrorNotify message={error} /> : null}

            {/* Approval Modal */}
            <ApprovalPopup
                isVisible={approvePopupVisible}
                setIsvisible={setApprovePopupVisible}
                stage={stage}
                callbackFunction={callbackFunction}
                data={popupData}
            />

            <div className='ml-2 sm:ml-72 mt-24'>
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
                        <span>View</span>
                    </div>
                </div>
                <h1 className='pt-4 font-semibold text-xl'>Container Metrics</h1>
                <div className='flex flex-col lg:flex-row items-center lg:justify-center lg:gap-6 min-h-96  w-full'>
                    <ContainerCPUChart container_name={cont_name.name} />
                    <ContainerMemChart container_name={cont_name.name} />
                </div>
                <div className='flex flex-col lg:flex-row items-center lg:justify-center lg:gap-6 min-h-96 w-full'>
                    <ContainerDiskMetrics container_name={cont_name.name} />
                </div>
                <section class="pt-5 dark:bg-gray-900 w-full h-full pr-3">
                    <div class="mx-auto max-w-screen ">
                        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                            <div class="flex items-center space-y-3 md:space-y-0 md:space-x-4 p-2 ">
                                <caption class="w-full p-2 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                    Containers Data
                                </caption>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tools" viewBox="0 0 16 16">
                                    <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" />
                                </svg>
                            </div>
                            <div class="overflow-x-auto pb-8">
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
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
                                                expiry date
                                            </th>
                                            <th scope="col" class="px-4 py-3">
                                                status
                                            </th>
                                            <th scope="col" class="px-4 py-3">

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            containerData && (
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
                                                        {containerData.ContainerId}
                                                    </th>
                                                    <td class="px-4 py-3 ">
                                                        {containerData.ContainerName}
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        {containerData.ServiceType}
                                                    </td>
                                                    <td class="px-4 py-3 ">
                                                        {containerData.ExpiryDate}
                                                    </td>
                                                    <td class="px-4 py-3 text-center">
                                                        {containerData.Status == "pending" &&
                                                            <div className='border border-orange-400 flex items-center justify-center w-24 p-1 rounded-lg bg-orange-100 gap-2 ' >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" className="bi bi-clock" viewBox="0 0 16 16">
                                                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                                                </svg>
                                                                <span className='text-xs text-orange-400 font-medium'>Pending</span>
                                                            </div>
                                                        }
                                                        {containerData.Status == "exited" &&
                                                            <div className='border border-red-400 flex items-center justify-center w-24 p-1 rounded-lg bg-red-100 gap-2 ' >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-gear" viewBox="0 0 16 16">
                                                                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                                                                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                                                                </svg>
                                                                <span className='text-xs text-red-600 font-medium'>Stopped</span>
                                                            </div>
                                                        }
                                                        {containerData.Status == "rejected" &&
                                                            <div className='border border-red-400 flex items-center justify-center w-24 p-1 rounded-lg bg-red-100 gap-2 ' >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-gear" viewBox="0 0 16 16">
                                                                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                                                                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                                                                </svg>
                                                                <span className='text-xs text-red-600 font-medium'>Rejected</span>
                                                            </div>
                                                        }
                                                        {containerData.Status == "running" &&
                                                            <div className='border border-green-400 flex items-center justify-center w-24 p-1 rounded-lg bg-green-100 gap-2 ' >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-gear-wide-connected" viewBox="0 0 16 16">
                                                                    <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5m0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78zM5.048 3.967l-.087.065zm-.431.355A4.98 4.98 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8zm.344 7.646.087.065z" />
                                                                </svg>
                                                                <span className='text-xs text-green-600 font-medium'>Running</span>
                                                            </div>
                                                        }
                                                        {containerData.Status == "terminated" &&
                                                            <div className='border border-red-400 flex items-center justify-center w-24 p-1 rounded-lg bg-red-100 gap-2 ' >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-ban" viewBox="0 0 16 16">
                                                                    <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0" />
                                                                </svg>
                                                                <span className='text-xms text-red-600 font-medium'>Terminated</span>
                                                            </div>
                                                        }
                                                    </td>
                                                    <td className=" relative px-4 py-3 flex items-center ">
                                                        <button
                                                            data-dropdown-toggle="apple-imac-27-dropdown"
                                                            onClick={(e) => handleActionClick(e, containerData.Id)}
                                                            className={`inline-flex items-center p-0.5 text-sm font-medium text-center ${dropdownVisible === containerData.Id ? "border" : ""}  text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100`}
                                                            type="button"
                                                        >
                                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            </svg>
                                                        </button>

                                                        {dropdownVisible === containerData.Id && (

                                                            <div ref={dropdownRef} className="absolute -top-5 right-20  w-32 dropdown-content visible z-40 bg-white dark:bg-gray-800 shadow-md rounded-lg">
                                                                <ul className="py-1 px-1 text-sm text-gray-700 dark:text-gray-200 min-h-20 " aria-labelledby="apple-imac-27-dropdown-button">
                                                                    <>
                                                                        {
                                                                            isLoading &&
                                                                            <center>
                                                                                <li role="status" className='p-2'>
                                                                                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                                                    </svg>
                                                                                    <span class="sr-only">Loading...</span>
                                                                                </li>
                                                                            </center>
                                                                        }
                                                                        {!isLoading &&
                                                                            <li>
                                                                                <a href={`/user/container/view/${containerData.ContainerName}`} className="block py-1 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">View</a>
                                                                            </li>
                                                                        }
                                                                        {
                                                                            !isLoading && containerData.Status === "running" &&
                                                                            <li
                                                                                className="block py-1 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                                                onClick={() => {
                                                                                    setCallbackFunction(() => StopRequest);
                                                                                    setApprovePopupVisible(true);
                                                                                    setPopupData(containerData);
                                                                                    setStage("stop container");
                                                                                    setDropdownVisible(null);
                                                                                }}
                                                                            >
                                                                                Stop
                                                                            </li>
                                                                        }
                                                                        {
                                                                            !isLoading && containerData.Status === "running" &&
                                                                            <li
                                                                                className="block py-1 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                                                onClick={() => {
                                                                                    setCallbackFunction(() => TerminateRequest);
                                                                                    setApprovePopupVisible(true);
                                                                                    setPopupData(containerData);
                                                                                    setStage("terminate container");
                                                                                    setDropdownVisible(null);
                                                                                }}
                                                                            >
                                                                                Terminate
                                                                            </li>
                                                                        }
                                                                        {
                                                                            !isLoading && containerData.Status === "exited" &&
                                                                            <li
                                                                                className="block py-1 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                                                onClick={() => {
                                                                                    setCallbackFunction(() => StartRequest);
                                                                                    setApprovePopupVisible(true);
                                                                                    setPopupData(containerData);
                                                                                    setStage("start container");
                                                                                    setDropdownVisible(null);
                                                                                }}
                                                                            >
                                                                                Start
                                                                            </li>
                                                                        }
                                                                        {
                                                                            !isLoading && containerData.Status === "exited" &&
                                                                            <li
                                                                                className="block py-1 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                                                onClick={() => {
                                                                                    setCallbackFunction(() => TerminateRequest);
                                                                                    setApprovePopupVisible(true);
                                                                                    setPopupData(containerData);
                                                                                    setStage("terminate container");
                                                                                    setDropdownVisible(null);
                                                                                }}
                                                                            >
                                                                                Terminate
                                                                            </li>
                                                                        }
                                                                    </>
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="pt-5 dark:bg-gray-900 w-full h-full pr-3">
                    <div class="mx-auto max-w-screen ">
                        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                            <div class="flex items-center space-y-3 md:space-y-0 md:space-x-4 p-2 ">
                                <caption class="w-full p-2 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                    Port List
                                </caption>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tools" viewBox="0 0 16 16">
                                    <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" />
                                </svg>
                            </div>
                            <div class="overflow-x-auto pb-8">
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
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
                                                Port name
                                            </th>
                                            <th scope="col" class="px-4 py-3">
                                                Port no
                                            </th>

                                            <th scope="col" class="px-4 py-3">
                                                Access Link
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            portData && portData.map((port) => {
                                                return (
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
                                                            {port.PortUsage}
                                                        </th>
                                                        <td class="px-4 py-3 ">
                                                            {port.Port}
                                                        </td>
                                                        <td class="px-4 py-3 ">
                                                            {port.PortUsage == "DB" &&
                                                                <div> {`IP : 10.10.237.157, Port : ${port.Port}`}</div>
                                                            }
                                                            {port.PortUsage == "UI" ?
                                                                containerData.ImageName == "prashanthks/mysql_image" ?
                                                                    <a target='blank' href={`http://10.10.237.157:${port.Port}/phpmyadmin`}> {`http://10.10.237.157:${port.Port}/phpmyadmin`}</a>
                                                                    : <a target='blank' href={`http://10.10.237.157:${port.Port}/`}> {`http://10.10.237.157:${port.Port}`}</a>
                                                                : ""
                                                            }
                                                            {
                                                                port.PortUsage == "WEB SSH" &&
                                                                <a target='blank' href={`http://10.10.237.157:${port.Port}`}>{`http://10.10.237.157:${port.Port}`}</a>
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="pt-5 dark:bg-gray-900 w-full h-full pr-3">
                    <div class="mx-auto max-w-screen ">
                        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                            <div class="flex items-center space-y-3 md:space-y-0 md:space-x-4 p-2 ">
                                <caption class="w-full p-2 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                    Image Data
                                </caption>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tools" viewBox="0 0 16 16">
                                    <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" />
                                </svg>
                            </div>
                            <div class="overflow-x-auto pb-8">
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
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
                                                Image Id
                                            </th>
                                            <th scope="col" class="px-4 py-3">
                                                Image Name
                                            </th>

                                            <th scope="col" class="px-4 py-3">
                                                Tag
                                            </th>

                                            <th scope="col" class="px-4 py-3">
                                                Size
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            containerData && (
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
                                                        {containerData.ImageId}
                                                    </th>
                                                    <td class="px-4 py-3 ">
                                                        {containerData.ImageName}
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        {containerData.ImageTag}
                                                    </td>
                                                    <td class="px-4 py-3 ">
                                                        {containerData.ImageSize}
                                                    </td>

                                                </tr>
                                            )
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="pt-5 dark:bg-gray-900 w-full h-full pr-3">
                    <div class="mx-auto max-w-screen ">
                        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                            <div class="flex items-center space-y-3 md:space-y-0 md:space-x-4 p-2 ">
                                <caption class="w-full p-2 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                    Volume Data
                                </caption>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tools" viewBox="0 0 16 16">
                                    <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" />
                                </svg>
                            </div>
                            <div class="overflow-x-auto pb-8">
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
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
                                                Volume id
                                            </th>
                                            <th scope="col" class="px-4 py-3">
                                                Volume Name
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            containerData && (
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
                                                        {containerData.VolumeId ? containerData.VolumeId : "-"}
                                                    </th>
                                                    <td class="px-4 py-3 ">
                                                        {containerData.VolumeName ? containerData.VolumeName : "-"}
                                                    </td>
                                                </tr>
                                            )
                                        }
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

export default UserViewContainer