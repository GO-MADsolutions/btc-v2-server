/**
 * Created by gpalani on 27-01-2018.
 */
'use strict';
import * as Hapi from "hapi";
import {StudentController} from '../controllers/StudentController'
exports.register = function(server: Hapi.Server, options, cont){
    const studentctrl:StudentController = new StudentController();
    server.route([
        {
            method:"POST",
            path:"/student/create",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler: studentctrl.insertStudent
        },
        {
            method:"GET",
            path:"/student/{standard}/getRollNumber",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler:studentctrl.getLatestRollNumber
        },
        {
            method:"GET",
            path:"/student/{rollNumber}",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin','student']
                }
            },
            handler:studentctrl.getStudent
        },
        {
            method:"PUT",
            path:"/student/{rollNumber}/update",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler:studentctrl.updateStudent
        },
        {
            method:"DELETE",
            path:"/student/{rollNumber}",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler:studentctrl.deleteStudent
        }
    ]);
    cont();
}

exports.register.attributes = {
    name: "btc-student-route",
    version: "1.0"
};