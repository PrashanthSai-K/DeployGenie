import React, { useEffect, useState } from 'react'
import UserSidebar from '../navbar/UserSidebar';
import { getRequest } from '../others/extras';
import AdminSidebar from '../navbar/AdminSidebar';

function AdminViewImage() {

    const [images, setImages] = useState();

    const fetchImages = async()=>{
        try{
            const response = await getRequest("/v1/api/images");
            setImages(response.data.data)
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchImages();
    },[])

    return (
        <>
            <AdminSidebar />
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
                        <span>Images</span>
                    </div>
                </div>
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
                                            images && images.map((image)=>{
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
                                                            {image.Id}
                                                        </th>
                                                        <td class="px-4 py-3 ">
                                                            {image.ImageName}
                                                        </td>
                                                        <td class="px-4 py-3">
                                                            {image.Tag}
                                                        </td>
                                                        <td class="px-4 py-3 ">
                                                            {image.Size}
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
            </div>
        </>
    )
}

export default AdminViewImage