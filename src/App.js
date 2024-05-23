const express = require ('express')
require ('./Server/Database/connection')
const router = require('./Server/Routers/routeNotes')


const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(router)

app.listen(port,()=>{
    console.log(`connection is live at port no. ${port}`);
})