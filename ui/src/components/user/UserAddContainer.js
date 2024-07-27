import React from 'react'
import UserSidebar from '../navbar/UserSidebar'

function UserAddContainer() {
    return (
        <>
            <UserSidebar />
            <div className='ml-2 sm:ml-72 sm:mt-24'>
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
                                    <div class="grid gap-4 gap-y-3 text-sm grid-cols-1 md:grid-cols-5">
                                        <div class="md:col-span-3">
                                            <div className='flex items-center gap-2'>
                                                <label for="full_name">Service Type<span className='text-red-600'>*</span></label>
                                                <div className='cursor-pointer opacity-70' title='Select required container type'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <select type="text" name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" >
                                                <option value="">Select type</option>
                                                <option value="">Database</option>
                                                <option value="">Virtual Machine</option>
                                            </select>
                                        </div>
                                        <div class="md:col-span-2">
                                            <div className='flex items-center gap-2'>
                                                <label for="full_name">Image required<span className='text-red-600'>*</span></label>
                                                <div className='cursor-pointer opacity-70' title='Select required container type'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <select type="text" name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" >
                                                <option value="">Select type</option>
                                                <option value="">Mysql</option>
                                                <option value="">MongoDB</option>
                                                <option value="">Redis</option>
                                            </select>                                        </div>
                                        <div class="md:col-span-5">
                                            <div className='flex items-center gap-2'>
                                                <label for="full_name">Conatiner Name<span className='text-red-600'>*</span></label>
                                                <div className='cursor-pointer opacity-70' title='fill out the field dont use whitespaces use only "_", no other symbols. use lowercase aphabets only'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <input type="text" name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" />
                                        </div>

                                        <div class="md:col-span-3">
                                            <label for="address">Reason</label>
                                            <input type="text" name="address" id="address" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
                                        </div>

                                        <div class="md:col-span-2">
                                            <label for="city">Outcome</label>
                                            <input type="text" name="city" id="city" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
                                        </div>

                                        <div class="md:col-span-5 text-right">
                                            <div class="inline-flex items-end">
                                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                                            </div>
                                        </div>
                                    </div>
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