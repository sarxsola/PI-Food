import React from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { getAllRecipes } from "../../actions";
import './NavBar.css'

const navBar = (props) => {

    function handleClickRecipe() {
        props.getAllRecipes();
    }


    return (
        <header className='navbar'>
            <div>
                <h5 className='logo'>PC</h5>
            </div>
            <nav>
                <ul className='list'>
                    <li className='list-item'>
                        <NavLink exact to='/'>HOME</NavLink>
                        <NavLink to='/recipes' onClick={handleClickRecipe}>RECIPES</NavLink>
                        <NavLink to='/form'>CREATE</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        getAllRecipes: () => dispatch(getAllRecipes())
    }
}

export default connect(
    null,
    mapDispatchToProps
)(navBar);
