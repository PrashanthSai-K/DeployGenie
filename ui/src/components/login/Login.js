import React, { useEffect, useState } from 'react'
import { ReactComponent as Logo } from "./Market launch-rafiki.svg"
import { ErrorNotify, postRequest, SuccessNotify } from '../others/extras';
import { redirect, useNavigate } from 'react-router-dom';

function Login() {

    const [message, setMessage] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();

    const clearNotify = (url) => {
        setTimeout(() => {
            setMessage();
            setError();
            navigate(url)

        }, 3000)
    }

    const data = {
        UserName: "",
        Password: ""
    }

    const [formData, setFormData] = useState(data);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postRequest("/v1/api/auth/login", formData);
            console.log(response);
            if(response.status === 202){
                if(response.data.admin){
                    localStorage.setItem("adminKey", response.data.token)
                    setMessage("Login Successful !!")
                    clearNotify("/admin");
                }else{
                    localStorage.setItem("userKey", response.data.token)
                    setMessage("Login Successful !!")
                    clearNotify("/user");
                }
            }
        } catch (error) {
            if (error) {
                setError(error.response.data.message);
                clearNotify();
            }
        }
    }


    return (
        <>
            {message ? <SuccessNotify message={message} /> : null}
            {error ? <ErrorNotify message={error} /> : null}

            <div className='bg-gray-100 h-screen w-full flex items-center px-5 justify-center' >
                <div className='bg-white md:w-4/6 rounded-2xl lg:h-4/6 overflow-hidden flex border border-dark-blue'>
                    <div className=' w-1/2 h-full bg-white hidden lg:block'>
                        <Logo width={"100%"} height={"100%"} />
                    </div>
                    <div className='bg-white h-full w-full lg:w-1/2 py-10 px-10 flex items-center flex-col '>
                        <img className='' src="./images/logo-black.png" alt="" />
                        <h1 className='text-dark-blue text-2xl font-semibold text-center'>Login</h1>
                        <form className='flex flex-col gap-5 items-center  w-full ' onSubmit={handleSubmit}>
                            <div className="relative h-11 w-full min-w-[200px]">
                                <input
                                    placeholder="Username"
                                    name='UserName'
                                    type='text'
                                    onChange={handleChange}
                                    className="peer h-full w-full border-b border-gray-500 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
                                <label
                                    className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Username
                                </label>
                            </div>
                            <div className="relative h-11 w-full min-w-[200px]">
                                <input
                                    placeholder="Password"
                                    name='Password'
                                    type='password'
                                    onChange={handleChange}
                                    className="peer h-full w-full border-b border-gray-500 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
                                <label
                                    className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Password
                                </label>
                            </div>
                            <button href="#_" className="relative w-32 border border-dark-blue text-center p-2 overflow-hidden font-medium transition-all bg-dark-blue rounded-full hover:bg-white group">
                                <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
                                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-dark-blue">Login</span>
                            </button>
                        </form>
                        <a
                            className='pt-3 underline cursor-pointer text-blue-600'
                            href='/register'
                        >New here ?? Click here to Signup</a>
                        <h2 className='pt-5 pb-5 text-center text-xl text-dark-blue'>Or</h2>
                        <center>
                            <button className="flex items-center justify-center  bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                <svg className="h-5 w-10" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
                                <span className='hidden md:block text-xs'>Continue with Google</span>
                                <span className='md:hidden text-xs'>Google</span>
                            </button>
                        </center>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login