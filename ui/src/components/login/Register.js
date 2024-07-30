import React, { useState } from 'react'
import { ErrorNotify, postRequest, SuccessNotify } from '../others/extras';
import { toast, ToastContainer } from 'react-toastify';

function Register() {

    const data = {
        UserFirstname:"",
        UserLastname:"",
        UserName: "",
        UserEmail: "",
        ContactNo: "",
        DOB: "",
        Password: "",
    }

    const [message, setMessage] = useState();
    const [error, setError] = useState();

    const clearNotify = () => {
        setTimeout(() => {
            setMessage();
            setError();
        }, 5000)
    }

    const [formData, setFormData] = useState(data)

    const [passwordError, setPasswordError] = useState();

    const validPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/

    const passwordValidator = (e) => {
        const pass = e.target.value
        setFormData({ ...formData, [e.target.name]: e.target.value });
        const lowercase = /[a-z]/
        const uppercase = /[A-Z]/
        const number = /[0-9]/
        const sym = /\W/
        if (!pass.match(lowercase)) {
            setPasswordError("Password must conatin one Lowercase alphabet");
        } else if (!pass.match(uppercase)) {
            setPasswordError("Password must conatin one Uppercase alphabet");
        } else if (!pass.match(number)) {
            setPasswordError("Password must conatin one Number");
        } else if (!pass.match(sym)) {
            setPasswordError("Password must conatin one Symbol");
        } else if (!(pass.length >= 8 && pass.length <= 16)) {
            setPasswordError("Password Length mush be 8 - 16");
        } else {
            setPasswordError("");
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postRequest("/api/user", formData);
            if (response.status === 202) {
                setMessage("Created Successfully, wait till admin approves");
                clearNotify();
                setFormData(data);
            }
        } catch (error) {
            if (error.response && error.response.status === 406) {
                let mess = error.response.data.message;
                setError(mess);
                clearNotify();
            };
        }
    }

    return (
        <>
            {message ? <SuccessNotify message={message} /> : null}
            {error ? <ErrorNotify message={error} /> : null}

            <div className='bg-gray-100 h-screen w-full flex items-center px-5 justify-center' >
                <nav className='fixed top-0 h-20 z-40 p-2 w-full '>
                    <div className='flex bg-dark-blue w-full h-full rounded-2xl items-center justify-between p-5'>
                        <div className=' flex items-center justify-center gap-3'>
                            <div
                                // className=''
                                data-drawer-target="side-bar"
                                data-drawer-toggle="side-bar"
                                aria-controls="side-bar"
                                className={` sm:hidden transition-all duration-500`}
                            // onClick={toggleNavBar}
                            >
                                <img src='/images/app.png' className=' w-6 text-white' />
                            </div>
                            <img className='w-40 sm:w-56' src="/images/logo-no-background.png" alt="" />
                        </div>
                        <a
                            className='bg-white p-1 rounded-lg px-4 hover:bg-gray-300'
                            href='/'
                        >
                            Login
                        </a>
                    </div>
                </nav>
                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded p-4 px-3 md:p-5 mb-6">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
                            <div className="text-gray-600">
                                <p className="font-medium text-lg">Register Yourself</p>
                                <p>Please fill out all the <span className='text-red-600'>*</span> fields.</p>
                            </div>
                            <div className="lg:col-span-2 p-10 rounded-lg border border-dark-blue">
                                <div className="grid gap-4 gap-y-3 text-sm grid-cols-1 md:grid-cols-5">
                                    <div className="md:col-span-3">
                                        <div className='flex items-center gap-2'>
                                            <label htmlFor="full_name">Firstname<span className='text-red-600'>*</span></label>
                                            <div className='cursor-pointer opacity-70' title='Enter your Firstname'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                </svg>
                                            </div>
                                        </div>
                                        <input type="text" name="UserFirstname" id="UserFirstname" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={formData.UserFirstname} onChange={handleChange} required />
                                    </div>
                                    <div className="md:col-span-2">
                                        <div className='flex items-center gap-2'>
                                            <label htmlFor="full_name">Lastname/Familyname<span className='text-red-600'>*</span></label>
                                            <div className='cursor-pointer opacity-70' title='Enter your lastename/familyname. Usually Initial'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                </svg>
                                            </div>
                                        </div>
                                        <input type="text" name="UserLastname" id="UserLastname" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={formData.UserLastname} onChange={handleChange} required />
                                    </div>
                                    <div className="md:col-span-5">
                                        <div className='flex items-center gap-2'>
                                            <label htmlFor="full_name">Your Email<span className='text-red-600'>*</span></label>
                                            <div className='cursor-pointer opacity-70' title='Enter your email address'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                </svg>
                                            </div>
                                        </div>
                                        <input type="email" name="UserEmail" id="UserEmail" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={formData.UserEmail} onChange={handleChange} required />
                                    </div>

                                    <div className="md:col-span-3">
                                        <div className='flex items-center gap-2'>
                                            <label htmlFor="full_name">Username<span className='text-red-600'>*</span></label>
                                            <div className='cursor-pointer opacity-70' title='Enter a username.Do not use any symbols other than "_", make it unique'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                </svg>
                                            </div>
                                        </div>
                                        <input type="text" name="UserName" id="UserName" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={formData.UserName} onChange={handleChange} required />
                                    </div>
                                    <div className="md:col-span-2">
                                        <div className='flex items-center gap-2'>
                                            <label htmlFor="address">DOB<span className='text-red-600'>*</span></label>
                                            <div className='cursor-pointer opacity-70' title='Enter you Date of Birth'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                </svg>
                                            </div>
                                        </div>
                                        <input type="date" name="DOB" id="DOB" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={formData.DOB} placeholder="" onChange={handleChange} required />
                                    </div>
                                    <div className="md:col-span-5">
                                        <div className='flex items-center gap-2'>
                                            <label htmlFor="full_name">Password<span className='text-red-600'>*</span></label>
                                            <div className='cursor-pointer opacity-70' title='Enter correct password'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                </svg>
                                            </div>
                                        </div>
                                        <input type="password" name="Password" id="Password" className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${formData.Password ? validPassword.test(formData.Password) ? "focus:outline-green-300" : "focus:outline-red-300" : ""}`} value={formData.Password} onChange={(e) => passwordValidator(e)} required />
                                        {formData.Password && passwordError && <span className='text-red-400 text-xxs font-medium'>{passwordError}</span>}
                                        {formData.Password && !passwordError && <span className='text-green-400 text-xxs font-medium'>Password looks perfect!!!</span>}
                                    </div>

                                    <div className="md:col-span-5">
                                        <div className='flex items-center gap-2'>
                                            <label htmlFor="city">Contact No<span className='text-red-600'>*</span></label>
                                            <div className='cursor-pointer opacity-70' title='Enter your mobile number. No need to add country code'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                </svg>
                                            </div>
                                        </div>
                                        <input type="number" name="ContactNo" id="ContactNo" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={formData.ContactNo} placeholder="" onChange={handleChange} required />
                                    </div>

                                    <div className="md:col-span-5 text-right">
                                        <div className="inline-flex items-end">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type='submit'>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </form>
            </div >
        </>
    )
}

export default Register