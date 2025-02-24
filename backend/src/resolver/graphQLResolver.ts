import bycrypt from "bcryptjs";
import {
  delete_user_address,
  insert_user_address,
  insert_user_db,
  insert_user_order,
  insertProductDB,
  update_user_address,
  update_user_order,
} from "../addingData/inserting_data";
import {
  get_admin_db,
  get_product_details,
  get_products_list,
  get_search_product_list,
  get_user_address,
  get_user_db,
  get_user_order,
  get_user_single_address,
} from "../getData/get_user";
import { generateToken } from "../middleware/auth";
import { OrderStatus } from "../entities/UserOrder";
import sgMail from "@sendgrid/mail";
// const sgMail = require('@sendgrid/mail');
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

interface admin {
  id: string;
  firstname: string;
  lastname: string;
  age: number;
  phonenumber: string;
  email: string;
  password: string;
  gender: string;
  role: string;
}

interface userlogin {
  email: string;
  password: string;
}

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phonenumber: string;
  role?: string;
}

interface usermiddle {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  role: string;
}

export const graphQLResolver = {
  // Upload: GraphQLUpload,
  Query: {
    /**
     * @function to logged in admin
     * @param _
     * @param param1 email and password
     * @returns token and admin details
     */
    loginAdmin: async (_: any, { email, password }: userlogin) => {
      const user = (await get_admin_db({ email })) as admin;
      if (!user) throw new Error("User not found");
      const isPasswordValid = await bycrypt.compare(password, user.password);
      if (!isPasswordValid) throw new Error("Invalid password");
      const token = await generateToken(user);
      return { message: "Successfully login", user: user, token };
    },

    /**
     * @function to logged in admin
     * @param _
     * @param param1 email and password
     * @returns token and user details
     */
    loginUser: async (_: any, { email, password }: userlogin) => {
      const user = (await get_user_db({ email })) as User | null;
      if (!user) throw new Error("User not found");
      const isPasswordValid = await bycrypt.compare(password, user.password);
      if (!isPasswordValid) throw new Error("Invalid password");
      user.role = user.role ?? "USER";
      const token = await generateToken(user);

      return { message: "Successfully Login", user, token };
    },

    /**
     * @function get product according to company name, catgeory , subcategory
     * @param _
     * @param param1 company name, category, subcategory
     * @returns list of products
     */
    getProducts: async (
      _: any,
      {
        company_name,
        category,
        subcategory,
      }: { company_name?: string; category?: string; subcategory?: string }
    ) => {
      try {
        const data = await get_products_list({
          company_name,
          category,
          subcategory,
        });

        return data;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products. Please try again later.");
      }
    },

    /**
     * @function get product according to query
     * @param _
     * @param param1 query
     * @returns list of products
     */
    getSearchProducts: async (
      _: any,
      { searchQuery }: { searchQuery: string }
    ) => {
      try {
        const data = await get_search_product_list({ searchQuery });
        return data;
      } catch (error) {
        throw new Error("Failed to fetch");
      }
    },

    /**
     * @function get product datials according to the product id
     * @param _
     * @param param1 product id
     * @returns product details
     */
    getProductById: async (_: any, { id }: { id: string }) => {
      try {
        const data = await get_product_details({ id });
        if (!data) {
          throw new Error("No products found for the given criteria.");
        }
        return data;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products. Please try again later.");
      }
    },

    /**
     * @function get user address
     * @param _
     * @param param1 user id
     * @returns list of address
     */
    getUserAddresses: async (_: any, { userId }: { userId: string }) => {
      try {
        const data = await get_user_address({ userId });
        return data;
      } catch (error) {
        throw new Error("Error to get the address");
      }
    },

    /**
     * @function get single address
     * @param _
     * @param param1 userId, addressId
     * @returns address
     */
    getAddressByID: async (
      _: any,
      { userID, addressID }: { userID: string; addressID: string }
    ) => {
      try {
        const data = await get_user_single_address({ userID, addressID });
        return data;
      } catch (error) {
        throw new Error("Error in getting user single address ");
      }
    },

    /**
     * @function  get order according to status
     * @param _
     * @param param1 userId and status
     * @returns list of ordere products
     */
    getUserOrders: async (
      _: any,
      { userId, status }: { userId: string; status: OrderStatus }
    ) => {
      try {
        const data = await get_user_order({ userId, status });
        return data;
      } catch (error) {
        throw new Error("Error in getting user order list");
      }
    },

    /**
     * @function get current user details
     * @param _
     * @param _dir
     * @param user
     * @returns user details
     */
    getUser: async (
      _: any,
      _dir: any,
      { user }: { user: usermiddle | null }
    ) => {
      if (!user) {
        throw new Error("UnAuthorised to used this");
      }
      const email = user.email;
      const userData = (await get_user_db({ email })) as usermiddle;

      const token = await generateToken(userData);

      return { message: "Successfully Login", userData, token };
    },
  },

  Mutation: {
    /**
     * @function to create user as admin
     * @param _
     * @param param1 user details
     * @returns success message
     */
    createAdmin: async (
      _: any,
      { firstname, lastname, phonenumber, email, password, role }: User
    ) =>
      //  admin
      {
        try {
          const hashPassword = await bycrypt.hash(password, 10);
          const data = await insert_user_db({
            firstname,
            lastname,
            email,
            hashPassword,
            phonenumber,
            role: role || "USER",
          });
          return { message: "User created Successfully", data };
        } catch (error) {
          return error;
        }
      },

    /**
     * @function to create user
     * @param _
     * @param param1 user details
     * @returns success message
     */
    createUser: async (
      _: any,
      { firstname, lastname, email, password, phonenumber, role }: User
    ) => {
      try {
        const hashPassword = await bycrypt.hash(password, 10);
        const data = await insert_user_db({
          firstname,
          lastname,
          email,
          hashPassword,
          phonenumber,
          role: role || "USER",
        });
        return { message: "User created Successfully", data };
      } catch (error) {
        return error;
      }
    },

    //add address
    /**
     * @function add user address to db
     * @param _
     * @param param1 address details
     * @returns created address
     */
    addAddress: async (
      _: any,
      {
        userId,
        name,
        phonenumber,
        pincode,
        locality,
        com_address,
        city,
        state,
        landmark,
        alternate_phonenumber,
        address_type,
      }: {
        userId: string;
        name: string;
        phonenumber: string;
        pincode: string;
        locality: string;
        com_address: string;
        city: string;
        state: string;
        landmark?: string;
        alternate_phonenumber?: string;
        address_type: string;
        isActiveAddress: boolean;
      }
    ) => {
      try {
        const data = await insert_user_address({
          userId,
          name,
          phonenumber,
          pincode,
          locality,
          com_address,
          city,
          state,
          landmark,
          alternate_phonenumber,
          address_type,
        });
        return {
          ...data,
          isActiveAddress: data.isActiveAddress,
        };
      } catch (error) {
        throw new Error(
          `Failed to add address for user ${userId}. Please try again.`
        );
      }
    },

    /**
     * @function update user address
     * @param _
     * @param param1 addressId and userId and address data
     * @returns updated address
     */
    updateAddress: async (
      _: any,
      {
        id,
        userId,
        name,
        phonenumber,
        pincode,
        locality,
        com_address,
        city,
        state,
        landmark,
        alternate_phonenumber,
        address_type,
        isActiveAddress,
      }: {
        id: string;
        userId: string;
        name?: string;
        phonenumber?: string;
        pincode?: string;
        locality?: string;
        com_address?: string;
        city?: string;
        state?: string;
        landmark?: string;
        alternate_phonenumber?: string;
        address_type?: string;
        isActiveAddress?: boolean;
      }
    ) => {
      try {
        const data = await update_user_address({
          id,
          userId,
          name,
          phonenumber,
          pincode,
          locality,
          com_address,
          city,
          state,
          landmark,
          alternate_phonenumber,
          address_type,
          isActiveAddress,
        });
        return {
          ...data,
          isActiveAddress: data.isActiveAddress,
        };
      } catch (error) {
        throw new Error("Failed to update address. Please try again.");
      }
    },

    /**
     * @function to delete the address
     * @param _
     * @param param1 userId and addressId
     * @returns success message
     */
    deleteAddress: async (
      _: any,
      {
        addressId,
        userId,
      }: {
        addressId: string;
        userId: string;
      }
    ) => {
      try {
        console.log("Id here it is", addressId, userId);
        await delete_user_address({
          addressId,
          userId,
        });
        return "Address deleted successfully";
      } catch (error) {
        throw new Error(
          `Failed to delete address for user ${userId}. Please try again.`
        );
      }
    },

    /**
     * @function add order
     * @param _
     * @param param1 userId, productId and quantity
     * @returns added order
     */
    addOrder: async (
      _: any,
      {
        userId,
        productId,
        quantity = 1,
        status,
      }: {
        userId: string;
        productId: string;
        quantity?: number;
        status: OrderStatus;
      }
    ) => {
      try {
        const data = await insert_user_order({
          userId,
          productId,
          quantity: 1,
          status,
        });
        return data;
      } catch (error) {
        throw new Error("Something went wrong");
      }
    },

    /**
     * @function update order
     * @param _
     * @param param1 userId,status and orderId
     * @returns uodated order
     */
    updateOrder: async (
      _: any,
      {
        orderId,
        orderIds,
        quantity,
        increase,
        delete: isDelete,
        status,
      }: {
        orderId?: string;
        orderIds?: string[];
        quantity?: number;
        increase?: boolean;
        delete?: boolean;
        status?: OrderStatus;
      }
    ) => {
      try {
        const data = await update_user_order({
          orderId,
          orderIds,
          quantity,
          increase,
          isDelete,
          status,
        });
        return data;
      } catch (error) {
        throw new Error("Failed to update order. Please try again.");
      }
    },

    /**
     * @function send email
     */
    sendMessage: async (
      _: any,
      { name, email, message }: { name: string; email: string; message: string }
    ) => {
      const msg = {
        to: "celistialsys@gmail.com", // Admin's email
        from: "amanbisht1010@gmail.com",
        subject: "New Message from Contact Form",
        text: `You have a new message from ${name} (${email}):\n\n${message}`,
        html: `<strong>You have a new message from ${name} (${email}):</strong><br><p>${message}</p>`,
      };

      try {
        // Send email via SendGrid
        console.log(msg);
        await sgMail.send(msg);
        return "Message sent successfully!";
      } catch (error) {
        console.error("Error sending email:", error);
        return "Failed to send message.";
      }
    },
  },
};
