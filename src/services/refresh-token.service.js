const jwt = require('jsonwebtoken');
const createTokenService = require('./create-token.service');

exports.refreshToken = function (token, privateKey) {

    const tokenInformations = jwt.verify(token, privateKey.Parameter.Value, {
        issuer: 'escoladesoftware',
        audience: 'escoladesoftware'
    });

    delete tokenInformations.iat;
    delete tokenInformations.exp;
    delete tokenInformations.nbf;
    delete tokenInformations.jti;

    console.log('token antigo');
    console.log(tokenInformations);

    return createTokenService.createToken(tokenInformations, privateKey);
}