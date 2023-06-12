const AWS = require('aws-sdk');
const ssm = new AWS.SSM({ apiVersion: '2014-11-06' });

exports.getTokenSecret = async function () {
    const params = {
        Name: process.env.TokenSecretParameterName,
        WithDecryption: false
    };

    return await ssm.getParameter(params)
        .promise()
        .then((tokenSecret) => {
            return tokenSecret
        });
}