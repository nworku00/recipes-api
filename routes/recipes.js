var express = require('express');
var router = express.Router();
const fs = require('fs');
const recipesFile = './data/recipes.json'

router.get('/', (req, res) => {
    fs.readFile(recipesFile, 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send('err at file read')
        }
        res.json(JSON.parse(data))
    })
});
router.get('/random', (req, res) => {
    fs.readFile(recipesFile, 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send('err at file read')
        }
        let recipes = JSON.parse(data)
        console.log(recipes.length)
        let r = Math.floor(Math.random() * recipes.length)
        console.log(r)
        res.send(recipes[r])
    })
})
router.post('/', (req, res) => {
    fs.readFile(recipesFile, 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).send('there was a problem reading the file')
            return;
        }
        const recipes = JSON.parse(data)
        const newRecipe = {
            id: (recipes.length + 1),
            name: req.body.name,
            style : req.body.style,
            prep_time: req.body.prep_time,
            cook_time: req.body.cook_time,
            instructions: req.body.instructions,
        }
        recipes.push(newRecipe)
        //replace the contents of og gamelist with new pushed gamelist
        fs.writeFile(recipesFile, JSON.stringify(recipes), err => {
            if (err) {
                console.log(err)
                res.status(500).send('there was a problem writing the file')
                return;
            }
            // res.json(newGame)
        })
    })
    res.send('post request accepted')
})
module.exports = router;