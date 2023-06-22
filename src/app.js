const validateTokenInputService = require('./services/validate-token-input-object.service');
const refreshToken = require('./services/refresh-token.service');
const createTokenPutItemService = require('./services/create-token-put-item.service');
const putTokenItemDynamoService = require('./services/put-token-item-dynamodb.service');

const esAutorizadorPkg = require('escoladesoftware-autorizador-package');

exports.lambdaHandler = async (event, context) => {

    const bodyJson = JSON.parse(event.body);

    const errors = validateTokenInputService.validateTokenInputService(bodyJson);
    if (errors.length > 0)
        return errorResult(400, errors);

    const privateKeyParameter = await esAutorizadorPkg.tokenSecret(process.env.TokenSecretParameterName,
        false);

    let newToken = '';
    try {
        newToken = refreshToken.refreshToken(bodyJson.token,
            privateKeyParameter.Parameter.Value);
    }
    catch (error) {
        console.log(error);
        return errorResult(400, { 'Mensagem': 'Problemas ao criar um novo token' });
    }

    try {
        const tokenPutItem = createTokenPutItemService.createTokenPutItem(newToken);
        await putTokenItemDynamoService.putTokenOnDatabase(tokenPutItem);

        return defaultResult(200, {
            token: newToken,
            expiresIn: tokenPutItem.expiration_time.N
        });
    }
    catch (error) {
        console.log(error);
        return errorResult(500, { 'Mensagem': 'Problemas ao cadastrar token no banco' });
    }
}

function errorResult(statusCode, errors) {
    return defaultResult(statusCode, {
        errors: errors
    });
}

function defaultResult(statusCode, object) {
    return {
        'statusCode': statusCode,
        'body': JSON.stringify(object),
        'isBase64Encoded': false,
        'headers': {
            'Content-Type': 'application/json'
        }
    }
}