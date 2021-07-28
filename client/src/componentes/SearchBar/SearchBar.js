import './SearchBar.css'
import React from 'react';
import { connect } from 'react-redux'
import { useState } from 'react';
import { getRecipe } from "../../actions";


const SearchBar = (props) => {
    const [recipeTitle, setRecipeTitle] = useState({
        recipe: ''
    });

    function handleChange(event){


        setRecipeTitle({
            ...recipeTitle,
            [event.target.name]: [event.target.value]
        });
    }

    function handleSubmit(event){
        event.preventDefault();
        props.getRecipe(recipeTitle.recipe);
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label htmlFor="search">Search for stuff</label>
                <input
                    id='search'
                    type='search'
                    placeholder='Search for a recipe...'
                    autoComplete="off"
                    name='recipe'
                    value={recipeTitle.recipe}
                    onChange={(e) => handleChange(e)}
                />
                <button className='buttonSearch' type='submit'>SEARCH</button>
            </div>
        </form>

    )
}

function mapDispatchToProps(dispatch) {
    return {
        getRecipe: title => dispatch(getRecipe(title))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(SearchBar);  
