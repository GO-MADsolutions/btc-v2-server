/**
 * Created by gpalani on 05-03-2018.
 */

'use strict';
import * as Hapi from "hapi";
import {UserController} from '../controllers/UserController';
exports.register = function(server: Hapi.Server, options, cont){
    const userctrl:UserController = new UserController();
    server.route([
        {
            method:"POST",
            path:"/user/create",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler: userctrl.insertUser
        },
        {
            method:"GET",
            path:"/user/{userName}",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['student','admin']
                }
            },
            handler:userctrl.getUser
        },
        {
            method:"PUT",
            path:"/user/{userName}",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler:userctrl.updateUser
        },
        {
            method:"DELETE",
            path:"/user/{userName}",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler:userctrl.deleteUser
        },
        {
            method:"POST",
            path:"/login",
            handler:userctrl.login
        }
    ]);
    cont();
}

exports.register.attributes = {
    name: "btc-user-route",
    version: "1.0"
};