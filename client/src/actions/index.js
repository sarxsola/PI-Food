export function getAllRecipes(){
    return function(dispatch){
        return fetch('http://localhost:3001/recipes')
        .then(response => response.json())
        .then(json => {
            dispatch({ type: 'GET_ALL_RECIPES', payload: json});
        });
    };
}

export function createRecipe(recipe){
    return function(dispatch){
        return fetch('http://localhost:3001/form', {
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => {
            dispatch({type: 'CREATE_RECIPE', payload: json});
        })
    }
}

export function getRecipe(recipe){
    return function(dispatch){
        return fetch(`http://localhost:3001/recipes?name=${recipe}`)
        .then(response => response.json())
        .then(json => {
            dispatch({ type: 'GET_RECIPE', payload: json});
        });
    };
}

export function getRecipeDetail(id){
    return function(dispatch){
        return fetch(`http://localhost:3001/recipes/${id}`)
        .then(response => response.json())
        .then(json => {
            dispatch({ type: 'GET_RECIPE_DETAIL', payload: json});
        });
    };
}

export function sortByName(data){
    return {type: "SORT_BY_NAME", payload: data}
}

export function sortByScore(data){
    return {type: "SORT_BY_SCORE", payload: data}
}