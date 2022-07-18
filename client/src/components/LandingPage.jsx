import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllDogs, getTemperaments } from "../actions";
import s from './styles/LandingPage.module.css'


export default function LandingPage() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllDogs())
        dispatch(getTemperaments())
    },[dispatch])

    return (
        <div className={s.LP_container}>
            <h1 className={s.LP_title}>Welcome to the world of Henry's dogs</h1>
            <NavLink to='/home'>
                <button className={s.LP_btn}>Enter</button>
            </NavLink>
        </div>
    )
}