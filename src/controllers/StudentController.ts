/**
 * Created by gpalani on 27-01-2018.
 */

import * as Hapi from 'hapi';

export class StudentController{
    constructor(){}
    public  insertStudent(request: Hapi.Request, reply){
        const Student = request.server.plugins['hapi-mongo-models'].Student;
        Student.insertOne(request.payload,function(err,success){
            if(err){
                reply(err)
            }
            else{
                reply('204');
            }
        });
    }

    public getLatestRollNumber(request: Hapi.Request, reply){
        const Student = request.server.plugins['hapi-mongo-models'].Student;
        const filter = {
            "standard":request.params.standard
        }
        Student.pagedFind(filter, 'rollNumber', '-rollNumber', 1, 1, function (err,success) {
            if(err){
                reply('Érror');
            }
            else{
                if(success.data[0]){
                     reply(((success.data[0].rollNumber)+1).toString());
                }
                else{
                    const year=new Date().getFullYear();
                     reply(year+filter.standard+'01').code(200);
                }
            }
        })
    }

    public getStudent(request: Hapi.Request, reply){
        const Student = request.server.plugins['hapi-mongo-models'].Student;
        const filter = {
            "rollNumber":parseInt(request.params.rollNumber)
        }
        Student.findOne(filter, function (err, success) {
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

    public updateStudent(request: Hapi.Request, reply){
        const Student = request.server.plugins['hapi-mongo-models'].Student;
        const filter = {
            "rollNumber":request.payload.rollNumber
        }
        console.log('UPDATING',filter);
        Student.findOneAndUpdate(filter, request.payload, function (err, success) {
            if(err){
                reply().code(500);
            }else{
                reply(success)
            }

        })
    }

    public deleteStudent(request: Hapi.Request, reply){
        const Student = request.server.plugins['hapi-mongo-models'].Student;
        const filter = {
            "rollNumber":parseInt(request.params.rollNumber)
        }

        Student.deleteOne(filter,function (err,success) {
            if(err){
                reply().code(500);
            }else{
                reply(success).code(204)
            }

        })
    }
}
