/**
 * Created by gpalani on 09-02-2018.
 */
import * as Hapi from "hapi";
import {TestController} from '../controllers/TestController';
exports.register = function (server: Hapi.Server, options, cont) {
    const testeCtrl = new TestController();
    server.route([
        {
            method:"GET",
            path:"/test/{rollNumber}",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['student','admin']
                }
            },
            handler:testeCtrl.findTestOfaStundent
        },
        {
            method:"POST",
            path:"/test/{rollNumber}",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler:testeCtrl.insertTest
        }
    ])
    cont();
}


exports.register.attributes = {
    name: "btc-test-route",
    version: "1.0"
};