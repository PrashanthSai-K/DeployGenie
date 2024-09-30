import React, { useEffect } from 'react'

function ApprovalPopup({stage, callbackFunction, data,  isVisible, setIsvisible}) {

    const handleYes = () => {
        setIsvisible(false);
        callbackFunction(data);
    }

    const handleNo = () => {
        setIsvisible(false);
    }  
    
    if (!isVisible) return null;

    return (
        <>
            <div className='fixed top-0 z-50 w-full h-full backdrop-blur-sm'>
                <div className='w-full h-full flex items-center justify-center'>
                    <div className='bg-white h-44 w-96 rounded-3xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
                        <div className=' flex justify-between pt-12 px-8'>
                            <p>Do you want to {stage} ? </p>
                        </div>
                        <div className=' flex gap-5 pt-8 pl-36'>
                            <button 
                                className="px-6 py-1 bg-green-500 text-white rounded-lg transform hover:-translate-y-1 transition duration-400"
                                onClick={handleYes}
                            >
                                Yes
                            </button>
                            <button 
                                className="px-6 bg-red-400 text-white rounded-lg transform hover:-translate-y-1 transition duration-400"
                                onClick={handleNo}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ApprovalPopup