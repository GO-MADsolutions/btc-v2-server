/**
 * Created by gpalani on 27-01-2018.
 */
const MongoModel  = require('mongo-models');

const Joi = require('joi');
export class Student extends MongoModel {
}
Student.collection = 'students';
Student.schema = Joi.object().keys({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    rollNumber: Joi.string().optional(),
    standard: Joi.string().optional(),
    school: Joi.string().optional(),
    phoneNumber: Joi.string().optional(),
    parentName: Joi.string().optional(),
    email: Joi.string().optional(),
    image: Joi.any().optional()
});
module.exports = Student;