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
        auth:{
            admin:false,
            blog_edit:false,
            edit_any:false,
            blog_request:false,
            request:true,
            request_agree:false,
        },
        profile:'',
    })
    .then((doc) => {
        res.send(200);
    })
    .catch((error) => {
        res.send(500);
    })
});

router.get('/get', async (req, res) => {
    const username = req.query.username;
    const email = req.query.email;

    try {
        const snapshot = await db.collection('users')
            .where(
                Filter.or(
                    Filter.where('email', '==', email),
                    Filter.where('username', '==', username)
                )
            )
            .get();
        if (snapshot.docs.length === 0) {
            res.send({});
            return;
        }
        let data = {};
        snapshot.forEach((doc) => {
            data = doc.data();
        });
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500);
    }
});
module.exports = router;