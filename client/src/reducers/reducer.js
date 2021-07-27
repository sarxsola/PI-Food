/* eslint-disable default-case */
/* eslint-disable no-fallthrough */

const initialState = {
    recipes: [],
    recipes2Order: [],
    recipeDetail: {}
}


function recipeReducer(state = initialState, action) {

    switch (action.type) {
        case 'GET_RECIPE':
            return {
                ...state,
                recipes: action.payload,
                recipes2Order: action.payload
            }

        case 'CREATE_RECIPE':
            return {
                ...state,
                recipes: state.recipes.concat(action.payload)
            }

        case 'GET_ALL_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                recipes2Order: action.payload
            }

        case 'GET_RECIPE_DETAIL':
            return {
                ...state,
                recipeDetail: action.payload
            }

        case 'SORT_BY_SCORE':
            let array = [...state.recipes2Order];
            if(action.payload === 'ASC'){
                return {
                    ...state,
                    recipes: array.sort(function(a, b){
                        if(a.spoonacularScore > b.spoonacularScore) return 1;
                        if(b.spoonacularScore > a.spoonacularScore) return -1;
                        return 0;
                    })
                }
            }
            else {
                return {
                    ...state,
                    recipes: array.sort(function(a, b){
                        if(a.spoonacularScore > b.spoonacularScore) return -1;
                        if(b.spoonacularScore > a.spoonacularScore) return 1;
                        return 0;
                    })
                }
            }

        case 'SORT_BY_NAME':
            let array1 = [...state.recipes2Order];
            if(action.payload === 'ASC'){
                return {
                    ...state,
                    recipes: array1.sort(function(a, b){
                        if(a.title.toUpperCase() > b.title.toUpperCase()) return 1;
                        if(b.title.toUpperCase() > a.title.toUpperCase()) return -1;
                        return 0;
                    })
                }
            }
            else {
                return {
                    ...state,
                    recipes: array1.sort(function(a, b){
                        if(a.title.toUpperCase() > b.title.toUpperCase()) return -1;
                        if(b.title.toUpperCase() > a.title.toUpperCase()) return 1;
                        return 0;
                    })
                }
            }
    }

    return state;
}

export default recipeReducer;