import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
      seller {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const QUERY_SELLER_PRODUCTS = gql`
  query getSellerProducts($sellerId: ID!) {
    sellerProducts(sellerId: $sellerId) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
      seller {
        _id
        firstName
        lastName
      }
    }
  }
`;
export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ProductInput]) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      _id
      firstName
      lastName
      dues
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;

export const QUERY_EVENTS = gql`
  {
    events {
      name
      location
      description
      date
      _id
    }
  }
`;

export const CREATE_CHECKOUT_SESSION = gql`
  mutation checkout($id: ID!) {
    checkout(id: $id) {
      session
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $dues: Int!) {
    updateUser(id: $id, dues: $dues) {
      _id
      dues
    }
  }
`;

export const QUERY_USER_PAYMENT_INFO = gql`
  query getUserPaymentInfo($id: ID!) {
    user(id: $id) {
      _id
      firstName
      lastName
      address
      dues
    }
  }
`;

export const QUERY_USER_PAYMENTS = gql`
  query getUserPayments($userId: ID!) {
    payments(userId: $userId) {
      _id
      user {
        _id
      }
      amount
      paymentMethod
      paymentDate
      paymentPurpose
      status
    }
  }
`;

export const QUERY_MESSAGES = gql`
  query getMessages($sender: ID!, $receiver: ID!, $product: ID) {
    messages(sender: $sender, receiver: $receiver, product: $product) {
      _id
      sender {
        _id
        firstName
        lastName
      }
      receiver {
        _id
        firstName
        lastName
      }
      messageText
      createdAt
    }
  }
`;

export const QUERY_MESSAGE_HISTORY = gql`
  query getMessageHistory($user: ID!) {
    messageHistory(user: $user) {
      _id
      firstName
      lastName
    }
  }
`;

export const QUERY_PRODUCT_MESSAGES = gql`
  query getProductMessages($product: ID!) {
    productMessages(product: $product) {
      _id
      sender {
        _id
        firstName
        lastName
      }
      receiver {
        _id
        firstName
        lastName
      }
      messageText
      createdAt
    }
  }
`;