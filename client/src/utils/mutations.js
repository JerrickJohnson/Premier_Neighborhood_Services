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

export const UPDATE_EVENTS = gql`
  mutation updateEvents(
    $eventId: ID!
    $name: String!
    $description: String!
    $date: String!
    $location: String!
    $host: String!
    $attendees: String
    $isPublic: Boolean
    $likes: Int
    $comments: String
  ) {
    updateEvents(
      eventId: $eventId
      name: $name
      description: $description
      date: $date
      location: $location
      host: $host
      attendees: $attendees
      isPublic: $isPublic
      likes: $likes
      comments: $comments
    ) {
      _id
      name
      description
      date
      location
      host
      attendees
      isPublic
      likes
      comments
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent(
    $name: String!
    $description: String!
    $date: String!
    $location: String!
    $host: String!
    $isPublic: Boolean
  ) {
    addEvent(
      name: $name
      description: $description
      date: $date
      location: $location
      host: $host
      isPublic: $isPublic
    ) {
      _id
      name
      description
      date
      location
      host
      isPublic
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($eventId: ID!, $commentBody: String!) {
    addComment(eventId: $eventId, commentBody: $commentBody) {
      _id
      comments {
        _id
        commentBody
        createdAt
        username
      }
    }
  }
`;

export const ADD_LIKE = gql`
  mutation addLike($eventId: ID!) {
    addLike(eventId: $eventId) {
      _id
      likes
    }
  }
`;

export const ADD_ATTENDEE = gql`
  mutation addAttendee($eventId: ID!) {
    addAttendee(eventId: $eventId) {
      _id
      attendees
    }
  }
`;

export const REMOVE_EVENT = gql`
  mutation removeEvent($eventId: ID!) {
    removeEvent(eventId: $eventId) {
      _id
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($eventId: ID!, $commentId: ID!) {
    removeComment(eventId: $eventId, commentId: $commentId) {
      _id
      comments {
        _id
      }
    }
  }
`;

export const REMOVE_LIKE = gql`
  mutation removeLike($eventId: ID!) {
    removeLike(eventId: $eventId) {
      _id
    }
  }
`;

export const REMOVE_ATTENDEE = gql`
  mutation removeAttendee($eventId: ID!) {
    removeAttendee(eventId: $eventId) {
      _id
    }
  }
`;

