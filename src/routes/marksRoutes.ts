/**
 * Created by gpalani on 19-02-2018.
 */
import * as Hapi from "hapi";
import {MarksController} from "../controllers/MarksController";

exports.register = function (server: Hapi.Server, options, cont) {
    const markctrl = new MarksController();
    server.route([
        {
            method:"GET",
            path:"/{standard}/{subject}/mark",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['student','admin']
                }
            },
            handler:markctrl.getMarks
        },
        {
            method:"POST",
            path:"/{standard}/{subject}/mark",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler:markctrl.insertMarks
        },
        {
            method:"PUT",
            path:"/{standard}/{subject}/mark",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler:markctrl.editMarks
        },
        {
            method:"DELETE",
            path:"/{standard}/{subject}/mark",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler:markctrl.deleteMarks
        },
    ])
    cont();
}


exports.register.attributes = {
    name: "btc-marks-route",
    version: "1.0"
};