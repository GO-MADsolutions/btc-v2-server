/**
 * Created by gpalani on 21-03-2018.
 */
const MongoModel  = require('mongo-models');

const Joi = require('joi');
export class SyllabusCompletion extends MongoModel {
}
SyllabusCompletion.collection = 'syllabuscompletion';
SyllabusCompletion.schema = Joi.object().keys({
    rollNumber: Joi.string().optional(),
    subject: Joi.string().optional(),
    lessonName: Joi.string().optional(),
    marks:[Joi.object().keys({
        mark: Joi.string(),
        status: Joi.string()
    })]
});
module.exports = SyllabusCompletion;