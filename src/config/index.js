const mongoose = require('mongoose')

module.exports ={
    app:{
        porta: process.env.porta || 3333
    },
    db:{
        connString: process.env.mongo_db || "mongodb://localhost/"
    },
    mongoose
}