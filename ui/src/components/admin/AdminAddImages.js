import React, { useState } from 'react'

function AdminAddImages({isVisible, setIsVisible, setMessage, setError, clearNotify }){

    const data = {
        ImageName: "",
        Tag:"",
        Size: "",
    }

    const [formData, setFormData] = useState(data);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            console.log(formData);
            setFormData(data);
            setIsVisible(false);
            setMessage("Image added successfully");
            clearNotify();
        } catch (error) {
            console.log(error);
            setError("Failed to add image");
            clearNotify();
        }
    }

    if (!isVisible) return null;

    return (
        <>
            <div className='fixed top-0 z-50 w-full h-full backdrop-blur-sm'>
                <div className='w-full h-full flex items-start mt-24 justify-center'>
                    <div className='bg-white h-96 w-96 rounded-3xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5'>
                        <div className=' flex items-center justify-between pt-2'>
                            <h1 className='font-medium'>Add Image</h1>
                            <span 
                                onClick={()=>setIsVisible(false )}
                                className=' border border-black h-6 w-6 text-center rounded-full hover:bg-black hover:text-white cursor-pointer'
                            > 
                                X 
                            </span>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 gap-y-3 text-sm grid-cols-1 md:grid-cols-5 pt-6">
                                <div className="md:col-span-5">
                                    <div className='flex items-center gap-2'>
                                        <label htmlFor="ExpiryDate">Name<span className='text-red-600'>*</span></label>
                                        <div className='cursor-pointer opacity-70' title='Choose Expiration Date for the requested service, Can be extended in future.'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                            </svg>
                                        </div>
                                    </div>
                                    <input type="text" name="ImageName" id="ImageName" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required value={formData.ImageName}  onChange={handleChange} />
                                </div>
                                <div className="md:col-span-5">
                                    <div className='flex items-center gap-2'>
                                        <label htmlFor="ExpiryDate">Tag<span className='text-red-600'>*</span></label>
                                        <div className='cursor-pointer opacity-70' title='Choose Expiration Date for the requested service, Can be extended in future.'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                            </svg>
                                        </div>
                                    </div>
                                    <input type="text" name="Tag" id="Tag" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required value={formData.Tag}  onChange={handleChange} />
                                </div>
                                <div className="md:col-span-5">
                                    <div className='flex items-center gap-2'>
                                        <label htmlFor="ExpiryDate">Size<span className='text-red-600'>*</span></label>
                                        <div className='cursor-pointer opacity-70' title='Choose Expiration Date for the requested service, Can be extended in future.'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                            </svg>
                                        </div>
                                    </div>
                                    <input type="text" name="Size" id="Size" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required value={formData.Size}  onChange={handleChange} />
                                </div>
                            </div>
                            <div className="md:col-span-5 text-right pt-3">
                                <div className="inline-flex items-end">
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type='submit'>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminAddImages