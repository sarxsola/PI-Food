const router = require('express').Router();

const { Diet } = require('../db');

const types = ['gluten free', 'ketogenic', 'vegetarian', 'dairy free'
, 'lacto ovo vegetarian', 'vegan', 'pescetarian', 'paleo', 'primal', 'whole30']

router.get('/types', async (req, res) => {

    let anyData = await Diet.findAll();
    
    if(anyData.length < 1){

        for(let i = 0; i < types.length; i++){
            await Diet.create({name: types[i]});
        }

        anyData = await Diet.findAll();
        Diet.sync();

    }
    res.status(200).json(anyData);
});

module.exports = router;
