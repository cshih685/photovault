import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    username: String
    photos: [Photo!]
    createdAt: String!
  }

  type Photo {
    id: ID!
    title: String!
    description: String
    url: String!
    thumbnail: String!
    price: Float
    user: User!
    categories: [Category!]
    tags: [String!]
    license: License!
    likes: Int!
    downloads: Int!
    views: Int!
    status: PhotoStatus!
    createdAt: String!
    updatedAt: String!
  }

  enum PhotoStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
  }

  type Category {
    id: ID!
    name: String!
    description: String
    photos: [Photo!]
  }

  type License {
    id: ID!
    name: String!
    description: String!
    price: Float!
    permissions: [String!]!
  }

  type Order {
    id: ID!
    user: User!
    items: [OrderItem!]!
    total: Float!
    status: OrderStatus!
    createdAt: String!
  }

  type OrderItem {
    id: ID!
    order: Order!
    photo: Photo!
    license: License!
    price: Float!
  }

  enum OrderStatus {
    PENDING
    COMPLETED
    CANCELLED
  }

  type Query {
    me: User
    user(id: ID!): User
    users: [User!]!

    photo(id: ID!): Photo
    photos(
      limit: Int
      offset: Int
      category: ID
      tag: String
      search: String
    ): [Photo!]!
    featuredPhotos: [Photo!]!

    category(id: ID!): Category
    categories: [Category!]!

    order(id: ID!): Order
    myOrders: [Order!]!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): AuthPayload!
    updateProfile(name: String, username: String, bio: String): User!

    uploadPhoto(
      title: String!
      description: String
      file: Upload!
      price: Float
      categories: [ID!]
      tags: [String!]
      licenseId: ID!
    ): Photo!

    updatePhoto(
      id: ID!
      title: String
      description: String
      price: Float
      categories: [ID!]
      tags: [String!]
      status: PhotoStatus
      licenseId: ID
    ): Photo!

    deletePhoto(id: ID!): Boolean!
    likePhoto(id: ID!): Photo!
    unlikePhoto(id: ID!): Photo!

    createOrder(items: [OrderItemInput!]!): Order!
  }

  input OrderItemInput {
    photoId: ID!
    licenseId: ID!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  scalar Upload
`;