/**
 * Created by gpalani on 05-03-2018.
 */
/**
 * Created by gpalani on 27-01-2018.
 */
const MongoModel  = require('mongo-models');

const Joi = require('joi');
export class User extends MongoModel {
}
User.collection = 'users';
User.schema = Joi.object().keys({
    userName: Joi.string().optional(),
    password: Joi.string().optional(),
    role: Joi.string().optional(),
    firstLogin: Joi.string().optional()
});
module.exports = User;