/**
 * Created by gpalani on 21-03-2018.
 */
import * as Hapi from 'hapi';
import {func} from "joi";
export class SyllabusCompletionController {
    constructor(){}
    insertSyllabusCompletion(request: Hapi.Request, reply){
        const syllabus  = request.server.plugins['hapi-mongo-models'].SyllabusCompletion;
        let data =  {
            'rollNumber': request.params.standard,
            'subject': request.params.subject,
            'lessonName': request.payload.lessonName,
            'marks':request.payload.marks
        }

        syllabus.insertOne(data, function(err, success){
            if(err){
                reply(err)
            }
            else{
                reply(success)
            }
        })

    }
    editSyllabusCompletion(request: Hapi.Request, reply){
        const syllabus  = request.server.plugins['hapi-mongo-models'].SyllabusCompletion;
        const filter = {
            'rollNumber': request.params.standard,
            'subject': request.params.subject,
            'lessonName': request.payload.lessonName
        }
        const update = {
            'rollNumber': request.params.standard,
            'subject': request.params.subject,
            'lessonName': request.payload.lessonName,
            'marks':request.payload.marks
        }
        syllabus.find(filter, function (err, success) {
            if(err){
                reply(err)
            }
            else {
                if(success.length > 0){
                    syllabus.findOneAndUpdate(filter,update, function (err ,success) {
                        if(err){
                            reply(err);
                        }
                        else{
                            reply(success);
                        }
                    })
                }
                else{
                    syllabus.insertOne(update, function(err, success){
                        if(err){
                            reply(err)
                        }
                        else{
                            reply(success)
                        }
                    })
                }
            }
        })

    }
    deleteSyllabusCompletion(request: Hapi.Request, reply){
        const syllabus  = request.server.plugins['hapi-mongo-models'].SyllabusCompletion;
        const filter = {
            'rollNumber': request.params.standard,
            'subject': request.params.subject
        }
        syllabus.deleteOne(filter, function (err,success) {
            if(err){
                reply(err)
            }
            else{
                reply(success)
            }
        })
    }
    getSyllabusCompletion(request: Hapi.Request, reply){
        const syllabus  = request.server.plugins['hapi-mongo-models'].SyllabusCompletion;
        const filter = {
            'rollNumber': request.params.standard,
            'subject': request.params.subject
        }
        syllabus.find(filter, function (err, success) {
            if(err){
                reply(err)
            }
            else {
                reply(success)
            }
        })
    }
}