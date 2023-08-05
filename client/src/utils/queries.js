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
<<<<<<< HEAD
  query getUser($id: ID!) {
    user(id: $id) {
=======
  {
    user {
>>>>>>> bc13fe5c57dfc84ef79e0c5df55d4850d8bbaba9
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