import './LandingPage.css'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { getAllRecipes } from "../../actions";
import rightBackground from '../../images/rightBackground.jpg'

const LandingPage = (props) => {

    function handleClick() {
        props.getAllRecipes();
    }


    return (
        <>
            <div className='landing'>

                <div className='left'>
                    <div className='title'>
                        <h1>PICANTE</h1>
                        <h1>CORNER</h1>
                    </div>

                    <Link to='/recipes' >
                        <button onClick={handleClick} className='findButton'>FIND</button>
                    </Link>

                    <Link to='/form' >
                        <button className='createButton'>CREATE</button>
                    </Link>
               

                    
                    <div className='stats'>
                        <p className='pageSummary'>Discover new recipes or create your own instead!</p>
                        <p className='createdRecipes'>More than 50.000 recipes created!</p>
                        <p className='createdRecipes'>Created and curated by the best chefs.</p>
                    </div>

                </div>

                <div className='right'>
                    <img src={rightBackground} className='landingImage' alt="Food in a colored background" />
                </div>
            </div>
        </>
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
)(LandingPage);