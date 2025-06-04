import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { NextApiRequest, NextApiResponse } from 'next';

// Create Apollo Server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // This would typically extract the user from a JWT token
    // For now, we'll return a simple mock context
    const user = null; // Would be decoded from authorization header
    return { user };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// Handler for Next.js API route
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const startServer = apolloServer.start();
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}