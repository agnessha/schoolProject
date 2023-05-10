const express = require('express')
const router = express.Router()
import {checkUser} from "../controllers/auth.controller";

router.post('/login', checkUser)

module.exports = router
