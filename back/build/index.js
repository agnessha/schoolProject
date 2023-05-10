"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUSES = exports.app = void 0;
var express = require('express');
var favicon = require('express-favicon');
var path = require('path');
var fs = require('fs');
var cors = require('cors');
var mongoose = require('mongoose');
var Note = require('/src/models/NoteModel');
exports.app = express();
var port = 3003;
exports.HTTP_STATUSES = {
    NOT_FOUND_404: 404,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    OK_200: 200,
    BAD_REQUEST: 400
};
var db = {
    skills: [
        { id: 1, title: 'React' },
        { id: 2, title: 'JS' },
        { id: 3, title: 'PHP' },
        { id: 4, title: 'Node' },
    ]
};
exports.app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    origin: ['http://localhost:3001'],
    credentials: true
}));
exports.app.use(express.json());
exports.app.use(favicon(__dirname + '/favicon.ico'));
exports.app.get('/skills', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var notes, foundSkills;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Note.find({})];
            case 1:
                notes = _a.sent();
                foundSkills = db.skills;
                if (req.query.title) {
                    foundSkills = foundSkills.filter(function (s) { return s.title.indexOf(req.query.title) > -1; });
                }
                res.json(notes);
                return [2 /*return*/];
        }
    });
}); });
exports.app.post('/skills', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var note;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                note = new Note({
                    completed: req.body.title,
                    date: req.body.date,
                    id: req.body.id,
                    normalDate: req.body.normalDate,
                    text: req.body.text,
                    time: req.body.time,
                    title: req.body.title
                });
                return [4 /*yield*/, note.save()
                    // if (!req.body.title) {
                    //     res.sendStatus(HTTP_STATUSES.BAD_REQUEST);
                    //     return;
                    // }
                    // let newSkill = {
                    //     id: +(new Date()),
                    //     title: req.body.title
                    // }
                    // db.skills.push(newSkill);
                ];
            case 1:
                _a.sent();
                // if (!req.body.title) {
                //     res.sendStatus(HTTP_STATUSES.BAD_REQUEST);
                //     return;
                // }
                // let newSkill = {
                //     id: +(new Date()),
                //     title: req.body.title
                // }
                // db.skills.push(newSkill);
                res.status(exports.HTTP_STATUSES.CREATED_201);
                return [2 /*return*/];
        }
    });
}); });
exports.app.get('/skills/:id', function (req, res) {
    var skill = db.skills.find(function (s) { return s.id === +req.params.id; });
    if (!skill) {
        res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.json(skill);
});
exports.app.delete('/skills/:id', function (req, res) {
    var newSkills = db.skills.filter(function (s) { return +req.params.id !== s.id; });
    if (newSkills.length === db.skills.length) {
        res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    db.skills = newSkills;
    res.status(exports.HTTP_STATUSES.NO_CONTENT_204).json(db.skills);
});
exports.app.put('/skills/:id', function (req, res) {
    if (!req.body.title) {
        res.sendStatus(exports.HTTP_STATUSES.BAD_REQUEST);
        return;
    }
    var foundSkill = db.skills.find(function (s) { return s.id === +req.params.id; });
    if (!foundSkill) {
        res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    foundSkill.title = req.body.title;
    console.log(req.body.title);
    res.status(exports.HTTP_STATUSES.CREATED_201).json(db.skills);
});
exports.app.delete('/__TEST__/data', function (req, res) {
    db.skills = [];
    res.sendStatus(exports.HTTP_STATUSES.NO_CONTENT_204);
});
function start() {
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, mongoose.connect("mongodb+srv://agne:qwerty1234@notes.nwwk5fi.mongodb.net/notes", {
                            useNewUrlParser: true,
                            useFindAndModify: false
                        })];
                case 1:
                    _a.sent();
                    exports.app.listen(3003, function () {
                        console.log("Example app listening on port ".concat(port));
                    });
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
start();
