const express = require('express');
const router = express.Router();
const db = require('./app.js');
const { Filter } = require('firebase-admin/firestore');

router.get('/get' , async (req , res) => {
    const target =  req.query.target;
    let query;
    if(target === '*') {
        query = db.collection('blogs');
    } else {
        query = db.collection('blogs')
        .where('title' , '==' , target);
    }
    try {
        const snapshot = await query.get();
        let data = [];
        snapshot.docs.forEach((docs) => {
            data.push(docs.data());
        });
        res.send(data);
    } catch (error) {
        res.send(500);
    }
});

router.post('/create' , async (req , res) => {
    
});


module.exports = router;