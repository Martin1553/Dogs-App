import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, orderByName, orderByWeight, filterByCreation, filterByTemperament, getTemperaments } from "../actions";
import { NavLink } from 'react-router-dom';
import Card from "./Card";
import Paginated from "./Paginated";
import SearchBar from "./SearchBar";
import s from './styles/Home.module.css'

export default function Home() {
    const dispatch = useDispatch();

    const allDogs = useSelector((state) => state.dogs);

    const temperament = useSelector((state) => state.temperaments)

    const [,setOrden] = useState('')

    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage,] = useState(8);

    const lastDog = currentPage * dogsPerPage;
    const firstDog = lastDog - dogsPerPage;
    const currentDogs = allDogs.slice(firstDog, lastDog)

    const paged = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getAllDogs())
        dispatch(getTemperaments())
    },[dispatch])

    function handleOrderByName(e) { //funcion para ordenar por nombre
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleOrderByWeight(e) { //funcion para ordenar por peso
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleFilterByCreation(e) { //funcion para filtrar por creados
        e.preventDefault();
        dispatch(filterByCreation(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterByTemperaments(e) { //funcion para filtrar por temperamento
        e.preventDefault();
        dispatch(filterByTemperament(e.target.value))
        setCurrentPage(1)
    }

    function handleClick(e) { //funcion para el boton de recarga de perros
        e.preventDefault()
        dispatch(getAllDogs())
    }

    return (
        <div className={s.H_container}>
            <h1 className={s.H_title}>Dogs App</h1>
            <div className={s.H_div}>
                <NavLink to='/dog'><button className={s.H_btns}>Create new breed</button></NavLink>
                <button className={s.H_btns} onClick={e => { handleClick(e) }}>Reload breeds</button>
                <SearchBar />
            </div>
            <div className={s.H_div_select}>
                <select className={s.H_selects} defaultValue={""} onChange={e => { handleOrderByName(e) }}>
                    <option value="" disabled hidden>Order by Name</option>
                    <option value="ASC">A - Z</option>
                    <option value="DESC">Z - A</option>
                </select>
                <select className={s.H_selects} defaultValue={""} onChange={e => { handleOrderByWeight(e) }}>
                    <option value="" disabled hidden>Order by Weight</option>
                    <option value="ASC">Min a Max</option>
                    <option value="DESC">Max a Min</option>
                </select>
                <select className={s.H_selects} defaultValue={""} onChange={e => { handleFilterByCreation(e) }}>
                    <option value="" disabled hidden>Filter by Creations</option>
                    <option value="API">Existentes</option>
                    <option value="DB">Creados</option>
                </select>
                <select className={s.H_selects} defaultValue={""} onChange={e => { handleFilterByTemperaments(e) }}>
                    <option value="" disabled hidden>Filter by Temperament</option>
                    {
                        temperament?.map((t) => (
                            <option value={t.name} key={t.name}>{t.name}</option>
                        ))
                    }
                </select>
            </div>
                    <Paginated
                        dogsPerPage={dogsPerPage}
                        allDogs={allDogs?.length}
                        paged={paged}
                    />
            {
                currentDogs && currentDogs.map(el => {
                    return (
                        <div className={s.H_divcard} key={el.id}>
                            <NavLink to={'/dogs/' + el.id}>
                                <Card
                                    name={el.name}
                                    image={el.image}
                                    temperaments={el.temperaments}
                                    min_weight={el.min_weight}
                                    max_weight={el.max_weight}
                                />
                            </NavLink>
                        </div>
                    )
                })
            }
        </div>
    )
}
