import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getRecipeDetail } from '../../actions';
import './Card.css'

const Card = ({cardID, cardScore, cardTitle, cardDiets, cardImage, getRecipeDetail }) => {

    function handleClickRecipe() {
        getRecipeDetail(cardID);
    }

    return (
        <div className="card-container">
            <div className="card u-clearfix">
                <div className="card-body">
                    <span className="card-number card-circle subtle">{cardScore}</span>
                    <span className="card-diet subtle">
                        {
                            cardDiets?cardDiets.map((diet) => {
                                return (
                                    <li>{diet}</li>
                                )
                            }): <li>There's no diet type for this recipe</li>
                        }
                    </span>
                    <h2 className="card-title">{cardTitle}</h2>

                    <Link to={`/recipes/${cardID}`} className='link' onClick={handleClickRecipe}>
                        <div className="card-read">Read</div>                        
                    </Link>
                </div>
                <img src={cardImage} alt="" className="card-media" />
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        getRecipeDetail: recipe => dispatch(getRecipeDetail(recipe))
    }
}


export default connect(
    null,
    mapDispatchToProps
)(Card);
