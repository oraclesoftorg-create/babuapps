const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://oraclesoftorg_db_user:lNUTffT1bCrRLD8a@cluster0.segrv5j.mongodb.net/?appName=Cluster0")
    .then(() => {
        console.log('MongoDB Connected...');
    }).catch((err) => {
        console.log('MongoDB Connection Error: ', err);
    })