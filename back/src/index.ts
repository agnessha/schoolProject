import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from "./types";

const express = require('express')
const favicon = require('express-favicon');
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
import dotenv from "dotenv";
import {Note} from './models/NoteModel'
import {Request, Response} from "express";
import {CreateSkillModel} from "./models/CreateSkillModel";
const auth_routes = require('./routes/auth.route.ts')
const notes_routes = require('./routes/notes.route.ts')

dotenv.config();

export const app = express()
const port = 3003;

export const HTTP_STATUSES = {
    NOT_FOUND_404: 404,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    OK_200: 200,
    BAD_REQUEST: 400
}

type SkillType = {
    id: number,
    title: string
}


const db: {skills: SkillType[]} = {
    skills: [
        {id: 1, title: 'React'},
        {id: 2, title: 'JS'},
        {id: 3, title: 'PHP'},
        {id: 4, title: 'Node'},
    ]
}

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH', 'OPTIONS'],
    origin: '*',
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/auth', auth_routes)
app.use('/notes', notes_routes)

app.get('/skills', async (req: RequestWithQuery<CreateSkillModel>,
                          res: Response<SkillType[]>) => {

    const notes = await Note.find({userId: req.query.userId})
    let foundSkills = db.skills
    if (req.query.title) {
        foundSkills = foundSkills.filter(s => s.title.indexOf(req.query.title) > -1);
    }
    res.send(notes);

})

app.get('/skills/:id', (req: RequestWithParams<{id: string}>,
                        res: Response<SkillType>) => {
    let skill = db.skills.find(s => s.id === +req.params.id)

    if (!skill) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    res.json(skill);
})
app.delete('/skills/:id', (req: Request<{id: string}>,
                           res: Response<SkillType[]>) => {
    const newSkills = db.skills.filter(s => +req.params.id !== s.id);
    if (newSkills.length === db.skills.length) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    db.skills = newSkills
    res.status(HTTP_STATUSES.NO_CONTENT_204).json(db.skills)
})
app.put('/skills/:id', (req: RequestWithParamsAndBody<{id: string}, {title: string}>,
                        res: Response<SkillType[]>) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST);
        return;
    }
    const foundSkill = db.skills.find(s => s.id === +req.params.id)
    if (!foundSkill) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    foundSkill.title = req.body.title
    res.status(HTTP_STATUSES.CREATED_201).json(db.skills)
})
app.delete('/__TEST__/data' , (req: Request, res: Response) => {
    db.skills = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})


async function start() {
    try {
        await mongoose.connect("mongodb+srv://agne:qwerty1234@notes.nwwk5fi.mongodb.net/notes")

        app.listen(3003, () => {
            console.log(`Example app listening on port ${port}`);
        })

    } catch (e) {
        console.log(e)
    }
}

start();



