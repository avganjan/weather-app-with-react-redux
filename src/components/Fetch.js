import React,{useState, useEffect, useReducer} from "react";

import {City, StateCode, MyAPIKey} from "../constants/constants";

const errorMessage = (err)=>{
    console.log(err)
}

const apiResponse = (prev, resp)=>{
    // console.log(prev)
    // console.log('response is - ' + resp)
    return resp
}

const langManipulation = (prev)=>{
    console.log(prev)
}

const my_lang = 'ru'

export const Fetch = ()=>{
    const [lang, setLang]=useReducer(langManipulation,my_lang)
    const [error, setError]=useReducer(errorMessage, null)
    const [response, setResponse]=useReducer(apiResponse, null)

    const fetching = async ()=>{
        const data = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${City},${StateCode}&lang=${lang}&appid=${MyAPIKey}`).
        then(res=>res.json())
        setResponse(data)
        // console.log(weathers)
    }

    useEffect(()=>{
        fetching().catch(setError)
    },[])

    useEffect(()=>{
        if (error) return console.log(error)
        console.log(response)
    })

    return null
}