import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getNameDog} from '../actions';
import s from './styles/SearchBar.module.css'

export default function SearchBar() {
    const dispatch = useDispatch();

    const [name, setName] = useState('');

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameDog(name))
        setName({
            name: ''
        })
    }

    return (
        <div className={s.SB_container}>
            <input 
            className={s.SB_input}
            type="text"
            placeholder="Search..."
            onChange={e => {handleInputChange(e)}}
            />
            <button className={s.SB_btns} type="Submit" onClick={e => handleSubmit(e)} >Search</button>
        </div>
    )
}