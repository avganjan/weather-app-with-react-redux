import React, {useEffect} from "react";

import {useSelector} from "react-redux";
import {selectWeatherList} from "./weathersSlice";

const Weather = ()=>{

    const list = useSelector(selectWeatherList)

    useEffect(()=>{
        // console.log(list[0])
    },[list])

    return(
        <div className={'divContainer'}>

        </div>
    )
}

export default Weather