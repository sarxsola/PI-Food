const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipesRouter = require('./recipes.js');
const recipeRouter = require('./recipe.js');
const typeRouter = require('./types.js');

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//GET RECIPES
router.use(recipesRouter);

//POST RECIPE
router.use(recipeRouter);

//GET TYPES
router.use(typeRouter);


module.exports = router;
