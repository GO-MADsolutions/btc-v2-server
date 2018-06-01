/**
 * Created by gpalani on 09-02-2018.
 */
import * as Hapi from "hapi";
import {LessonController} from '../controllers/LessonController';
import {AttendanceController} from "../controllers/AttendanceController";
exports.register = function (server: Hapi.Server, options, cont) {
    const attendenceCtrl = new AttendanceController();
    server.route([
        {
            method:"GET",
            path:"/attendance/{rollNumber}",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['student','admin']
                }
            },
            handler:attendenceCtrl.findAttendanceOfaStundent
        },
        {
            method:"GET",
            path:"/attendance/{rollNumber}/.search",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['student','admin']
                }
            },
            handler:attendenceCtrl.getAllAttendance
        },
        {
            method:"POST",
            path:"/attendance/{rollNumber}",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler:attendenceCtrl.insertAttendance
        },
        {
            method:"PUT",
            path:"/attendance/{rollNumber}",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler:attendenceCtrl.editAttendance
        }
    ])
    cont();
}


exports.register.attributes = {
    name: "btc-attendance-route",
    version: "1.0"
};