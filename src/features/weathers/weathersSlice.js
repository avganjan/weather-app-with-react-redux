import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {fetching} from "../../helpers/helper";

const initialState = {
    lang: 'ru',
    city: null,
    cnt: '',
    cod: '',
    list: [],
    message: 0,
    status: 'idle',
    error: null,
}

export const fetchWeathers = createAsyncThunk('weathers/fetchWeathers',
    async (lang)=>{
    // console.log(lang)
        const data =  await fetching(lang)
        // console.log(data)
        return data
    })

const weathersSlice = createSlice(
    {
        name: 'weathers',
        initialState,
        reducers: {
            changeLanguage: (state, action)=>{
                console.log(action.payload)
                state.lang = action.payload
            }
        },
        extraReducers: {
            [fetchWeathers.pending]: (state, action)=>{
                state.status = 'loading'
                // console.log('loading')
            },
            [fetchWeathers.fulfilled]: (state, action)=> {
                const {city, cnt, cod, list, message} = action.payload
                state.status = 'succeeded'
                // console.log(action.payload)
                state.city = city
                state.cnt = cnt
                state.cod = cod
                state.list = list
                state.message = message
            }
            ,
            [fetchWeathers.rejected]: (state, action)=>{
                state.status = 'failed'
                console.log('failed')
                state.error = action.payload
            },
        }
    })

export const {changeLanguage} = weathersSlice.actions

export const selectWeatherList = state => state.weathers.list
export const selectCity = state => state.weathers.city
export const selectLanguage = state => state.weathers.lang
export const selectStatus = state => state.weathers.status

export default weathersSlice.reducer