import { gql } from "@apollo/client";

export const ADMIN_REGISTER = gql`
  mutation createAdmin(
    $firstname: String!
    $lastname: String!
    $age: Int!
    $phonenumber: String!
    $email: String!
    $password: String!
    $gender: String!
    $role: String!
  ) {
    createAdmin(
      firstname: $firstname
      lastname: $lastname
      age: $age
      phonenumber: $phonenumber
      email: $email
      password: $password
      gender: $gender
      role: $role
    ) {
      message
    }
  }
`;

export const ADMIN_INSERT_PRODUCT = gql`
  mutation AddProductDetails(
    $name: String!
    $subtitle: [String]!
    $outer_image: Upload!
    $price: Int!
    $rating: Int!
    $overview: String!
    $company_name: String!
    $category: String!
    $subcategory: String!
    $quantity: Int!
    $discount: Int!
    $all_images: [Upload!]!
  ) {
    addProductDetails(
      name: $name
      subtitle: $subtitle
      outer_image: $outer_image
      price: $price
      rating: $rating
      overview: $overview
      company_name: $company_name
      category: $category
      subcategory: $subcategory
      quantity: $quantity
      discount: $discount
      all_images: $all_images
    ) {
      id
      name
      outer_image
      images {
        image
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $subtitle: [String]!
    $outer_image: Upload!
    $all_images: [Upload!]!
    $price: Int!
    $rating: Int!
    $overview: String!
    $company_name: String!
    $category: String!
    $subcategory: String
    $quantity: Int!
    $discount: Int!
  ) {
    createProduct(
      name: $name
      subtitle: $subtitle
      outer_image: $outer_image
      all_images: $all_images
      price: $price
      rating: $rating
      overview: $overview
      company_name: $company_name
      category: $category
      subcategory: $subcategory
      quantity: $quantity
      discount: $discount
    ) {
      id
      name
      subtitle
      outer_image
      price
      rating
      overview
      company_name
      category
      subcategory
      quantity
      discount
    }
  }
`;

export const USER_REGISTER = gql`
  mutation createUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
    $phonenumber: String!
    $role: String
  ) {
    createUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
      phonenumber: $phonenumber
      role: $role
    ) {
      message
    }
  }
`;

// Mutation to add a new address
export const ADD_ADDRESS = gql`
  mutation addAddress(
    $userId: ID!
    $name: String!
    $phonenumber: String!
    $pincode: String!
    $locality: String!
    $com_address: String!
    $city: String!
    $state: String!
    $landmark: String
    $alternate_phonenumber: String
    $address_type: String!
  ) {
    addAddress(
      userId: $userId
      name: $name
      phonenumber: $phonenumber
      pincode: $pincode
      locality: $locality
      com_address: $com_address
      city: $city
      state: $state
      landmark: $landmark
      alternate_phonenumber: $alternate_phonenumber
      address_type: $address_type
    ) {
      id
      isActiveAddress
    }
  }
`;

export const UPDATE_ADDRESS = gql`
  mutation updateAddress(
    $id: ID!
    $userId: ID!
    $name: String
    $phonenumber: String
    $pincode: String
    $locality: String
    $com_address: String
    $city: String
    $state: String
    $landmark: String
    $alternate_phonenumber: String
    $address_type: String
    $isActiveAddress: Boolean
  ) {
    updateAddress(
      id: $id
      userId: $userId
      name: $name
      phonenumber: $phonenumber
      pincode: $pincode
      locality: $locality
      com_address: $com_address
      city: $city
      state: $state
      landmark: $landmark
      alternate_phonenumber: $alternate_phonenumber
      address_type: $address_type
      isActiveAddress: $isActiveAddress
    ) {
      id
      name
      phonenumber
      city
      isActiveAddress
    }
  }
`;

export const DELETE_ADDRESS = gql`
  mutation deleteAddress($addressId: ID!, $userId: ID!) {
    deleteAddress(addressId: $addressId, userId: $userId)
  }
`;

// Mutation to set an active address
export const SET_ACTIVE_ADDRESS = gql`
  mutation setActiveAddress($userId: ID!, $addressId: ID!) {
    setActiveAddress(userId: $userId, addressId: $addressId) {
      id
      isActiveAddress
    }
  }
`;

export const ADD_ORDER = gql`
  mutation AddOrder(
    $userId: ID!
    $productId: ID!
    $quantity: Int
    $status: OrderStatus!
  ) {
    addOrder(
      userId: $userId
      productId: $productId
      quantity: $quantity
      status: $status
    ) {
      id
      status
      quantity
      product {
        name
        price
        outer_image
        discount
      }
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder(
    $orderId: ID
    $orderIds: [ID]
    $quantity: Int
    $increase: Boolean
    $delete: Boolean
    $status: OrderStatus
  ) {
    updateOrder(
      orderId: $orderId
      orderIds: $orderIds
      quantity: $quantity
      increase: $increase
      delete: $delete
      status: $status
    ) {
      id
      status
      quantity
      product {
        name
        price
        outer_image
        discount
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($name: String!, $email: String!, $message: String!) {
    sendMessage(name: $name, email: $email, message: $message)
  }
`;
// export const UPDATE_ORDER_STATUS = gql`
//   mutation UpdateOrderStatus($orderId: ID!, $status: OrderStatus!) {
//     updateOrderStatus(orderId: $orderId, status: $status) {
//       id
//       status
//       product {
//         name
//       }
//     }
//   }
// `;
