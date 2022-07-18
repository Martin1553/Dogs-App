import React from "react";
import s from './styles/Card.module.css'

export default function Card({name, image, temperaments, min_weight, max_weight}) {
    return (
        <div className={s.C_container}>
            <h3 className={s.C_name}>{name}</h3>
            <img src={image} alt="Not Found" width='200px' height='250px' />
            <h5 className={s.C_name}>Temperaments: {temperaments}</h5>
            <h5 className={s.C_name}>Weight: {min_weight} - {max_weight} Kg.</h5>
        </div>
    )
}