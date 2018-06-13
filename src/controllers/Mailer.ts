'use strict'
import * as Fs from 'fs';
import * as Path from 'path';;
import * as Boom from 'boom';
const Util = require('util')
import * as  Nodemailer from'nodemailer';
import * as Handlebars  from 'handlebars';
import * as  htmlToText from 'html-to-text';
import * as  PostmarkTransport from'nodemailer-postmark-transport';
import * as Hapi from "hapi";
export class Mailer {
    Templates;
    ReadFile

    constructor() {
        this.Templates = Path.resolve(__dirname, '../', 'template');
        this.ReadFile = Util.promisify(Fs.readFile);
    }

    public async prepareTemplate(filename, options) {
        try {
            const templatePath = Path.resolve(this.Templates, `${filename}.html`);
            const content = await  this.ReadFile(templatePath, 'utf8');
            const template = Handlebars.compile(content);
            const html = template(options);
            const text = htmlToText.fromString(html);

            return {
                html,
                text
            };
        } catch (error) {
            console.log('ERRROR IN TEMPLATE', error);
        }
    }

    public async sendQueryMail(request: Hapi.Request) {
        try {
           const payload = request.payload;
            const {html, text} = await this.prepareTemplate('query',  { payload });
            let transporter = Nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'balajituitioncenter17@gmail.com',
                    pass: 'Knowledgewe$erve'
                }
            });
            var mail = {
                from: 'balajituitioncenter17@gmail.com',
                to: payload.email,
                subject: 'Welcome to Balaji Tuition Center',
                html,
                text
            }
            await transporter.sendMail(mail);
        }
        catch (err) {
            console.log('SEND QUERy MAIL ERROR')
        }
    }
    public async notificationMail(request: Hapi.Request) {
        try {
            const payload = request.payload;
            const {html, text} = await this.prepareTemplate('notification',  { payload });
            let transporter = Nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'balajituitioncenter17@gmail.com',
                    pass: 'Knowledgewe$erve'
                }
            });
            var mail = {
                from: 'balajituitioncenter17@gmail.com',
                to: 'balajituitioncenter17@gmail.com',
                subject: 'Action Needed',
                html,
                text
            }
            await transporter.sendMail(mail);
        }
        catch (err) {
            console.log('SEND QUERy MAIL ERROR')
        }
    }
    public async userCreationMail(request: Hapi.Request) {
        try {
            const payload = request.payload;
            const {html, text} = await this.prepareTemplate('newuser',  { payload });
            let transporter = Nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'balajituitioncenter17@gmail.com',
                    pass: 'Knowledgewe$erve'
                }
            });
            var mail = {
                from: 'balajituitioncenter17@gmail.com',
                to: payload.email,
                subject: 'Welcome To Balaji Tuition Center',
                html,
                text
            }
            await transporter.sendMail(mail);
        }
        catch (err) {
            console.log('SEND QUERy MAIL ERROR')
        }
    }
    public async passwordUpdateMail(request: Hapi.Request) {
        try {
            const payload = request.payload;
            const {html, text} = await this.prepareTemplate('notification',  { payload });
            let transporter = Nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'balajituitioncenter17@gmail.com',
                    pass: 'Knowledgewe$erve'
                }
            });
            var mail = {
                from: 'balajituitioncenter17@gmail.com',
                to: 'balajituitioncenter17@gmail.com',
                subject: 'Action Needed',
                html,
                text
            }
            await transporter.sendMail(mail);
        }
        catch (err) {
            console.log('SEND QUERy MAIL ERROR')
        }
    }
}