const jwt = require('jsonwebtoken');

exports.createToken = async function (user, privateKey) {

    const token = jwt.sign(user, privateKey.Parameter.Value, {
        expiresIn: '3h',
        issuer: 'escoladesoftware',
        notBefore: '120ms',
        subject: user.email + '-escoladesoftware-user-token',
        audience: 'escoladesoftware',
    });

    return token;
}