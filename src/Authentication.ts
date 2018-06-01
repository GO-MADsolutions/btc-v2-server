/**
 * Created by gpalani on 05-03-2018.
 */

exports.register = function(server, options, next){
    server.register(require('hapi-auth-jwt'), function (error) {
        server.auth.strategy('BTCAuth', 'jwt',{
            key: 'BTC',
            verifyOptions: { algorithms: ['HS256'] }
        })
    })
    next();
}
exports.register.attributes = {
    name : 'BtcServerAuthentication',
    version: '1.0'
};
