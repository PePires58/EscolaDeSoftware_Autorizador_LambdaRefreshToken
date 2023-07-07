import {
    AttributeValue, DynamoDBClient,
    PutItemCommand, PutItemCommandInput
} from "@aws-sdk/client-dynamodb";

import { ResultToken } from "../models/result-token";

export class DynamoDbService {

    constructor() {
        this.client = new DynamoDBClient({ apiVersion: '2012-08-10' });
    }

    private client: DynamoDBClient;

    async AdicionarToken(token: string): Promise<ResultToken> {

        const itemToken = this.CriarObjetoToken(token);

        const input: PutItemCommandInput = {
            TableName: process.env.TokenTableName,
            Item: this.CriarObjetoToken(token),
            ReturnConsumedCapacity: "TOTAL",
            ConditionExpression: "attribute_not_exists(jwt_token)"
        };

        const command: PutItemCommand = new PutItemCommand(input);

        await this.client.send(command);

        return {
            token: token,
            expiresIn: Number.parseInt(itemToken.expiration_time.N || '0')
        };
    }

    private CriarObjetoToken(token: string): Record<string, AttributeValue> {
        return {
            "jwt_token": {
                S: token
            },
            "expiration_time": {
                N: (Math.floor(Date.now() / 1000) + ((60 * 60) * 48)).toString()
            }
        };
    }
}