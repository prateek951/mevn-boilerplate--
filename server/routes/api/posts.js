const express = require("express");
const router = express.Router();
const driver = require("mongodb");

//GET THE LIST OF ALL THE POSTS

router.get('/',async (req, res) => {
    //Load the posts collection 
    const posts = await loadPostsCollection();
    res.status(200).send(await posts.find({}).toArray());    
});

//Add a post 
router.post('/',async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

//Delete the post 
router.delete('/:id',async (req, res) => {
    const { id } = req.params;
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id : new driver.ObjectID(id)});
    res.status(200).send();
});

// Connection to the database 

async function loadPostsCollection() {
    const client = await driver.MongoClient.connect('mongodb://localhost:27017/vueposts',{
        useNewUrlParser: true
    });
    return client.db('vueposts').collection('vueposts');
}


module.exports = router;
