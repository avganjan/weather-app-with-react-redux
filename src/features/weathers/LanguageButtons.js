import React, {useState, useEffect} from "react";


import {English, German, Russian} from '../../constants/constants'
import {useDispatch, useSelector} from "react-redux";
import {fetchWeathers, changeLanguage, selectLanguage} from './weathersSlice'
import style from '../../styles/languageButtons.module.css'

const LanguageButtons = ()=>{
    const dispatch = useDispatch()
    const lang = useSelector(selectLanguage)

    useEffect(()=>{
        dispatch(fetchWeathers(lang))
    },[lang])

    return(
        <div className={style.languageButtonsMain}>
            <div onClick={()=>{ dispatch(changeLanguage(English)) }}>En</div>
            <div onClick={()=>{ dispatch(changeLanguage(German)) }}>De</div>
            <div onClick={()=>{ dispatch(changeLanguage(Russian)) }}>Ru</div>
        </div>
    )
}

export default LanguageButtons