import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI ?? '';
const dbName = 'Cluster0';

if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
}

//let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
    // if (cachedClient && cachedClient.topology && cachedClient.topology.isConnected()) {
    //     return cachedClient;
    // }

    const client = new MongoClient(uri);
    await client.connect();
    //cachedClient = client;
    return client;
}

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const requestBody = JSON.parse(event.body ?? '{}');

        const { nome, endereco, numeroTelefone } = requestBody;
        if (!nome || !endereco || !numeroTelefone) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Os campos nome, endereco, and numeroTelefone são obrigatorios',
                }),
            };
        }

        const client = await connectToDatabase();
        const db = client.db(dbName);
        const collection = db.collection('privacidade');

        const data = { nome, endereco, numeroTelefone };
        const result = await collection.insertOne(data);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Solicitacao de exclusão ou inativacão de dado realizada com sucesso',
                protocolo: result.insertedId,
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Internal Server Error',
            }),
        };
    }
};
