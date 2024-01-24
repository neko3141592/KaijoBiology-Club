const express = require('express');
const router = express.Router();
const db = require('./app.js');
const { Filter } = require('firebase-admin/firestore');

router.post('/create' , async(req , res) => {
    const username = req.query.username;
    const email = req.query.email;
    await db.collection('users')
    .add({
        email:email,
        username:username,
        admin:false,
        profile:'',
    })
    .then((doc) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        res.status(500).send({error:error});
    })
});

router.get('/get' , async (req , res) => {
    const username = req.query.username;
    const email = req.query.email;
    const snapshot = await db.collection('users')
    .where(
        Filter.or(
            Filter.where('email' , '==' , email),
            Filter.where('username' ,'==' , username)
        )
    )
    .get()
    .catch((error) => {
        res.status(500).send({error:'Internal Server Error'});
    });
    if(snapshot.docs.length === 0) res.send({});
    snapshot.forEach((doc) => {
        res.send(doc.data());
        return;
    })
});

module.exports = router;