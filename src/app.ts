import { DynamoDbService } from './services/dynamodb';


import { BuscaSegredoParameterStore, RefreshToken } from 'escoladesoftware-autorizador-package-ts';
import { Erro } from './models/erro';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let erros: Erro[] = [];

    const token = event.requestContext.authorizer?.token || '';

    const secret = await new BuscaSegredoParameterStore()
        .BuscarSegredo(process.env.TokenSecretParameterName || '',
            false);
    try {

        const tokenAtualizado = new RefreshToken().RefreshToken(token, secret, {
            expiresIn: '2 days',
            issuer: 'escoladesoftware',
            notBefore: '120ms',
            audience: 'escoladesoftware',
        });

        const tokenRetorno = await new DynamoDbService().AdicionarToken(tokenAtualizado);

        return defaultResult(200, tokenRetorno);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

function errorResult(statusCode: number, erros: Erro[]) {
    return defaultResult(statusCode, {
        erros: erros,
    });
}

function defaultResult(statusCode: number, object: object) {
    return {
        statusCode: statusCode,
        body: JSON.stringify(object),
        isBase64Encoded: false,
        headers: {
            'Content-Type': 'application/json',
        },
    };
}
