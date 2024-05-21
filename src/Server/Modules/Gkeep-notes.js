const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
        trim:true
    },
    content:{
        type: String,
        required:true,
        trim:true
    },
})

//New collection
const notedetail = new mongoose.model('notedetail',noteSchema)
module.exports = notedetail