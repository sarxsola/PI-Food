const router = require('express').Router();
const { Recipe } = require('../db');


router.post('/recipe', async (req, res) => {
    const {title, summary, spoonacularScore, healthScore, instructions, diet} = req.body;

    let createdRecipe = await Recipe.create({
        title,
        summary,
        spoonacularScore,
        healthScore,
        instructions,
        diet: [diet]
    });

    res.status(200).json(createdRecipe);
});

module.exports = router;
