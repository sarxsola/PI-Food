const router = require('express').Router();
const { Recipe } = require('../db');


router.post('/form', async (req, res) => {
    const { title, summary, spoonacularScore, healthScore, instructions, diets, image } = req.body;

    try {
        
        let [createdRecipe] = await Recipe.findOrCreate({
            where:{
                title,
                summary,
                spoonacularScore,
                healthScore,
                instructions,
                image
            }
        });
        
        createdRecipe.setDiets(diets);
        res.status(200).json(createdRecipe);
    }
    catch(error){
        res.status(400).json(error);
    }
});

module.exports = router;
