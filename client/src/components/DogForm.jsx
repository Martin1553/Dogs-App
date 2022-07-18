import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { getTemperaments, postDog } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from 'axios';
import s from './styles/DogForm.module.css'


function validate(input) {

    let error = {};
    if (/[^A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(input.name)) { error.name = "El nombre no puede contener numeros o simbolos" };
    if (!input.name) { error.name = "Name is required" };
    if (!input.image) { error.image = "Image is required" };
    if (!input.heightMin) { error.heightMin = "Height min is required" };
    if (!input.heightMax) { error.heightMax = "heightMax is required" };
    if (!input.min_weight) { error.min_weight = "weightMin is required" };
    if (!input.max_weight) { error.max_weight = "weightMax is required" };
    if (!input.lifeSpanMin) { error.lifeSpanMin = "lifeSpanMin is required" };
    if (!input.lifeSpanMax) { error.lifeSpanMax = "lifeSpanMax is required" };
    return error;
}

export default function DogForm() {
    const dispatch = useDispatch()
    const temperament = useSelector((state) => state.temperaments)


    const [error, setError] = useState({
        name: "",
        image: "",
        height: "",
        heightMin: "",
        heightMax: "",
        min_weight: "",
        max_weight: "",
        lifeSpan: "",
        lifeSpanMin: "",
        lifeSpanMax: "",
        temperaments: []
    })

    const [input, setInput] = useState({
        name: "",
        image: "",
        height: "",
        heightMin: "",
        heightMax: "",
        weight: "",
        min_weight: "",
        max_weight: "",
        lifeSpan: "",
        lifeSpanMin: "",
        lifeSpanMax: "",
        temperaments: []
    })


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e) {
        setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        })
    }

    async function handleSubmit(e) {
        if (input.heightMin > input.heightMax) {
            e.preventDefault()
            return alert('La altura minima no puede ser mayor a la altura maxima')
        }
        if (input.min_weight > input.max_weight) {
            e.preventDefault()
            return alert('El peso minimo no puede ser mayor al peso maximo')
        }
        if (input.lifeSpanMin > input.lifeSpanMax) {
            e.preventDefault()
            return alert('La esperanza de vida minima no puede ser mayor a la esperanza de vida maxima')
        }
        if (!input.name || !input.image || !input.heightMin || !input.heightMax || !input.min_weight || !input.max_weight || !input.lifeSpanMin || !input.lifeSpanMax) {
            e.preventDefault()
            return alert('Se deben completar todos los campos')
        }
        if (input.heightMin && input.heightMax && input.lifeSpanMin && input.lifeSpanMax) {
            input.height = input.heightMin + ' - ' + input.heightMax
            input.lifeSpan = input.lifeSpanMin + ' - ' + input.lifeSpanMax
        }
        e.preventDefault();
        try {
           const postDog = await axios.post('http://localhost:3001/dog', input)
            setInput({
                name: "",
                image: "",
                height: "",
                heightMin: "",
                heightMax: "",
                min_weight: "",
                max_weight: "",
                lifeSpan: "",
                lifeSpanMin: "",
                lifeSpanMax: "",
                temperaments: []
            })
            return alert(postDog.data.msg)
        } catch (e) {
            return alert(e.response.data?.msg)
        }
    }

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    return (
        <div className={s.DF_container}>
            {console.log(input)}
            <h1 className={s.DF_title}>Create a new breed</h1>
            <form className={s.DF_form} onSubmit={e => handleSubmit(e)}>
                <div className={s.DF_divs}>
                    <label className={s.DF_labels}>Name: </label>
                    <input
                        type="text"
                        placeholder="Example: Batata"
                        value={input.name}
                        name="name"
                        onChange={e => handleChange(e)}
                    />
                    {error.name && (
                        <p className={s.DF_errors}>{error.name}</p>
                    )}
                </div>
                <div className={s.DF_divs}>
                    <label className={s.DF_labels}>Image: </label>
                    <input
                        type="text"
                        placeholder="Insert an URL"
                        value={input.image}
                        name="image"
                        onChange={e => handleChange(e)}
                    />
                    {error.image && (
                        <p className={s.DF_errors}>{error.image}</p>
                    )}
                </div>
                <div className={s.DF_divs}>
                    <label className={s.DF_labels}>Height(Cm): </label>
                    <input
                        type="number"
                        min='0'
                        placeholder=" Height Min"
                        value={input.heightMin}
                        name="heightMin"
                        onChange={e => handleChange(e)}
                    /> - <input
                        type="number"
                        min='0'
                        placeholder="Height Max"
                        value={input.heightMax}
                        name="heightMax"
                        onChange={e => handleChange(e)}
                    />
                    {error.heightMin && (
                        <p className={s.DF_errors}>{error.heightMin}</p>
                    )}
                    {error.heightMax && (
                        <p className={s.DF_errors}>{error.heightMax}</p>
                    )}
                </div>
                <div className={s.DF_divs}>
                    <label className={s.DF_labels}>Weight(Kg): </label>
                    <input
                        type="number"
                        min='0'
                        placeholder="Weight Min"
                        value={input.min_weight}
                        name="min_weight"
                        onChange={e => handleChange(e)}
                    /> - <input
                        type="number"
                        min='0'
                        placeholder="Weight Max"
                        value={input.max_weight}
                        name="max_weight"
                        onChange={e => handleChange(e)}
                    />
                    {error.min_weight && (
                        <p className={s.DF_errors}>{error.min_weight}</p>
                    )}
                    {error.max_weight && (
                        <p className={s.DF_errors}>{error.max_weight}</p>
                    )}
                </div>
                <div className={s.DF_divs}>
                    <label className={s.DF_labels}>Life Span: </label>
                    <input
                        type="number"
                        min='0'
                        placeholder="Life Span Min"
                        value={input.lifeSpanMin}
                        name="lifeSpanMin"
                        onChange={e => handleChange(e)}
                    /> - <input
                        type="number"
                        min='0'
                        placeholder="Life Span Max"
                        value={input.lifeSpanMax}
                        name="lifeSpanMax"
                        onChange={e => handleChange(e)}
                    />
                    {error.lifeSpanMin && (
                        <p className={s.DF_errors}>{error.lifeSpanMin}</p>
                    )}
                    {error.lifeSpanMax && (
                        <p className={s.DF_errors}>{error.lifeSpanMax}</p>
                    )}
                </div>
                <select onChange={e => handleSelect(e)} >
                    {temperament.map((temp) => (
                        <option value={temp.name} key={temp.name}>{temp.name}</option>
                    ))}
                </select>
                <ul className={s.DF_ul}><li>{input.temperaments.map(el => el).join(', ')}</li></ul>
                <button className={s.DF_btn_create} type="submit">Create</button>

            </form>
            <NavLink to='/home'><button className={s.DF_btn_back}>Back</button></NavLink>
        </div>
    )
}

//Hola mi nombre es martin
