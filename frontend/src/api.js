import axios from 'axios'
import {useEffect, useState} from "react";

const request = axios.create({
    baseURL: 'http://localhost:8000/api/'
});

const useGetRequest = (url) => {
    const [dataState, setDataState] = useState({data: [], loaded: false, error: false});

    useEffect(() => {
        request.get(url)
            .then(response => {
                setDataState({
                    ...dataState,
                    data: response.data,
                    loaded: true
                })
            }
        )
            .catch(error => {
                setDataState({
                    ...dataState,
                    loaded: true,
                    error: true
                })
            })
    }, [url]);

    return dataState;
};

export default {useGetRequest}