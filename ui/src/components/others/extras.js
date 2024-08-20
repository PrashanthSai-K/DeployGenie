import axios from "axios";

const BackendUrl = 'http://localhost:3500';

export async function userGetRequest(url) {
    try {
        const token = localStorage.getItem("userKey");
        if (token == null) {
            console.log("no token");
            throw Error("No auth token");
        }
        const fullurl = BackendUrl + url;
        const response = await axios.get(fullurl, { headers: { Authorization: `Bearer ${token}` } });
        return response
    } catch (error) {
        throw error
    }
}

export async function adminGetRequest(url) {
    try {
        const token = localStorage.getItem("adminKey");
        if (token == null) {
            console.log("no token");
            throw Error("No auth token");
        }
        const fullurl = BackendUrl + url;
        const response = await axios.get(fullurl, { headers: { Authorization: `Bearer ${token}` } });
        return response
    } catch (error) {
        throw error
    }
}

export async function userPostRequest(url, body) {
    try {
        const token = localStorage.getItem("userKey");
        if (token == null) {
            console.log("no token");
            throw Error("No auth token");
        }
        const fullurl = BackendUrl + url
        console.log(fullurl);
        const response = await axios.post(fullurl, body, { headers: { Authorization: `Bearer ${token}` } });
        return response;
    }
    catch (error) {
        throw error;
    }
}

export async function adminPostRequest(url, body) {
    try {
        const token = localStorage.getItem("adminKey");
        if (token == null) {
            console.log("no token");
            throw Error("No auth token");
        }
        const fullurl = BackendUrl + url
        console.log(fullurl);
        const response = await axios.post(fullurl, body, { headers: { Authorization: `Bearer ${token}` } });
        return response;
    }
    catch (error) {
        throw error;
    }
}

export async function getRequest(url) {
    try {
        const fullurl = BackendUrl + url;
        const response = await axios.get(fullurl);
        return response
    } catch (error) {
        throw error
    }
}

export async function postRequest(url, body) {
    try {
        const fullurl = BackendUrl + url
        console.log(fullurl);
        const response = await axios.post(fullurl, body);
        return response;
    }
    catch (error) {
        throw error;
    }
}

export function SuccessNotify({ message }) {
    return (
        <>
            <div className=" fixed z-40 top-24 px-2 py-2 right-3 min-w-40 border border-green-400 bg-green-200 flex items-center justify-center gap-1 rounded-lg ">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-check2-circle" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                </svg>
                <span className="text-xs whitespace-nowrap">{message}</span>
            </div>
        </>
    )
}

export function ErrorNotify({ message }) {
    return (
        <>
            <div className=" fixed z-40 top-24 px-2 py-2 right-3 min-w-40 border border-red-400 bg-red-200 flex items-center justify-start gap-1 rounded-lg ">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
                <span className="text-xs whitespace-nowrap">{message}</span>
            </div>
        </>
    )
}