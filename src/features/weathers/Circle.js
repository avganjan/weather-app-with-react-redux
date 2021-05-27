import React, {useState, useEffect, useReducer, useRef} from "react";
import {useSelector} from "react-redux";

import {selectCity, selectLanguage} from "./weathersSlice";
import {toCelsius, toMMHg, toKm, toDateTime, getCurrentTime, languageConverter} from "../../helpers/helper";
import style from '../../styles/circle.module.css'

const refresh = ()=>{
    return getCurrentTime()
}

const Circle = ({weatherData})=>{
    const [date, setDate]=useReducer(refresh, '')
    const cityObj = useSelector(selectCity)
    const lang = useSelector(selectLanguage)
    const {
        temperature, feels_like,
        humidity, max, min, press,
        sunrise, sunset, time, wind,
        meters_second, visibility
    } = languageConverter(lang)

    useEffect(()=>{

    },[lang])

    useEffect(()=>{
        const myTimeOut = setInterval(setDate, 60000)
        setDate(getCurrentTime())

        return ()=> clearInterval(myTimeOut)
    },[])


    return(
        <div className={style.main}>
            <div className={style.container}>
                <div className={style.headerMain}>
                    <div className={style.headerContainer}>
                        <div>{temperature} {toCelsius(weatherData.main.temp)}
                            <span>&#8451;</span>
                        </div>
                        <div>{feels_like} {toCelsius(weatherData.main.feels_like)}
                            <span>&#8451;</span>
                        </div>
                    </div>
                </div>
                <div className={style.contentMain}>
                    <div className={style.leftSideMain}>
                        <div>{min} {toCelsius(weatherData.main.temp_min)}
                            <span>&#8451;</span>
                        </div>
                        <div>{sunrise} {toDateTime(cityObj.sunrise)}</div>
                        <div>{press} {toMMHg(weatherData.main.pressure)} mm</div>
                        <div>{visibility} {toKm(weatherData.visibility)}km</div>
                    </div>
                    <div className={style.centerMain}>
                        <div className={style.centerContainer}>
                            <img src={
                                weatherData ?
                                    `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` : ''
                            } alt={''}/>
                        </div>
                    </div>
                    <div className={style.rightSideMain}>
                        <div>{max} {toCelsius(weatherData.main.temp_max)}
                            <span>&#8451;</span>
                        </div>
                        <div>{sunset} {toDateTime(cityObj.sunset)}</div>
                        <div>{humidity} {weatherData.main.humidity}
                            <span>&#37;</span>
                        </div>
                    </div>
                </div>
                <div className={style.footerMain}>
                    <div className={style.footerContainer}>
                        <div>{wind} {weatherData.wind.speed}{meters_second}</div>
                        <div>{time} {date}</div>
                        <div>{weatherData.weather[0].description}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Circle