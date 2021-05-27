import React, {useState, useEffect} from 'react'

import LanguageButtons from "./features/weathers/LanguageButtons";
import { css } from '@emotion/css'

import Carousel from "./features/weathers/Carousel";
import {useDispatch, useSelector} from "react-redux";
import {fetchWeathers, selectWeatherList, selectLanguage, selectStatus} from "./features/weathers/weathersSlice";

const App = ()=>{
    const dispatch = useDispatch()
    const weatherList = useSelector(selectWeatherList)
    const lang = useSelector(selectLanguage)
    const status = useSelector(selectStatus)

    useEffect(()=>{
        dispatch(fetchWeathers(lang))
    },[lang])

    return(
        <div>
            <h3 className={ css`
              text-align: center;
              color: rebeccapurple;
              &:hover{
              color: aqua;
              }
                    `
            }>
                With Flex box
            </h3>
            <LanguageButtons/>
            {weatherList.length && status === 'succeeded' ? <Carousel items={weatherList} /> : null}
        </div>
    )
}

export default App