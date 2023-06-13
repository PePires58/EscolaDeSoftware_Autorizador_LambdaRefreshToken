const validateTokenInputService = require('./services/validate-token-input-object.service');
const refreshToken = require('./services/refresh-token.service');
const getTokenSecretService = require('./services/get-token-secret.service');
const createTokenPutItemService = require('./services/create-token-put-item.service');
const putTokenItemDynamoService = require('./services/put-token-item-dynamodb.service');

exports.lambdaHandler = async (event, context) => {

    const bodyJson = JSON.parse(event.body);

    const errors = validateTokenInputService.validateTokenInputService(bodyJson);
    if (errors.length > 0)
        return errorResult(400, errors);

    const privateKeyParameter = await getTokenSecretService.getTokenSecret();

    let newToken = new ResultToken();
    try {
        newToken = refreshToken.refreshToken(bodyJson.authorizationToken, privateKeyParameter);
    }
    catch (error) {
        console.log(error);
        return errorResult(400, { 'Mensagem': 'Problemas ao criar um novo token' });
    }

    try {
        const tokenPutItem = createTokenPutItemService.createTokenPutItem(newToken);
        await putTokenItemDynamoService.putTokenOnDatabase(tokenPutItem);

        newToken.expiresIn = tokenPutItem.expiration_time.N;
        return defaultResult(200, { token: newToken.newToken, expiresIn: newToken.expiresIn });
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