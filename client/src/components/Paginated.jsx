import React from "react";
import s from './styles/Paginated.module.css'

export default function Paginated({ dogsPerPage, allDogs, paged }) {
    const pageNumbers = [];

    for(let i = 0; i < Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i + 1)
    }

    return (
        <nav>
            <ul>
                { pageNumbers && 
                pageNumbers.map(number => (
                    <button className={s.P_btn} onClick={() => paged(number)} key={number}>{number}</button>
                ))
                }
            </ul>
        </nav>
    )
}