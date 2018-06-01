/**
 * Created by gpalani on 06-02-2018.
 */
import * as Hapi from 'hapi';
import {func} from "joi";
export class LessonController {
    constructor(){}
    insertLesson(request: Hapi.Request, reply){
            const lesson  = request.server.plugins['hapi-mongo-models'].Lesson;
            let data =  {
                'standard': request.params.standard,
                'subject': request.params.subject,
                'lessons': request.payload
            }

        lesson.insertOne(data, function(err, success){
            if(err){
                reply(err)
            }
            else{
                reply(success)
            }
        })

    }
    editLesson(request: Hapi.Request, reply){
        const lesson  = request.server.plugins['hapi-mongo-models'].Lesson;
        const filter = {
            'standard': request.params.standard,
            'subject': request.params.subject
        }
        const update = {
            'standard': request.params.standard,
            'subject': request.params.subject,
            'lessons': request.payload
        }
        lesson.findOneAndUpdate(filter,update, function (err ,success) {
            if(err){
                reply(err);
            }
            else{
                reply(success);
            }
        })
    }
    deleteLesson(request: Hapi.Request, reply){
        const lesson  = request.server.plugins['hapi-mongo-models'].Lesson;
        const filter = {
            'standard': request.params.standard,
            'subject': request.params.subject
        }
        lesson.deleteOne(filter, function (err,success) {
            if(err){
                reply(err)
            }
            else{
                reply(success)
            }
        })
    }
    getLesson(request: Hapi.Request, reply){
        const lesson  = request.server.plugins['hapi-mongo-models'].Lesson;
        const filter = {
            'standard': request.params.standard,
            'subject': request.params.subject
        }
        lesson.find(filter, function (err, success) {
            if(err){
                console.log('ERROR IN FETCHING LESSONS');
                reply(err)
            }
            else {
                reply(success[0].lessons);
            }
        })
    }
}