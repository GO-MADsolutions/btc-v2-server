/**
 * Created by gpalani on 21-03-2018.
 */
import * as Hapi from "hapi";
import {SyllabusCompletionController} from '../controllers/SyllabusCompletionController'
exports.register = function(server: Hapi.Server, options, cont){
    const syllabusCompletionctrl:SyllabusCompletionController = new SyllabusCompletionController();
    server.route([
        {
            method:"POST",
            path:"/student/{standard}/{rollNumber}/{subject}/syllabus",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler: syllabusCompletionctrl.insertSyllabusCompletion
        },
        {
            method:"GET",
            path:"/student/{standard}/{rollNumber}/{subject}/syllabus",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler:syllabusCompletionctrl.getSyllabusCompletion
        },
        {
            method:"PUT",
            path:"/student/{standard}/{rollNumber}/{subject}/syllabus",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler:syllabusCompletionctrl.editSyllabusCompletion
        },
        {
            method:"DELETE",
            path:"/student/{standard}/{rollNumber}/{subject}/syllabus",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler:syllabusCompletionctrl.deleteSyllabusCompletion
        }
    ]);
    cont();
}

exports.register.attributes = {
    name: "btc-syllabuscompletion-route",
    version: "1.0"
};