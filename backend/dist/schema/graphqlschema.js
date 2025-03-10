"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphQLSchema = void 0;
exports.graphQLSchema = `#graphql
scalar Upload
type Admin{
  id:ID!
  firstname:String,
  lastname:String,
  age:Int,
  phonenumber:String
  email:String,
  password:String,
  gender:String,
  role:String,
}

type AdminLoginOutput {
  message:String,
  user:Admin,
  token:String
}

type AdminRegisterOutput {
  message:String
  data:Admin
}

type ProductDetails {
  id: ID
  name: String!
  subtitles: [Subtitle]!
  outer_image: String!
  images: [ProductImage]!
  price: Float!
  rating: Float!
  overview: String!
  company_name: String!
  category: String!
  subcategory: String!
  quantity: Int!
  discount: Int!
}

type Subtitle {
  id: ID!
  text: String!
}

type ProductImage {
  id: ID!
  image: String!
  productDetails: ProductDetails!
}

type TopCompaniesProducts {
  id: Int!
  company_product_image: String!
}

type File {
  url: String!
}

type User{
  id:ID!
  firstname:String,
  lastname:String,
  phonenumber:String
  email:String,
  password:String,
  role:String
  address:[Address]
}

type UserRegisterOutput{
  message:String
  data:User
}

type UserLoginOutput{
  message:String
  user:User
  token:String
}

type Address{
  id:ID!,
  name:String
  phonenumber: String,
  pincode: String,
  locality: String,
  com_address:String,
  city: String,
  state:String,
  landmark:String,
  alternate_phonenumber:String,
  address_type:String,
  isActiveAddress: Boolean
}

# ORDER STATUS ENUM
enum OrderStatus {
  CART
  ORDERED
  WISHLIST
}

# USER ORDER TYPE
type UserOrder {
  id: ID!
  user: User!
  product: ProductDetails!
  quantity: Int!
  status: OrderStatus!
  createdAt: String!
}


# union UserType = User | Admin
type UserDataOutput {
  message: String
  userData: User
  token: String
}

input OrderInput {
  productId: ID!
  quantity: Int!
  status: OrderStatus!
}

type DeletedAddress{
  message:String
}

type Query{
  loginAdmin(email:String!, password:String!):AdminLoginOutput,
  getProductDetails(id: ID!): ProductDetails
  getTopCompaniesProducts: [TopCompaniesProducts]!
  loginUser(email:String!,password:String!):UserLoginOutput
  #get products according to companyname or category or subcatgeory
  getProducts(company_name: String, category: String, subcategory: String): [ProductDetails]
  #get productdetails by id
  getProductById(id: ID!): ProductDetails
  #get all address
  getUserAddresses(userId: ID!): [Address]!
  getAddressByID(userId:ID!,addressId:ID!):Address
  #get orderes tabel cart or ordered order
  getUserOrders(userId: ID!, status: OrderStatus!): [UserOrder]!
  #getUser
  getUser:UserDataOutput
  #get product
  getSearchProducts(searchQuery:String!):[ProductDetails]
}

type Mutation{
  #to create adimin
  createAdmin(firstname:String!,lastname:String!,phonenumber:String!, email:String!, password:String!, role:String!):AdminRegisterOutput

  #to create product
  createProduct(name: String!, subtitle: [String]!, outer_image: Upload!, all_images: [Upload!]!, price: Int!, rating: Int!, overview: String!, company_name: String!,category: String!, subcategory: String, quantity: Int!, discount: Int!): ProductDetails!

  #to create user
  createUser(firstname:String!,lastname:String!,email:String!,password: String!,phonenumber:String!,role:String):UserRegisterOutput

  #add address
  addAddress(userId: ID!,name:String!,phonenumber: String!,pincode: String!,locality: String!,com_address: String!,city: String!,state: String!,landmark: String,alternate_phonenumber: String,address_type: String!): Address!
 
  #update address
  updateAddress(id:ID,userId:ID,name:String,phonenumber:String,pincode:String,locality:String,com_address:String,city:String,state:String, landmark:String,alternate_phonenumber:String,address_type:String,isActiveAddress:Boolean):Address

  #deleteaddress
  deleteAddress(addressId:ID!,userId:ID!):String

  #add order
  addOrder(userId: ID!, productId: ID!, quantity: Int, status: OrderStatus!): UserOrder!

  # addOrder(userId: ID!, products: [OrderInput!]!): [UserOrder!]!
  updateOrder(orderId: ID, orderIds: [ID], quantity: Int, increase: Boolean, delete: Boolean, status: OrderStatus): [UserOrder!]!

  #send email
  sendMessage(name: String!, email: String!, message: String!): String
  
  
}
`;
