const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
    seller: User
    PurchasedBy: User
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    dob: String
    phoneNumber: String
    emergencyContact: String
    emergencyContactPhoneNumber: String
    orders: [Order]
    address: String
    outstandingDues: Float
    paidDues: Float
    products: [Product]
    messages: [Message] # Add this field to include the messages associated with the user
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Events {
    _id: ID
    name: String
    description: String
    date: String
    location: String
    host: [User]
    attendees: [User]
    isPublic: Boolean
    likes: Int
  }

  type Review {
    _id: ID
    reviewText: String
    rating: Int
    user: User
    service: Service
  }

  type Service {
    _id: ID
    name: String
    rating: Int
    reviews: [Review]
    category: String
    image: String
  }

  type Message {
    _id: ID
    sender: User
    receiver: User
    messageText: String
    createdAt: String
    product: Product
  }

  input ProductInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: Float
    quantity: Int
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ProductInput]): Checkout
    events: [Events]
    services: [Service]
    sellerProducts(sellerId: ID!): [Product]
    messages(sender: ID!, receiver: ID!, product: ID): [Message]
    messageHistory(user: ID!): [User]
    productMessages(product: ID!): [Message]
}

  type Mutation {
    addUser(
      firstName: String!,
      lastName: String!,
      email: String!,
      password: String!,
      address: String,
      dob: String,
      phoneNumber: String,
      emergencyContact: String,
      emergencyContactPhoneNumber: String
    ): Auth
    updateUser(
      firstName: String,
      lastName: String,
      email: String,
      password: String,
      address: String,
      dob: String,
      phoneNumber: String,
      emergencyContact: String,
      emergencyContactPhoneNumber: String
    ): User
    addOrder(products: [ID]!): Order
    addEvent(name: String, date: String, description: String, location: String): Events
    addReview(reviewText: String!, rating: Int!, service: ID!): Service
    addService(name: String!, rating: Int!, category: String!, image: String!): Service
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
    addProduct(
      name: String!,
      description: String!,
      image: String!,
      price: Float!,
      quantity: Int!, 
      category: String!
      seller: ID!
    ): Product
    removeProduct(_id: ID!): Product  
    sendMessage(sender: ID!, receiver: ID!, messageText: String!, product: ID!): Message
  }
`;

module.exports = typeDefs;