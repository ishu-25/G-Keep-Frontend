const express = require('express')
const router = new express.Router()

const notedetail = require('../Modules/Gkeep-notes')

//POST req
router.post('/Gkeep-notes',async(req,res) => {
    try {
        const addNotesRecords = new notedetail(req.body)
        console.log(req.body);
        const insertNote = await addNotesRecords.save()
        res.status(201).send(insertNote)
    }catch(e){
        res.status(400).send(e)
    }
})

//GET req
router.get('/Gkeep-notes',async(req,res) => {
    try {
        const getNotes = await notedetail.find({})
        res.send(getNotes)
    }catch(e){
        res.status(400).send(e)
    }
})


//GET req for individule note
router.get('/Gkeep-notes/:id',async(req,res) => {
    try {
        const _id = req.params.id
const getNote = await notedetail.findById(_id)
res.send(getNote)
}catch(e){
res.status(400).send(e)
}
})

//PATCH req for individule note
router.patch('/Gkeep-notes/:id',async(req,res) => {
try {
const _id = req.params.id
const patchNote = await notedetail.findByIdAndUpdate(_id,req.body,{new:true})
res.send(patchNote)
}catch(e){
res.status(500).send(e)
}
})

//Delete req for individule note
router.delete('/Gkeep-notes/:id',async(req,res) => {
try {
const patchNote = await notedetail.findByIdAndDelete(req.params.id)
res.send(patchNote)
}catch(e){
res.status(500).send(e)
}
})

module.exports = router