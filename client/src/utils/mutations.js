import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
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
  }
`;

// export const ADD_PRODUCT = gql`
//   mutation addProduct($products: [ID]!) {
//     addProduct(products: $products) {
//       products {
//         _id
//         name
//         description
//         images
//         price
//         quantity
//         category {
//           name
//         }
//         seller {
//           _id
//       }
//      }
//    }
//   }
// `;

export const ADD_PRODUCT = gql`
mutation Mutation(
    $name: String!, 
    $description: String!, 
    $image: String!, 
    $price: Float!, 
    $quantity: Int!, 
    $category: String!, 
    $seller: String!
  ) {
  addProduct(
    name: $name, 
    description: $description, 
    image: $image, 
    price: $price, 
    quantity: $quantity, 
    category: $category, 
    seller: $seller
  ) {
    _id
    name
    description
    image
    quantity
    price
    category {
      _id
      name
    }
  }
}
`;



export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $address: String!
    $dob: String!
    $phoneNumber: String!
    $emergencyContact: String!
    $emergencyContactPhoneNumber: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      address: $address
      dob: $dob
      phoneNumber: $phoneNumber
      emergencyContact: $emergencyContact
      emergencyContactPhoneNumber: $emergencyContactPhoneNumber
    ) {
      token
      user {
        _id
      }
    }
  }
`;
