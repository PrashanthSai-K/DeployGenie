import React, { useEffect, useState } from 'react'
import { ErrorNotify, getRequest, SuccessNotify } from '../others/extras';
import AdminSidebar from '../navbar/AdminSidebar';
import AdminAddImages from './AdminAddImages';
import AdminEditImages from './AdminEditImages';

function AdminViewImage() {

    // <<<<----------Message & Error realted variables and function------------->>>>
    const [message, setMessage] = useState();
    const [error, setError] = useState();

    const clearNotify = () => {
        setTimeout(() => {
            setMessage();
            setError();
        }, 5000)
    }

    const [images, setImages] = useState();

    const fetchImages = async () => {
        try {
            const response = await getRequest("/v1/api/images");
            setImages(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchImages();
    }, [])

    const [addImageVisible, setAddImageVisible] = useState(false);
    const [editImageVisible, setEditImageVisible] = useState(false);

    return (
        <>
            <AdminSidebar />

            {message ? <SuccessNotify message={message} /> : null}
            {error ? <ErrorNotify message={error} /> : null}

            <AdminAddImages
                isVisible={addImageVisible}
                setIsVisible={setAddImageVisible}
                setMessage={setMessage}
                setError={setError}
                clearNotify={clearNotify}
            />

            <AdminEditImages
                isVisible={editImageVisible}
                setIsVisible={setEditImageVisible}
                setMessage={setMessage}
                setError={setError}
                clearNotify={clearNotify}
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle cursor-pointer" onClick={() => setAddImageVisible(true)} viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
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
                                            <th scope="col" class="px-4 py-3">

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            images && images.map((image) => {
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
                                                        <td className='px-4 py-3'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="cursor-pointer" onClick={() => setEditImageVisible(true)} viewBox="0 0 16 16">
                                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                            </svg>
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