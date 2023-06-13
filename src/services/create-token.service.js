const jwt = require('jsonwebtoken');

exports.createToken = function (user, privateKey) {

    const token = jwt.sign(user, privateKey.Parameter.Value, {
        expiresIn: '2 days',
        issuer: 'escoladesoftware',
        notBefore: '120ms',
        subject: user.email + '-escoladesoftware-user-token',
        audience: 'escoladesoftware',
    });

    return token;
}