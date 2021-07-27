import React from 'react';
import { connect } from 'react-redux'
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';
import './Recipes.css'

function Recipes ({recipes}) {

    return (
        <div className='recipesBody'>
            <div className='searchBar'>
                <SearchBar />
            </div>
            <Pagination />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        recipes: state.recipes
    };
}

export default connect(
    mapStateToProps,
    null
)(Recipes);

