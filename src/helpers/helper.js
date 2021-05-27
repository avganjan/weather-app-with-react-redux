import React from "react";

import {Russian, City, MyAPIKey, StateCode, inEn, inDe, inRu} from "../constants/constants";

export const fetching = (lang = Russian)=>{
    console.log(lang)
    return fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${City},${StateCode}&lang=${lang}&appid=${MyAPIKey}`).
    then(res=>res.json())
    // console.log(weathers)
}

const fixDate = (unix)=>{
    const date = new Date(unix * 1000)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    /****/
    let day = date.getDate()
    let week = date.getDay()
    let month = date.getMonth()
    let year = date.getFullYear()

    return {hours, minutes, seconds, day, week, month, year}
}

const fixHours = ({hours, minutes, seconds})=>{
    return {
        hours: hours < 10 ? '0' + hours : hours,
        minutes,
        seconds
    }
}

const fixMinutes = ({hours, minutes, seconds})=>{
    return {
        minutes: minutes < 10 ? '0' + minutes : minutes,
        hours,
        seconds
    }
}

const fixSeconds = ({hours, minutes, seconds})=>{
    return {
        seconds: seconds < 10 ? '0' + seconds : seconds,
        hours,
        minutes
    }
}

const prepareResult = ({hours, minutes, seconds})=>{
    return hours + ':' + minutes
}

const composer = (...f)=> {
   return (arg) => {
       return f.reduce((value, func) => func(value), arg)
   }
}
export const toDateTime = composer(
    fixDate, fixHours, fixMinutes, fixSeconds, prepareResult
)

const dateObj = ()=>{
    const date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    return {hours, minutes, seconds}
}

export const getCurrentTime = composer(
    dateObj, fixHours, fixMinutes, fixSeconds, prepareResult
)

const fixDayEn = ({week})=>{
    switch (week){
        case 0:
            week = "Sun.";
            break;
        case 1:
            week = "Mon.";
            break;
        case 2:
            week = "Tues.";
            break;
        case 3:
            week = "Wed.";
            break;
        case 4:
            week = "Thurs.";
            break;
        case 5:
            week = "Fri.";
            break;
        case  6:
            week = "Sat.";
    }
    return week
}

const fixDayDe = ({week})=>{
    switch (week){
        case 0:
            week = "So.";
            break;
        case 1:
            week = "Mo.";
            break;
        case 2:
            week = "Di.";
            break;
        case 3:
            week = "Mi.";
            break;
        case 4:
            week = "Do.";
            break;
        case 5:
            week = "Fr.";
            break;
        case  6:
            week = "Sa.";
    }
    return week
}

const fixDayRu = ({week})=>{
    switch (week){
        case 0:
            week = "Вс.";
            break;
        case 1:
            week = "Пн.";
            break;
        case 2:
            week = "Вт.";
            break;
        case 3:
            week = "Ср.";
            break;
        case 4:
            week = "Чт.";
            break;
        case 5:
            week = "Пт.";
            break;
        case  6:
            week = "Сб.";
    }
    return week
}

export const getWeekDay = (unix, lang)=> {
    switch (lang) {
        case 'en':
            return composer(fixDate, fixDayEn)(unix);
        case 'de':
            return composer(fixDate, fixDayDe)(unix);
        case 'ru':
            return composer(fixDate, fixDayRu)(unix);
    }
}

export const languageConverter = lang => {
    if (lang === 'en') return inEn
    if (lang === 'de') return inDe
    if (lang === 'ru') return inRu
}

export const toCelsius = (Kelvin)=>{
    return Math.round(Kelvin - 273.15)
}

export const toMMHg = (hPA)=>{
    return Math.round(hPA * 0.75006)
}

export const toKm = (meter)=>{
    return meter/1000
}