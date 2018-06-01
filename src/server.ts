/**
 * Created by gpalani on 24-01-2018.
 */
"use strict";
import * as Glue from "glue";
const dbOpts = {

    /*url: 'mongodb://localhost:27017/demo',*/
    url: 'mongodb://btc-admin:btcAdmin17@ds137246.mlab.com:37246/btcv2',
    settings: {
        poolSize: 10
    },
    decorate: true
}
const manifest = {
    server:{
        "load": {
            "sampleInterval": 1000
        }
    },
    connections:[{
        port:process.env.PORT
    }],
    registrations:[
         {
         plugin:{
         register: 'hapi-mongodb',
         options:dbOpts
         }
         },
        {
            plugin :{
                register: './Authentication',
            }
        },
        {
            plugin:{
                register: './routes/studentRoutes',
            }
        },
        {
            plugin:{
                register: './routes/lessonRoutes',
            }
        },
        {
            plugin:{
                register: './routes/marksRoutes',
            }
        },
        {
            plugin:{
                register: './routes/attendanceRoutes',
            }
        },
        {
            plugin:{
                register: './routes/userRoutes',
            }
        },
        {
            plugin:{
                register: './routes/testRoutes',
            }
        },
        {
            plugin:{
                register: './routes/SyllabusCompletionRoutes',
            }
        },
        {
            plugin:{
                register:'hapi-cors',
                options : {
                    origins: ['http://localhost:4200'],
                    methods: ['POST, GET, OPTIONS, PUT, DELETE'],
                }
            }
        },
        {
            plugin:{
                register:'hapi-mongo-models',
                options:{
                    mongodb:{
                        uri: 'mongodb://btc-admin:btcAdmin17@ds137246.mlab.com:37246/btcv2'
                    },
                    autoIndex: false,
                    models:{
                        Student:"./build/models/Student",
                        Lesson:"./build/models/Lessons",
                        Attendance: "./build/models/Attendance",
                        Mark:"./build/models/Marks",
                        User:"./build/models/User",
                        SyllabusCompletion:"./build/models/SyllabusCompletion",
                        Test:"./build/models/Test"
                    }
                }
            }
        }
    ]
}

const options:Object = {
    relativeTo: __dirname
};

const startServer = async function()  {
    try{    
        const server = await Glue.compose(manifest,options);
        await server.start();
        console.log('Server Started! on port'+ server.info.port);
    }catch(err){
        console.error(err);
    }
}

startServer();