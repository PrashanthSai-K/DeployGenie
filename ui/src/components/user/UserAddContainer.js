import React, { useEffect, useState } from 'react'
import UserSidebar from '../navbar/UserSidebar'
import { ErrorNotify, SuccessNotify, userGetRequest, userPostRequest } from '../others/extras';

function UserAddContainer() {

    const data = {
        ServiceType: "",
        ImageId: "",
        ExpiryDate: "",
        Presistent: "",
        Outcome: "",
        Reason: "",
        NewUser:"",
        NewPassword:""
    }

    const [message, setMessage] = useState();
    const [error, setError] = useState();

    const clearNotify = () => {
        setTimeout(() => {
            setMessage();
            setError();
        }, 5000)
    }

    const [formData, setFormData] = useState(data);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const [user, setUser] = useState();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("User")));
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await userPostRequest("/v1/api/container", { ...formData, UserId: user.Id });
            setFormData(data);
            setMessage(response.data.message);
            clearNotify();
        } catch (error) {
            if (error && error.response) {
                setError(error.response.data.message);
                clearNotify();
            }
        }
    }

    return (

        <>
            <UserSidebar />

            {message ? <SuccessNotify message={message} /> : null}
            {error ? <ErrorNotify message={error} /> : null}

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
                        <span>New</span>
                    </div>
                </div>
                <div class="pt-12 flex justify-start">
                    <div>
                        <h2 class="font-semibold text-xl text-gray-600">Container Creation</h2>
                        <p class="text-gray-500 mb-6">Moments before deployment</p>

                        <div class="bg-white rounded p-4 px-3 md:p-5 mb-6">
                            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
                                <div class="text-gray-600">
                                    <p class="font-medium text-lg">Conatainer Details</p>
                                    <p>Please fill out all the <span className='text-red-600'>*</span> fields.</p>
                                </div>
                                <div class="lg:col-span-2 p-10 rounded-lg border border-dark-blue">
                                    <form onSubmit={handleSubmit}>

                                        <div class="grid gap-4 gap-y-3 text-sm grid-cols-1 md:grid-cols-5">
                                            <div class="md:col-span-3">
                                                <div className='flex items-center gap-2'>
                                                    <label for="ServiceType">Service Type<span className='text-red-600'>*</span></label>
                                                    <div className='cursor-pointer opacity-70' title='Select required service type'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <select type="text" name="ServiceType" id="ServiceType" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required onChange={handleChange} value={formData.ServiceType}>
                                                    <option value="">Select type</option>
                                                    <option value="Database">Database</option>
                                                    {/* <option value="OS">OS</option> */}
                                                </select>
                                            </div>

                                            <div class="md:col-span-2">
                                                <div className='flex items-center gap-2'>
                                                    <label for="ImageName">Image required<span className='text-red-600'>*</span></label>
                                                    <div className='cursor-pointer opacity-70' title='Select required image based on the service'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <select type="text" name="ImageId" id="ImageId" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required
                                                    value={formData.ImageId}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) })
                                                    }} >
                                                    <option value="">Select type</option>
                                                    <option value={1}>Mysql</option>
                                                    <option value={2}>MongoDB</option>
                                                    <option value={3}>Redis</option>
                                                </select>
                                            </div>

                                            <div class="md:col-span-3">
                                                <div className='flex items-center gap-2'>
                                                    <label for="ExpiryDate">Expiry Date<span className='text-red-600'>*</span></label>
                                                    <div className='cursor-pointer opacity-70' title='Choose Expiration Date for the requested service, Can be extended in future.'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <input type="date" name="ExpiryDate" id="ExpiryDate" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required value={formData.ExpiryDate} onChange={handleChange} />
                                            </div>

                                            <div class="md:col-span-1">
                                                <div className='flex items-center gap-2'>
                                                    <label for="Presistent">Presistent<span className='text-red-600'>*</span></label>
                                                    <div className='cursor-pointer opacity-70' title='After Expiration, Do you need you data to be Presistent ?'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className='flex gap-5 pt-4'>
                                                    <div className='flex gap-1'>
                                                        <input type="radio" name="Presistent" id="Presistent1" class="" required value={formData.Presistent} onChange={handleChange} />
                                                        <label for="Presistent1">Yes</label>
                                                    </div>
                                                    <div className='flex gap-1'>
                                                        <input type="radio" name="Presistent" id="Presistent2" class=""  required value={formData.Presistent} onChange={handleChange} />
                                                        <label for="Presistent2">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="md:col-span-5">
                                                <div className='flex items-center gap-2'>
                                                    <label for="note" className='text-red-600 font-medium'>Note</label>
                                                </div>
                                                <input type="text" name="note" id="note" class="h-5 mt-1 rounded px-2 w-full text-xs bg-white" required disabled value="Username & Password Once entered cannot be shown , remember it" />
                                            </div>
                                            <div class="md:col-span-2">
                                                <div className='flex items-center gap-2'>
                                                    <label for="NewUser">Username<span className='text-red-600'>*</span></label>
                                                    <div className='cursor-pointer opacity-70' title='Choose Expiration Date for the requested service, Can be extended in future.'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <input type="text" name="NewUser" id="NewUser" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required value={formData.NewUser} onChange={handleChange} />
                                            </div>
                                            <div class="md:col-span-3">
                                                <div className='flex items-center gap-2'>
                                                    <label for="NewPassword">Password<span className='text-red-600'>*</span></label>
                                                    <div className='cursor-pointer opacity-70' title='Choose Expiration Date for the requested service, Can be extended in future.'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <input type="text" name="NewPassword" id="NewPassword" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required value={formData.NewPassword} onChange={handleChange} />
                                            </div>

                                            <div class="md:col-span-2">
                                                <div className='flex items-center gap-2'>
                                                    <label for="Outcome">Outcome<span className='text-red-600'>*</span></label>
                                                    <div className='cursor-pointer opacity-70' title='After Expiration, Do you need you data to be Presistent ?'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <textarea type="text" name="Outcome" id="Outcome" class="h-16 border mt-1 rounded px-4 w-full bg-gray-50" required value={formData.Outcome} onChange={handleChange} />                                      </div>

                                            <div class="md:col-span-3">
                                                <div className='flex items-center gap-2'>
                                                    <label for="Reason">Reason<span className='text-red-600'>*</span></label>
                                                    <div className='cursor-pointer opacity-70' title='After Expiration, Do you need you data to be Presistent ?'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <textarea type="text" name="Reason" id="Reason" class="h-16 border mt-1 rounded px-4 w-full bg-gray-50" required value={formData.Reason} onChange={handleChange} />
                                            </div>

                                            <div class="md:col-span-5 text-right">
                                                <div class="inline-flex items-end">
                                                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type='submit'>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserAddContainer