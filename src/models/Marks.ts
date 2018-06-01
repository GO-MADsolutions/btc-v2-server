/**
 * Created by gpalani on 02-02-2018.
 */
/**
 * Created by gpalani on 02-02-2018.
 */

const MongoModel  = require('mongo-models');

const Joi = require('joi');
export class Marks extends MongoModel {
}
Marks.collection = 'marks';
Marks.schema = Joi.object().keys({
    standard:Joi.string().required(),
    subject: Joi.string().required(),
    marks: [Joi.string()]
});
module.exports = Marks;