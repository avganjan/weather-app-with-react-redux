import React, {useState, useEffect, useRef} from "react";

import {useSelector} from "react-redux";
import {selectLanguage} from "./weathersSlice";
import Circle from "./Circle";
import {toDateTime, getWeekDay} from "../../helpers/helper";

import style from '../../styles/carousel.module.css'

const list = [
    {item: 'one1'},
    {item: 'two2'},
    {item: 'three3'},
    {item: 'four4'},
    {item: 'five5'},
    {item: 'six6'},
    {item: 'seven7'},
    {item: 'seven8'},
    {item: 'nine9'},
    {item: 'ten10'},
    {item: 'eleven11'},
    {item: 'twelve12'}
]

/**
 * How set a weather icon
 * <img src={`http://openweathermap.org/img/wn/${arr_items.icon}@2x.png`} alt={`image`}/>
 * */

const Carousel = ({items})=>{
    const [itemWidth, setItemWidth]=useState()
    const [containerWidth, setContainerWidth]=useState()
    const [position, setPosition]=useState(0)
    const [count, setCount]=useState(0)
    const [circleData, setCircleData]=useState(null)
    const carouselListItemInnerWidth = useRef()
    const carouselContainerInnerWidth = useRef()

    const lang = useSelector(selectLanguage)

    const resize = ()=>{
        setItemWidth(carouselListItemInnerWidth.current.offsetWidth)
        setContainerWidth(carouselContainerInnerWidth.current.offsetWidth)
        setPosition(0)
        setCount(0)
    }

    useEffect(()=>{
        // console.log(inWidth.current.offsetWidth)
        // console.log(list.length)
        window.addEventListener('resize', resize)
        resize()
        // console.log(itemWidth)
        // console.log(containerWidth)
        return ()=> window.removeEventListener('resize', resize)
    },[])

    return(
        <>
            <div className={style.main}>
                <div className={style.leftArrow} onClick={()=>{
                    if (containerWidth && count < 5) {
                        setPosition((prev) => {
                            setCount(prev => prev + 1)
                            // console.log(count)
                            return prev + (containerWidth)
                        })
                    }
                }} />
                <div className={style.rightArrow} onClick={()=>{
                    if (containerWidth && count > 0 && count < 6) return setPosition((prev)=> {
                        setCount(prev => prev - 1)
                        return prev - (containerWidth)
                    })
                }} />
                <div className={style.carouselContainer} ref={carouselContainerInnerWidth}>
                    <div style={{
                        width: containerWidth ? `${containerWidth*11}px` : null,
                        left: `-${position}px`,
                    }}
                         className={style.carouselListContainer}
                    >
                        {
                            items.map((v, i)=>{
                                return(
                                    <div key={i} style={{
                                        width: containerWidth ? `${containerWidth/7}px` : null,
                                        height: containerWidth ? `${containerWidth/7}px` : null,
                                    }}
                                         className={style.carouselListItem}
                                         ref={carouselListItemInnerWidth}
                                         onClick={()=>{
                                             setCircleData(v)
                                             }}
                                    >
                                        <div className={style.imageContainer}>
                                            <img src={`http://openweathermap.org/img/wn/${v.weather[0].icon}@2x.png`} alt={''}/>
                                        </div>
                                        <div className={style.dateContainer}>
                                            <div>{toDateTime(v.dt)}</div>
                                            <div>{getWeekDay(v.dt, lang)}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div>
                {circleData && <Circle weatherData={circleData}/>}

            </div>
        </>
    )
}

export default Carousel