import {Request, Response} from "express";
import AuthUser from "../models/UserModel";
import {HTTP_STATUSES} from "../index";
const request = require('request');
const axios = require('axios');
const Url = require('url-parse');




async function verify(token: any) {

    const config = {
        method: 'get',
        url: 'https://www.googleapis.com/oauth2/v3/userinfo',
        headers: { 'Authorization': `Bearer ${token}`,
            Accept: 'application/json', 'Accept-Encoding': 'identity'
        }
    }
    let res = await axios(config)

    return {
        id: res.data.sub,
        name: res.data.name,
        email: res.data.email
    };
}

export const checkUser = (async (req: Request, res: Response) => {
    const user = await verify(req.query.token)

    AuthUser.exists({_id: user.id}, async function (err: any, doc: any) {
        if (err) {
            console.log(err)
        } else {
            if (!doc) {
                const newUser = new AuthUser({
                    _id: parseInt(user.id),
                    email: user.email,
                    name: user.name

                })
                await newUser.save()
                res.json(newUser).sendStatus(HTTP_STATUSES.CREATED_201)
                return;
            }
            AuthUser.find({_id: user.id}, function (err: any, docs: any) {
                res.json(docs)
                return;
            })

        }
    })


})
