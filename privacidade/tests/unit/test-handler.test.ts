import { APIGatewayProxyEvent } from 'aws-lambda';
import { MongoClient } from 'mongodb';
import { lambdaHandler } from '../../app';

jest.mock('mongodb', () => {
    const actualMongoDB = jest.requireActual('mongodb');
    return {
        ...actualMongoDB,
        MongoClient: jest.fn().mockImplementation(() => ({
            connect: jest.fn(),
            db: jest.fn().mockReturnValue({
                collection: jest.fn().mockReturnValue({
                    insertOne: jest.fn().mockResolvedValue({ insertedId: 'mocked_id' }),
                }),
            }),
            close: jest.fn(),
        })),
    };
});

const mockedMongoClient = new MongoClient('mocked_uri') as unknown as jest.Mocked<MongoClient>;

describe('lambdaHandler', () => {
    it('should return 400 if required fields are missing', async () => {
        const event: APIGatewayProxyEvent = {
            body: JSON.stringify({}),
            headers: {},
            multiValueHeaders: {},
            httpMethod: 'POST',
            isBase64Encoded: false,
            path: '/',
            pathParameters: null,
            queryStringParameters: null,
            multiValueQueryStringParameters: null,
            stageVariables: null,
            requestContext: {
                accountId: '',
                apiId: '',
                authorizer: null,
                httpMethod: 'POST',
                identity: {
                    accessKey: null,
                    accountId: null,
                    apiKey: null,
                    apiKeyId: null,
                    caller: null,
                    clientCert: null,
                    cognitoAuthenticationProvider: null,
                    cognitoAuthenticationType: null,
                    cognitoIdentityId: null,
                    cognitoIdentityPoolId: null,
                    principalOrgId: null,
                    sourceIp: '',
                    user: null,
                    userAgent: null,
                    userArn: null,
                },
                path: '/',
                protocol: '',
                requestId: '',
                requestTimeEpoch: 0,
                resourceId: '',
                resourcePath: '',
                stage: '',
            },
            resource: '',
        };

        const result = await lambdaHandler(event, mockedMongoClient);
        expect(result.statusCode).toBe(400);
        expect(JSON.parse(result.body).message).toBe('Os campos nome, endereco, and numeroTelefone são obrigatorios');
    });

    it('should return 200 if data is inserted successfully', async () => {
        const event: APIGatewayProxyEvent = {
            body: JSON.stringify({
                nome: 'John Doe',
                endereco: '123 Main St',
                numeroTelefone: '555-1234',
            }),
            headers: {},
            multiValueHeaders: {},
            httpMethod: 'POST',
            isBase64Encoded: false,
            path: '/',
            pathParameters: null,
            queryStringParameters: null,
            multiValueQueryStringParameters: null,
            stageVariables: null,
            requestContext: {
                accountId: '',
                apiId: '',
                authorizer: null,
                httpMethod: 'POST',
                identity: {
                    accessKey: null,
                    accountId: null,
                    apiKey: null,
                    apiKeyId: null,
                    caller: null,
                    clientCert: null,
                    cognitoAuthenticationProvider: null,
                    cognitoAuthenticationType: null,
                    cognitoIdentityId: null,
                    cognitoIdentityPoolId: null,
                    principalOrgId: null,
                    sourceIp: '',
                    user: null,
                    userAgent: null,
                    userArn: null,
                },
                path: '/',
                protocol: '',
                requestId: '',
                requestTimeEpoch: 0,
                resourceId: '',
                resourcePath: '',
                stage: '',
            },
            resource: '',
        };

        const result = await lambdaHandler(event, mockedMongoClient);
        expect(result.statusCode).toBe(200);
        const responseBody = JSON.parse(result.body);
        expect(responseBody.message).toBe('Solicitacao de exclusão ou inativacão de dado realizada com sucesso');
        expect(responseBody.protocolo).toBeDefined();
        expect(responseBody.protocolo).toBe('mocked_id');
    });
});
