/**
 * Created by gpalani on 27-01-2018.
 */

import * as Hapi from 'hapi';
import * as bcrypt from 'bcrypt';
import * as Boom from "boom";
import * as Nexmo from "nexmo";
import * as NodeMailer from 'nodemailer';
import {Mailer} from './Mailer';
const jwt = require('jsonwebtoken');
/*const bcrypt = require('bcrypt');*/

export class UserController {
    constructor() {
    }
    public demo(request: Hapi.Request, reply) {
                reply('DEMO WORK').code(201);
    }
    public query(request: Hapi.Request, reply) {
        var mailer = new Mailer();
        mailer.sendQueryMail(request);
        mailer.notificationMail(request);
        reply('QUERY SUBMITTED').code(201);
    }
    public  insertUser(request: Hapi.Request, reply){
        let self = this;
        bcrypt.genSalt(10,(err, salt)=>{
            bcrypt.hash(request.payload.password, salt, (err, hash) => {
               if(err){

               }else{
                   const User = request.server.plugins['hapi-mongo-models'].User;
                   request.payload.firstLogin = 'Y';
                   request.payload.password = hash;
                   console.log('CREATE USER PAYLOAD',request.payload);
                   User.insertOne(request.payload,function(err,success) {
                       if(err){
                           reply(err)
                       }
                       else {
                           let self = new UserController();
                           var mailer = new Mailer();
                           mailer.userCreationMail(request);
                           reply({ id_token: self.createToken(success) }).code(201);
                       }
                   });
               }
            });
        });

    }

    public getUser(request: Hapi.Request, reply){
        const User = request.server.plugins['hapi-mongo-models'].User;
        const filter = {
            "userName":request.params.userName
        }
        User.findOne(filter, function (err, success) {
            if(err){
                reply(err).code(500);
            }
            else if(success === null){
                reply().code(404);
            }
            else{
                reply(success).code(200)
            }

        })
    }

    public getAllUsers(request: Hapi.Request, reply){
        const User = request.server.plugins['hapi-mongo-models'].User;
        /*const filter = {
            "userName":request.params.userName
        }*/
        User.find({}, function (err, success) {
            if(err){
                reply(err).code(500);
            }
            else if(success === null){
                reply().code(404);
            }
            else{
                reply(success).code(200)
            }

        })
    }

    public updateUser(request: Hapi.Request, reply){

        bcrypt.genSalt(10,(err, salt) => {
            bcrypt.hash(request.payload.password, salt, (err, hash) => {
                if(err){
                        console.log('UPDATE ERROR IN HASING PASSWORD');
                }else{
                    const User = request.server.plugins['hapi-mongo-models'].User;
                    const filter = {
                        "userName":request.params.userName
                    }
                    request.payload.password = hash;
                    User.findOneAndUpdate(filter, request.payload, function (err, success) {
                        if(err){
                            console.log('CANNOT FIND USER TO UPDATE PASSWORD',err);
                            reply().code(500);
                        }else{
                            console.log('UPDATED PASSWORD');
                            reply(success)
                        }

                    })
                }
            });
        });

    }

    public deleteUser(request: Hapi.Request, reply){
        const User = request.server.plugins['hapi-mongo-models'].User;
        const filter = {
            "userName":request.params.userName
        }

        User.deleteOne(filter,function (err,success) {
            if(err){
                reply().code(500);
            }else{
        
                reply(success).code(204)
            }

        })
    }


    public login(request: Hapi.Request, reply){
        const User = request.server.plugins['hapi-mongo-models'].User;
        const filter = {
            "userName":request.payload.userName
        }
        console.log('fileter',filter);
        User.findOne(filter, function (err, success) {
            if(err){
                reply(err).code(500);
            }
            else if(success === null){
                console.log('COULDNT FETCH AN USER');
                reply(Boom.badRequest('Incorrect password!'));
            }
            else{
               /* reply(success).code(200)*/

                bcrypt.compare(request.payload.password, success.password, (err, isValid) => {
                    if(err){
                        console.log('GOT ERROR IN BCRYPT',err);
                        reply(err);
                    }
                    if (isValid) {
                        let self = new UserController();
                        reply({ id_token: self.createTokenLogin(success) }).code(201);
                    }
                    else {
                        reply(Boom.badRequest('Incorrect password! Please Check'));
                    }
                });
            }

        })
    }


    public createToken = (user) => {
        let scopes;
        let firstLogin;
        if(user[0].firstLogin === 'Y'){
            firstLogin = 'Y';
        }
        else if(user[0].firstLogin !== 'Y'){
            firstLogin = 'N'
        }
        if (user[0].role === 'admin') {
            scopes = 'admin';
        }
        else{
            scopes = 'student';
        }
        console.log('TOKEN DETAILS',user[0].userName, scopes, firstLogin )
        return jwt.sign({ id: user[0]._id, username: user[0].userName, scope: scopes, firstLogin: firstLogin }, 'BTC', { algorithm: 'HS256', expiresIn: "1h" } );


    }

    public createTokenLogin = (user) => {
        console.log('TOKEN GENERATOR',user)
        let scopes;
        let firstLogin;
        if(user.firstLogin === 'Y'){
            firstLogin = 'Y';
        }
        else if(user.firstLogin !== 'Y'){
            firstLogin = 'N'
        }
        if (user.role === 'admin') {
            scopes = 'admin';
        }
        else{
            scopes = 'student';
        }
        console.log('TOKEN DETAILS',user.userName, scopes, firstLogin )
        return jwt.sign({ id: user._id, username: user.userName, scope: scopes, firstLogin: firstLogin }, 'BTC', { algorithm: 'HS256', expiresIn: "1h" } );


    }
}
