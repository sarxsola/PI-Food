import React from 'react'
import './Cards.css';
import Card from '../Card/Card.js';
import defaultImage from '../../images/food.jpg'

const Cards = ({recipes}) => {


    return (

        <div className='cardRow'>
            {
                recipes !== "There's no recipe with that name"  ? (

                    recipes.map((recipe) => 
                    
                    <Card 
                    cardID={recipe.id}
                    cardScore={recipe.spoonacularScore}
                    cardTitle={recipe.title}
                    cardDiets={recipe.diets}
                    cardImage={recipe.image ? recipe.image : defaultImage}
                    
                    />
                
                ))


            : (<p>{recipes}</p>)

            }
        </div>
    )
}

export default Cards
