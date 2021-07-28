/* eslint-disable default-case */
/* eslint-disable no-fallthrough */

const initialState = {
    recipes: [],
    recipesCopy: [],
    recipeDetail: {}
}


function recipeReducer(state = initialState, action) {

    switch (action.type) {
        case 'GET_RECIPE':
            return {
                ...state,
                recipes: action.payload,
                recipesCopy: action.payload
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
                recipesCopy: action.payload
            }

        case 'GET_RECIPE_DETAIL':
            return {
                ...state,
                recipeDetail: action.payload
            }

        case 'SORT_BY_SCORE':
            let array = [...state.recipesCopy];
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
            let array1 = [...state.recipesCopy];
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
                    recipes: recipesFilter.sort(function(a, b){
                        if(a.title.toUpperCase() > b.title.toUpperCase()) return -1;
                        if(b.title.toUpperCase() > a.title.toUpperCase()) return 1;
                        return 0;
                    })
                }
            }

        case 'FILTER':
            // let recipesFilter = [...state.recipesCopy];
            // let array2State = [];

            // action.payload = action.payload.sort().toString();
            // let x = recipesFilter.map((recipe) => {
            //     if(recipe.diets){
            //         console.log('ola');
            //         recipe.diets = recipe.diets.sort().toString();
            //         console.log(recipe.diets);
            //         if(action.payload === recipe.diets){
            //             console.log('iupi')
            //         }
            //     }
            // })

            let recipesFilter= [...state.recipesCopy]
            if(action.payload === 'lucho'){
                return{
                    ...state,
                    recipes: recipesFilter
                }
            }
            if(action.payload !== 'lucho'){
                return{
                    ...state,
                    recipes: recipesFilter.filter(recipe=> recipe.diets.includes(action.payload))
                }
            }

    }

    return state;
}

export default recipeReducer;