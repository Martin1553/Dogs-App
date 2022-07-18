import axios from 'axios';

export function getAllDogs() {
    return async function(dispatch) {
        var json = await axios.get('http://localhost:3001/dogs')
        return dispatch({
            type: 'GET_ALL_DOGS',
            payload: json.data,
        })
    }
}

export function getTemperaments() {
    return async function(dispatch) {
        var json = await axios.get('http://localhost:3001/temperament')
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data
        })
    }
}

export function getDetail(id) {
    return async function(dispatch){
        try{
            var info = await axios.get('http://localhost:3001/dogs/' + id)
            console.log(info.data)
            return dispatch({
                type:'GET_DETAIL',
                payload: info.data
            })
        }catch(e) {
            console.log(e)
        }
    }
}

export function deleteDetail() {
    return {
        type: 'DELETE_DETAIL'
    }
}

export function getNameDog(name) {
    return async function(dispatch) {
    try {
        var json = await axios.get('http://localhost:3001/dogs?name=' + name)
        return dispatch({
            type: 'GET_NAME_DOG',
            payload: json.data
        })
    } catch(e) {
        console.log(e)
    }
    }
}

export function postDog(payload) {
    return async function(dispatch) {
        var json = await axios.post('http://localhost:3001/dog', payload)
        return json
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload) {
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

export function filterByCreation(payload) {
    return {
        type: 'FILTER_BY_CREATION',
        payload
    }
}

export function filterByTemperament(payload) {
    return {
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }
}