require('dotenv').config();

const router = require('express').Router();
const fetch = require('node-fetch');
const { Recipe, Diet } = require('../db');
const { Op } = require("sequelize");

const { API_KEY } = process.env;

router.get('/recipes', async (req, res) => {
    try {
        const titleQuery = req.query.name;

        if (titleQuery) {

            const recipesDB = await Recipe.findAll({
                where: {
                    title: {
                        [Op.substring]: titleQuery
                    }
                }
            }
            );

            res.json(recipesDB);
            
            let numberOfRecipesToFetch = 9 - recipesDB.length;

            const recipesApi = await fetch(`https://api.spoonacular.com/recipes/complexSearch?titleMatch=${titleQuery}&number=${numberOfRecipesToFetch}&apiKey=${API_KEY}`);
            const dataApi = await recipesApi.json();

            if (recipesDB.length === 0) {
                res.json(dataApi);
            }
            else {

                // let allRecipes = dataApi.concat(recipesDB);
                // console.log(allRecipes);
                // res.json(allRecipes);
            }
        }
        else {
            const recipesDB = await Recipe.findAll({
                include: Diet
            });

            let numberOfRecipesToFetch = 100 - recipesDB.length;

            const recipesApi = await fetch(`https://api.spoonacular.com/recipes/complexSearch?number=${numberOfRecipesToFetch}&addRecipeInformation=true&apiKey=${API_KEY}`);
            const data = await recipesApi.json();

            res.send(data);

            // if(!recipesDB) res.send(recipesDB);
            // else {
            //     let allRecipes = [];

            // }
        }
    }
    catch (error) {
        throw error;
    }

});

router.get('/recipes/:idReceta', async (req, res) => {
    const response = await fetch(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${API_KEY}`);
    const recipe = await response.json();
    const data = {
        title: recipe.title,
        image: recipe.image,
        dishTypes: recipe.dishTypes,
        diets: recipe.diets,
        summary: recipe.summary,
        spoonacularScore: recipe.spoonacularScore,
        healthScore: recipe.healthScore,
        instructions: recipe.instructions
    };

    res.json(data);
});

module.exports = router;
