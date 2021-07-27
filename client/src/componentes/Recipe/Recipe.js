import React from 'react';
import './Recipe.css'
import { connect } from "react-redux";


const Recipe = ({ recipe }) => {


    return (
        <div className='recipeBody'>

        <div className="card-containerRecipe">
            <div className="cardRecipe u-clearfix">
                <div className="card-bodyRecipe">
                    <p className='subtleRed'>OUR SCORE:</p>
                    <span className="card-numberRecipe card-circleRecipeR subtleRed">{recipe.spoonacularScore}</span>
                    <p className='subtleGreen'>HEALTH SCORE:</p>

                    <span className="card-numberRecipe card-circleRecipeG subtleGreen">{recipe.healthScore}</span>
                    <span className="card-dietRecipe subtle">
                        {
                            recipe.diets ? recipe.diets.map((diet) => {
                                return(
                                <li>{diet}</li>)
                            }) : <li>{recipe.diets}</li>
                        }   
                    </span>

                    <span className="card-dietRecipe subtle">
                        {
                            recipe.dishTypes ? recipe.dishTypes.map((dish) => {
                                return(
                                <li>{dish}</li>)
                            }) : <li>There's no dish type for this recipe.</li>
                        }
                    </span>
                    <img src={recipe.image} alt="" className="card-mediaRecipe" />
                    <h2 className="card-titleRecipe">{recipe.title}</h2>
                    <p>{recipe.summary}</p>

                    <h2 className="card-titleRecipe">Instructions</h2>
                    <p>{recipe.instructions}</p>
                </div>
            </div>
        </div>
</div>
    )
}

function mapStateToProps(state) {
    return {
        recipe: state.recipeDetail
    };
}



export default connect(
    mapStateToProps,
    null
)(Recipe);
