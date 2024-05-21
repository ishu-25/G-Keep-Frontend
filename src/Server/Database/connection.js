const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Gkeep').then(()=>{
    console.log('Connection Successful')
}).catch((e)=>{
    console.log(' No Connection.')
})