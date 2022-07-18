

const initialState = {
    dogs : [],
    alldogs: [],
    temperaments: [],
    detail: [],
    creado: []
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_DOGS':
            return {
                ...state,
                dogs: action.payload,
                alldogs: action.payload
            }

        case 'GET_TEMPERAMENTS': 
        return {
            ...state,
            temperaments: action.payload
        }

        case 'GET_DETAIL':
            const detail = state.detail
            console.log(detail)
            return {
                ...state,
                detail: action.payload
            }

        case 'DELETE_DETAIL':
            return {
                ...state,
                detail: []
            }

        case 'GET_NAME_DOG':
            return {
                ...state,
                dogs: action.payload
            }

        case 'ORDER_BY_NAME':
            let orderArr = action.payload === 'ASC' ? 
                state.dogs.sort(function(a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) : 
                state.dogs.sort(function(a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0
                })
                return {
                    ...state,
                    dogs: orderArr
                }

        case 'ORDER_BY_WEIGHT' :
            let sortedArr2 = action.payload === 'ASC' ? 
            state.dogs.sort(function(a, b) {
                if(a.min_weight > b.min_weight) {
                    return 1;
                }
                if(b.min_weight > a.min_weight) {
                    return -1;
                }
                return 0;
            }) : 
            state.dogs.sort(function(a, b) {
                if(a.min_weight > b.min_weight) {
                    return -1;
                }
                if(b.min_weight > a.min_weight) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                dogs: sortedArr2
            }

        case 'FILTER_BY_CREATION':
            const alldogs = state.alldogs;
            const createdFilter = action.payload === 'DB' ? alldogs?.filter(el => el.createdInDb) : alldogs?.filter(el => !el.createdInDb)
            return {
                ...state,
                dogs: createdFilter
            }

        case 'FILTER_BY_TEMPERAMENT': 
            const alldogs2 = state.alldogs

            const temperamentArr = [];

            alldogs2.forEach(e => {
                if (e.hasOwnProperty("temperaments") && e.temperaments?.includes(action.payload)) temperamentArr.push(e)
            });

            return {
                ...state,
                dogs: temperamentArr
            }
    
        default:
            return {
                ...state
            }
    }
}

export default rootReducer;