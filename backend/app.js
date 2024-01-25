const express = require('express');
const app = express();

const admin = require('firebase-admin');
const ServiceAccount = require('./ServiceAccount.json');

const cors = require('cors');
const { error } = require('firebase-functions/logger');

app.use(cors());

admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount)
});

const db = admin.firestore();

const firestoreInitialized = new Promise((resolve, reject) => {
    admin.firestore().settings({
        timestampsInSnapshots: true
    });
    resolve();
});

firestoreInitialized.then(() => {
    app.use('/api/user' , require('./userdata.js'));
    app.use('/api/blogs' , require('./blogs.js'));
    app.listen(4545);
});

module.exports = db;
