import { ILike } from "typeorm";
import { getConnection } from "../connection/db.config";
import { Address } from "../entities/Address";
import { AdminUser } from "../entities/AdminUser";
import { ProductDetails } from "../entities/ProductDetails";
import { User } from "../entities/User";
import { OrderStatus, UserOrder } from "../entities/UserOrder";

/**
 * @function get admin details
 * @param param0 email
 * @returns admin details
 */
export async function get_admin_db({ email }: { email: string }) {
  const AppDataSource = await getConnection();
  const userRepo = await AppDataSource.getRepository(AdminUser);
  const user = await userRepo.findOne({ where: { email } });
  return user;
}

/**
 * @function get user details
 * @param param0 email
 * @returns user details
 */
export async function get_user_db({ email }: { email: string }) {
  const AppDataSource = await getConnection();
  const userRepo = await AppDataSource.getRepository(User);
  const user = await userRepo.findOne({ where: { email } });
  return user;
}

/**
 * @function get all products
 * @param param0 category, comapnyname,or subcatgeiory
 * @returns list of products
 */
export async function get_products_list({
  company_name,
  category,
  subcategory,
}: {
  company_name?: string;
  category?: string;
  subcategory?: string;
}) {
  try {
    const AppDataSource = await getConnection();
    const productRepo = AppDataSource.getRepository(ProductDetails);
    const whereConditions: any = {};

    if (company_name) {
      whereConditions.company_name = company_name;
    }
    if (category) {
      whereConditions.category = category;
    }
    if (subcategory) {
      whereConditions.subcategory = subcategory;
    }

    const products = await productRepo.find({
      where: whereConditions,
      relations: ["images", "subtitles"],
    });

    return products;
  } catch (error) {
    console.error("Database error while fetching products:", error);
    throw new Error("An error occurred while retrieving products.");
  }
}

/**
 * @function to get the product detail
 * @param param0 product id
 * @returns object that contain product details
 */
export async function get_product_details({ id }: { id: string }) {
  try {
    const AppDataSource = await getConnection();
    const productRepo = AppDataSource.getRepository(ProductDetails);

    const product = await productRepo.findOne({
      where: { id: id },
      relations: ["images", "subtitles"],
    });

    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Error fetching product details");
  }
}

/**
 * @function to get the user search products
 * @param param0 search query
 * @returns object that contain product details
 */
export async function get_search_product_list({
  searchQuery,
}: {
  searchQuery: string;
}) {
  try {
    const AppDataSource = await getConnection();
    const productRepo = await AppDataSource.getRepository(ProductDetails);

    const product = await productRepo.find({
      where: {
        name: ILike(`%${searchQuery}%`),
      },
      relations: ["images", "subtitles"],
    });

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Error fetching product details");
  }
}

/**
 * @function to get the user address
 * @param param0 user id
 * @returns array of list of user address
 */
export async function get_user_address({ userId }: { userId: string }) {
  try {
    const AppDataSource = await getConnection();
    const addressRepo = AppDataSource.getRepository(Address);
    const data = await addressRepo.find({
      where: { user: { id: userId } },
      order: { isActiveAddress: "DESC", id: "DESC" },
    });
    console.log(data, "herer");
    return data;
  } catch (error) {
    throw new Error("Error in getting the user address");
  }
}

/**
 * @function to get the single address
 * @param param0 userId and addressId
 * @returns return user address
 */
export async function get_user_single_address({
  userID,
  addressID,
}: {
  userID: string;
  addressID: string;
}) {
  try {
    const AppDataSource = await getConnection();
    const addressRepo = AppDataSource.getRepository(Address);

    const data = await addressRepo.findOne({
      where: { id: addressID, user: { id: userID } },
    });

    if (!data) {
      throw new Error("Address not found");
    }

    return data;
  } catch (error) {
    throw new Error(`Error in getting the user address`);
  }
}

/**
 * @function to get the user orders
 * @param param0 userId and status
 * @returns list of orders
 */
export async function get_user_order({
  userId,
  status,
}: {
  userId: string;
  status: OrderStatus;
}) {
  try {
    const AppDataSource = await getConnection();
    const userOrderRepo = AppDataSource.getRepository(UserOrder);
    const data = await userOrderRepo.find({
      where: { user: { id: userId }, status },
    });
    return data;
  } catch (error) {
    throw new Error("Error in getting user order list");
  }
}
