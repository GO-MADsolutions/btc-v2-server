/**
 * Created by gpalani on 09-02-2018.
 */
import * as Hapi from 'hapi';
import {date} from "joi";

export class TestController{
    constructor(){}
    insertTest(request: Hapi.Request, reply){
        const testeModel  = request.server.plugins['hapi-mongo-models'].Test;
        const test = request.payload;
        test.percentage = (test.mark/test.fullMark)*100;
       
        testeModel.insertOne(test,function (err,success) {
            if(err){
                reply(err)
            }
            else{
                reply(success);
            }
        })

    }

    findTestOfaStundent(request: Hapi.Request, reply){
        const testModel  = request.server.plugins['hapi-mongo-models'].Test;
        const filter = {
            'rollNumber':request.params.rollNumber
        }
        testModel.find(filter, function (err, success) {
            if(err){
                reply(err)
            }
            else {
                reply(success)
            }
        })
    }


}