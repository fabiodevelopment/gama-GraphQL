import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
const app = express();
async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs: gql`
            type Client {
                id: ID!
                name: String!
            }
            type Demand {
                id: ID!
                name: String!
                client: Client!
                deadline: String
            }
            type Query {
                demands: [Demand]!
            }
        `,
        resolvers: {
            Query: {
                demands: () => [],
            },
        }
    });
    await server.start();
    server.applyMiddleware({
        app,
        cors: {
            origin: 'http://localhost:3000'
        },
    });
    //server.get('/status', (_, response) => {
    //    response.send({
    //        status: 'Okay',
    //    });
    //});
    // server
    //     .options('/authenticate', enableCors)
    //     .post('/authenticate', enableCors, express.json(), (request, response) => {
    //         console.log(
    //             'E-mail', request.body.email,
    //             'Senha', request.body.senha
    //         );
    //         response.send({
    //             Okay: true
    //         });
    //     });
    const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
    const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';
    // await server.listen(PORT, HOSTNAME, () => {
    //     console.log(`Server is listening at http://${HOSTNAME}:${PORT}`);
    // })
    await new Promise(resolve => app.listen({ port: PORT }, resolve));
    return { server, app };
}
startApolloServer();