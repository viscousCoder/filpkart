import { gql } from "@apollo/client";

export const GET_ADMIN_USER = gql`
  query loginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      message
      user {
        firstname
        lastname
        role
      }
      token
    }
  }
`;

export const GET_USER = gql`
  query loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      message
      user {
        firstname
        lastname
        role
        email
        phonenumber
      }
      token
    }
  }
`;

export const GET_PRODUCTS = gql`
  query getProducts(
    $company_name: String
    $category: String
    $subcategory: String
  ) {
    getProducts(
      company_name: $company_name
      category: $category
      subcategory: $subcategory
    ) {
      id
      name
      subtitles {
        id
        text
      }
      outer_image
      images {
        id
        image
      }
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

export const GET_PRODUCT_DETAILS = gql`
  query getProductById($id: ID!) {
    getProductById(id: $id) {
      id
      name
      subtitles {
        id
        text
      }
      outer_image
      images {
        id
        image
      }
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

export const GET_QUERY_PRODUCT_DETAILS = gql`
  query getSearchProducts($searchQuery: String!) {
    getSearchProducts(searchQuery: $searchQuery) {
      id
      name
      subtitles {
        id
        text
      }
      outer_image
      images {
        id
        image
      }
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

// Query to fetch user addresses
export const GET_USER_ADDRESSES = gql`
  query getUserAddresses($userId: ID!) {
    getUserAddresses(userId: $userId) {
      id
      name
      phonenumber
      pincode
      locality
      com_address
      city
      state
      landmark
      alternate_phonenumber
      address_type
      isActiveAddress
    }
  }
`;

export const GET_SINGLE_ADDRESS = gql`
  query getSingleAddress($userId: ID!, $addressId: ID!) {
    getSingleAddress(userId: $userId, addressId: $addressId) {
      id
      name
      phonenumber
      pincode
      locality
      com_address
      city
      state
      landmark
      alternate_phonenumber
      address_type
      isActiveAddress
    }
  }
`;

export const GET_USER_ORDERS = gql`
  query GetUserOrders($userId: ID!, $status: OrderStatus!) {
    getUserOrders(userId: $userId, status: $status) {
      id
      quantity
      status
      product {
        id
        name
        subtitles {
          id
          text
        }
        outer_image
        images {
          id
          image
        }
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
  }
`;

export const GET_CURRUSER = gql`
  query getUser {
    getUser {
      message
      userData {
        firstname
        lastname
        phonenumber
        role
        email
        id
      }
      token
    }
  }
`;
