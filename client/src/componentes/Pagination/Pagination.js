import React from 'react'
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SearchBar from '../SearchBar/SearchBar';
import Cards from '../Cards/Cards';
import '../OrderByScore/OrderByScore'
import '../Recipes/Recipes.css'
import './Pagination.css'
import OrderByScore from '../OrderByScore/OrderByScore';
import OrderByName from '../OrderByName/OrderByName';
import Filter from '../Filter/Filter';

const Pagination = ({ recipes }) => {


    const [state, setState] = useState({
        recipes: recipes,
        currentPage: 1,
        recipesPerPage: 8
    });

    useEffect(() => {
        setState({
            recipes: recipes,
            currentPage: 1,
            recipesPerPage: 8
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipes]);


    const handleClick = (event) => {
        setState({
            ...state,
            currentPage: Number(event.target.id)
        });
    }

    
    const indexOfLastTodo = (state.currentPage * state.recipesPerPage);
    const indexOfFirstTodo = indexOfLastTodo - state.recipesPerPage;
    const currentTodos = state.recipes.slice(indexOfFirstTodo, indexOfLastTodo);
    const renderTodos = currentTodos.map((todo, index) => {
        return <li key={index}>{todo}</li>;
    })

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(recipes.length / state.recipesPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <li
                key={number}
                id={number}
                onClick={handleClick}
            >
                {number}
            </li>
        );
    });

    let renderTodosClean = []

    renderTodos.length > 0 ? renderTodos.map((recipe) => {
        renderTodosClean.push(recipe.props.children)
    }) : <p>There's no recipe with that name</p>



    return (
        <div className='recipesBody'>

            <div className='searchBar'>
                <SearchBar />
            </div>
            <div className='orderBy'>
                <OrderByScore />
                <OrderByName />
            </div>
            <div className='filterBy'>
                <Filter />
            </div>
            
            <div className='pagination'>
                <ul className='recipesPagination'>
                    <Cards recipes={renderTodosClean} />
                </ul>

                <ul className='page-numbers' id='page-numbers'>
                    {renderPageNumbers}
                </ul>
            </div>
        </div>
    )
}

function mapStatesToProps(state) {
    return {
        recipes: state.recipes,
    }
}

export default connect(mapStatesToProps, null)(Pagination);