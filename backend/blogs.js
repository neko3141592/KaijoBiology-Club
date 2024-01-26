const express = require('express');
const router = express.Router();
const db = require('./app.js');
const { Filter } = require('firebase-admin/firestore');

router.get('/get' , async (req , res) => {
    const target =  req.query.target;
    const option = req.query.option;
    const query = db.collection('blogs');
    try {
        const snapshot = await query.get();
        let data = [];
        snapshot.docs.forEach((docs) => {
            if(target === '*') {
                data.push(docs.data());
            } else {
                const tmp = docs.data();
                if(option === 'all') {
                    if(tmp.title === target) {
                        data.push(tmp);
                    }
                } else {
                    if(~tmp.title.indexOf(target)) {
                        data.push(tmp);
                    }
                }
            }
        });
        res.send(data);
    } catch (error) {
        res.send(500);
    }
});

router.post('/create' , async (req , res) => {
    
});


module.exports = router;