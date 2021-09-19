require('dotenv').config();

const router = require('express').Router();
const fetch = require('node-fetch');
const { Recipe, Diet } = require('../db');
const { Op } = require("sequelize");

const { API_KEY } = process.env;

router.get('/recipes', async (req, res) => {

    const titleQuery = req.query.name;

    try {
    if (titleQuery) {
        const recipesDB = await Recipe.findAll({
            where: {
                title: {
                    [Op.substring]: titleQuery
                }
            },
            include: Diet
        });

        recipesDBClean = [];

        
        recipesDB.map((recipe) => {
            recipesDBClean.push(
                {
                    id: recipe.id,
                    title: recipe.title,
                    summary: recipe.summary,
                    spoonacularScore: recipe.spoonacularScore,
                    healthScore: recipe.healthScore,
                    instructions: recipe.instructions,
                    diets: recipe.diets.map((diet) => diet.name),
                    image: recipe.image ? recipe.image : ''
                }
            )
        })


        let numberOfRecipesToFetch = 9 - recipesDB.length;

        const recipesApi = await fetch(`https://api.spoonacular.com/recipes/complexSearch?titleMatch=${titleQuery}&addRecipeInformation=true&number=${numberOfRecipesToFetch}&apiKey=${API_KEY}`);
        let recipesApiClean = [];

        let dataApi = await recipesApi.json();

        dataApi.results.map((recipe) => {
            recipesApiClean.push({
                id: recipe.id,
                title: recipe.title,
                summary: recipe.summary ? recipe.summary.replace(/<[^>]*>?/gm, '') : "This recipe doesn't have summary",
                spoonacularScore: recipe.spoonacularScore,
                healthScore: recipe.healthScore,
                instructions: recipe.instructions ? recipe.instructions.replace(/<[^>]*>?/gm, '') : "This recipe doesn't have instructions",
                diets: recipe.diets,
                image: recipe.image ? recipe.image : ''
            })
        })


        if (recipesDBClean.length < 1) {
            if (recipesApiClean.length === 0) {
                res.status(400).json([]);
            }
            else {
                res.json(recipesApiClean);
            }
        }
        else {
            let allRecipes = recipesDBClean.concat(recipesApiClean);
            res.json(allRecipes);
        }
    }
    else {
        const recipesDB = await Recipe.findAll({ include: Diet });

        recipesDBClean = [];

        recipesDB.map((recipe) => {
            recipesDBClean.push({
                id: recipe.id,
                title: recipe.title,
                summary: recipe.summary,
                spoonacularScore: recipe.spoonacularScore,
                healthScore: recipe.healthScore,
                instructions: recipe.instructions,
                diets: recipe.diets.map((diet) => diet.name),
                image: recipe.image ? recipe.image : ''
            })
        })


        let numberOfRecipesToFetch = 100 - recipesDB.length;
        const recipesApi = await fetch(`https://api.spoonacular.com/recipes/complexSearch?number=${numberOfRecipesToFetch}&addRecipeInformation=true&apiKey=${API_KEY}`);

        
        let dataApi = await recipesApi.json();
        
        
        const recipesApiClean = [];

        dataApi.results.map((recipe) => {
            recipesApiClean.push({
                id: recipe.id,
                title: recipe.title,
                spoonacularScore: recipe.spoonacularScore,
                diets: recipe.diets,
                image: recipe.image
            })
        })






        let allRecipes = recipesDBClean.concat(recipesApiClean);



        res.json(allRecipes);
    }

    }
    catch(err){
        res.json(err);
    }

});

router.get('/recipes/:idReceta', async (req, res) => {

    let idReceta = req.params.idReceta;

    if (idReceta.length === 36) {

        recipeDBClean = {};

        try {
            const recipe = await Recipe.findByPk(
                idReceta,
                { include: Diet }
            );

            recipeDBClean = {
                id: recipe.id,
                title: recipe.title,
                summary: recipe.summary,
                spoonacularScore: recipe.spoonacularScore,
                healthScore: recipe.healthScore,
                instructions: recipe.instructions,
                diets: recipe.diets.map((diet) => diet.name),
                image: recipe.image ? recipe.image : ''
            }

            res.status(200).json(recipeDBClean);
        }
        catch {
            res.status(400).send('ROMPISTE TODO');
        }
    }
    else {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${API_KEY}`);
            const recipe = await response.json();
            const data = {
                title: recipe.title,
                image: recipe.image,
                dishTypes: recipe.dishTypes,
                diets: recipe.diets,
                summary: recipe.summary.replace(/<[^>]*>?/gm, ''),                
                spoonacularScore: recipe.spoonacularScore,
                healthScore: recipe.healthScore,
                instructions: recipe.instructions.replace(/<[^>]*>?/gm, ''),
                image: recipe.image
            };

            res.status(200).json(data);
        }
        catch {
            res.status(400).send('ROMPISTE TODO');
        }
    }
});

module.exports = router;
