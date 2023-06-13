const jwt = require('jsonwebtoken');
const createTokenService = require('./create-token.service');

exports.refreshToken = function (token, privateKey) {

    let tokenInformations = jwt.verify(token, privateKey.Parameter.Value, {
        issuer: 'escoladesoftware',
        audience: 'escoladesoftware'
    });

    tokenInformations = deleteTokenProperties(tokenInformations);

    return createTokenService.createToken(tokenInformations, privateKey);
}

function deleteTokenProperties(token) {
    delete token.iat;
    delete token.exp;
    delete token.nbf;
    delete token.jti;
    delete token.aud;
    delete token.iss;
    delete token.sub;

    return token;
}