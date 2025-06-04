import { NextRequest, NextResponse } from 'next/server';
import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '@/lib/graphql/schema';
import { resolvers } from '@/lib/graphql/resolvers';

// Initialize Apollo Server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // This would extract user information from authorization headers
    return { user: null };
  },
});

// Start the Apollo Server
const startServer = apolloServer.start();

export async function POST(request: NextRequest) {
  await startServer;
  
  const requestBody = await request.json();
  
  try {
    const { body } = await apolloServer.executeOperation({
      query: requestBody.query,
      variables: requestBody.variables,
    });
    
    return NextResponse.json(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { errors: [{ message: 'Internal server error' }] },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'GraphQL API is running. Use POST for queries and mutations.' },
    { status: 200 }
  );
}