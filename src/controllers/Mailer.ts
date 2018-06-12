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
            console.log('template', template);
            console.log('options', options);
            const html = template(options);
            console.log('options html', html);
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
           console.log('payload',payload);
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
                subject: 'Test',
                html,
                text
                /*template: 'email',
                context: {
                    name: 'HELLO WORLD'
                }*/
            }
            await transporter.sendMail(mail);
           /* transporter.sendMail(mail, function (err, info) {
                if (err) return console.log('error', JSON.stringify(err), {tags: 'email'});
                if (info) return console.log('info', JSON.stringify(info), {tags: 'email'});
            });*/
        }
        catch(err) {
            console.log('SEND QUERy MAIL ERROR')
        }
    }
}