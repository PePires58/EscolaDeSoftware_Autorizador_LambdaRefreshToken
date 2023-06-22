const esAutorizadorPkg = require('escoladesoftware-autorizador-package');

exports.refreshToken = function (token = '', privateKey = '') {

    let tokenInformations = esAutorizadorPkg.validaToken(token, privateKey,
        {
            issuer: 'escoladesoftware',
            audience: 'escoladesoftware'
        });

    return esAutorizadorPkg.criaToken(tokenInformations, privateKey, {
        expiresIn: '2 days',
        issuer: 'escoladesoftware',
        notBefore: '120ms',
        subject: user.email + '-escoladesoftware-user-token',
        audience: 'escoladesoftware',
    });
}