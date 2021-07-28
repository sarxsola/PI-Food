import React from 'react'
import { connect } from "react-redux";
import { createRecipe } from '../../actions/index'
import { useState } from 'react';
import './CreateRecipe.css'

const CreateRecipe = ({ createRecipe }) => {

    const [recipe, setRecipe] = useState({
        title: '',
        summary: '',
        spoonacularScore: 0,
        healthScore: 0,
        instructions: '',
        diets: [],
        image: ''
    });

    function handleImage(e){
        var filesSelected = e.target.files;
        if (filesSelected.length > 0){
            var fileToLoad = filesSelected[0];
            var fileReader = new FileReader();
            fileReader.onload = function(fileLoadedEvent){
                setRecipe({
                    ...recipe,
                    image:fileLoadedEvent.target.result
                })
            };
            fileReader.readAsDataURL(fileToLoad);
        }
    }

    function handleChange(event) {

        if (event.target.name === 'diets') {
            setRecipe({
                ...recipe,
                diets: [...recipe.diets, event.target.id]
            })
        }
        else {
            setRecipe({
                ...recipe,
                [event.target.name]: event.target.value
            });
        }
    }

    const types = ['gluten free', 'ketogenic', 'vegetarian', 'dairy free'
        , 'lacto ovo vegetarian', 'vegan', 'pescetarian', 'paleo', 'primal', 'whole30']

    let i = 1;

    async function handleSubmit(e) {
        e.preventDefault();
        await createRecipe(recipe);
        // window.location = 'http://localhost:3000/recipes'
    }


    return (
        <div className='recipeBody formBody'>
            <form className='formRecipe' onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor='title'>TITLE</label>
                <input type='text' id='title' name='title' onChange={(e) => handleChange(e)} ></input>
                <label htmlFor='summary'>SUMMARY</label>
                <input type='text' id='summary' name='summary' onChange={(e) => handleChange(e)}></input>
                <label htmlFor='spoonacularScore'>SCORE</label>
                <input type="number" id="spoonacularScore" name="spoonacularScore" min="1" max="100" onChange={(e) => handleChange(e)}></input>
                <label htmlFor='healthScore'>HEALTH SCORE</label>
                <input type="number" id="healthScore" name="healthScore" min="1" max="100" onChange={(e) => handleChange(e)}></input>
                <label htmlFor='instructions'>INSTRUCTIONS</label>
                <input type='text' id='instructions' name='instructions' onChange={(e) => handleChange(e)}></input>

                <label htmlFor='typeDiet'>TYPE OF DIET</label>
                <div className='typeDiet'>

                    {
                        types.map((type) => {
                            return (
                                <div>
                                    <label htmlFor='diets'>{type}</label>
                                    <input type="checkbox" name='diets' value={type} id={i++} onChange={(e) => handleChange(e)} />
                                </div>)
                        })
                    }
                </div>
                <label className='image'>
                    <p>Image:</p>
                    <input type="file" name="image" id='inputFileToLoad' className="field" onChange={(e)=>handleImage(e)}/>
                </label>

                <input type="submit" value="Create" />
            </form>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        createRecipe: recipe => dispatch(createRecipe(recipe))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(CreateRecipe);
