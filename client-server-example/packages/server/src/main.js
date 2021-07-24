import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const app = express();

async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start();
    server.applyMiddleware({
        app,
        cors: {
            origin: 'http://localhost:3000'
        },
		bodyParserConfig: true,
    });

    const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
    const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';

    await new Promise(resolve => app.listen({ port: PORT }, resolve));
    return { server, app };
}
startApolloServer();