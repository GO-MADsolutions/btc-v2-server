/**
 * Created by gpalani on 09-02-2018.
 */
import * as Hapi from 'hapi';
import {date} from "joi";

export class AttendanceController{
    constructor(){}
    insertAttendance(request: Hapi.Request, reply){
        const attendanceModel  = request.server.plugins['hapi-mongo-models'].Attendance;
        const attendance = request.payload;
        attendance.rollNumber = request.params.rollNumber;
        attendanceModel.insertOne(attendance,function (err,success) {
            if(err){
                reply(err)
            }
            else{
                reply(success);
            }
        })

    }

    findAttendanceOfaStundent(request: Hapi.Request, reply){
        const attendanceModel  = request.server.plugins['hapi-mongo-models'].Attendance;
        const filter = {
            'rollNumber':request.params.rollNumber
        }
        attendanceModel.pagedFind(filter, '', '-date', 1, 1, function (err, success) {
            if(err){
                reply(err)
            }
            else {
                reply(success.data)
            }
        })
    }
    getAllAttendance (request: Hapi.Request, reply){
        const attendanceModel  = request.server.plugins['hapi-mongo-models'].Attendance;
     const filter = {
            'rollNumber':request.params.rollNumber
        }
        attendanceModel.find(filter, function (err, success) {
            if(err){
                reply(err)
            }
            else {
                reply(success)
            }
        })
    }

    editAttendance(request: Hapi.Request, reply){
        const attendanceModel  = request.server.plugins['hapi-mongo-models'].Attendance;
        let filter = {
            'rollNumber': request.params.rollNumber,
            'date': request.payload.date
        }
        const update= request.payload;
        update.rollNumber = request.params.rollNumber;
        attendanceModel.findOneAndUpdate(filter,update, function (err ,success) {
            if(err){
                reply(err);
            }
            else{
                reply(success);
            }
        })
    }

}