import React from "react";
import {NavLink} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";
import { getDetail, deleteDetail } from '../actions';
import { useParams } from "react-router-dom";
import s from './styles/Detail.module.css'


export default function Detail(props) {
    // console.log(props)

    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getDetail(id))
        return function() {
            dispatch(deleteDetail())
        }
    }, [(id), dispatch])

    const myDog = useSelector((state) => state.detail);
    console.log(myDog)

    return (
        <div className={s.D_container}>
            {
                myDog.length ?
                <div className={s.D_div}>
                    <h1 className={s.D_title}>{myDog[0]?.name}</h1>
                    <img src={myDog[0]?.image} alt="Not found." height='250px' weight='250px' />
                    <h5 className={s.D_name}>Temperaments: {myDog[0]?.temperaments}</h5>
                    <h5 className={s.D_name}>Height: {myDog[0]?.height}</h5>
                    <h5 className={s.D_name}>Weight: {myDog[0]?.min_weight} - {myDog[0]?.max_weight} Kg.</h5>
                    <h6 className={s.D_name}>Life Span: {myDog[0]?.lifeSpan}</h6>
                </div> : 
                <div>
                <img className={s.D_p} src="https://i.pinimg.com/originals/e8/d4/f9/e8d4f9cfc297a13d85bc6fb7b0ccd1a7.png" alt="Not found" />
                <p className={s.D_p}>Cargando...</p>
                </div>
            }
            <NavLink to= '/home'><button className={s.D_btn}>Back</button></NavLink>
        </div>
    )
}

