/**
 * Created by gpalani on 02-02-2018.
 */
const MongoModel  = require('mongo-models');

const Joi = require('joi');
export class Test extends MongoModel {
}
Test.collection = 'tests';
Test.schema = Joi.object().keys({
    rollNumber: Joi.string().optional(),
    subject: Joi.string().optional(),
    date: Joi.string().optional(),
    mark: Joi.string().optional(),
    fullMark: Joi.string().optional(),
    percentage: Joi.number().optional()
});
module.exports = Test;