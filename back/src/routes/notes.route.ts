const notesFunctions = require('../controllers/notes.controller')
const express = require('express')
const router = express.Router()

router.get('/', notesFunctions.getNotes)
router.post('/', notesFunctions.createNote)
router.post('/deleteNote', notesFunctions.deleteNote)
router.post('/deleteNotes', notesFunctions.deleteNotes)
router.post('/updateNote', notesFunctions.updateNote)


module.exports = router