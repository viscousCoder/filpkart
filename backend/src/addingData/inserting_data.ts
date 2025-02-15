import { In } from "typeorm";
import { getConnection } from "../connection/db.config";
import { Address } from "../entities/Address";
import { AdminUser } from "../entities/AdminUser";
import { ProductDetails } from "../entities/ProductDetails";
import { ProductImage } from "../entities/ProductImage";
import { User } from "../entities/User";
import { OrderStatus, UserOrder } from "../entities/UserOrder";

/**Admin Interface */
interface createAdmin {
  firstname: string;
  lastname: string;
  age: number;
  phonenumber: string;
  email: string;
  hashPassword: string;
  gender: string;
  role: string;
}

/**Product Interface */
interface CreateProduct {
  name: string;
  subtitle: string[];
  outer_image: string;
  all_images: string[];
  price: number;
  rating: number;
  overview: string;
  company_name: string;
  category: string;
  subcategory: string;
  quantity: number;
  discount: number;
}

/**User Interface */
interface createUser {
  firstname: string;
  lastname: string;
  email: string;
  hashPassword: string;
  phonenumber: string;
  role: string;
}

/**User Address Interface */
interface userAddress {
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
}

/**User Address Updation Interface */
interface updateAddress {
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

/**
 * @function for creating admin
 * @param param0 took admin details
 * @returns insterted admin user
 */
export async function insert_admin_db({
  firstname,
  lastname,
  age,
  phonenumber,
  email,
  hashPassword,
  gender,
  role,
}: createAdmin) {
  const AppDataSource = await getConnection();
  const adminRepo = AppDataSource.getRepository(AdminUser);
  const user = await adminRepo.findOne({ where: { email: email } });
  if (user) {
    throw new Error("User already exists");
  }
  const userdata = await adminRepo.save({
    firstname,
    lastname,
    age,
    phonenumber,
    email,
    password: hashPassword,
    gender,
    role,
  });
  return userdata;
}

/**
 * @function to add product into the db
 * @param productData tooke product details
 * @returns created products
 */
export async function insertProductDB(productData: CreateProduct) {
  const AppDataSource = await getConnection();
  const productRepository = AppDataSource.getRepository(ProductDetails);
  const imageRepository = AppDataSource.getRepository(ProductImage);
  const newProduct = productRepository.create({
    ...productData,
  });
  const savedProduct = await productRepository.save(newProduct);

  // Save product images in DB
  const imageEntities = productData.all_images.map((image) =>
    imageRepository.create({ image, productDetails: savedProduct })
  );
  await imageRepository.save(imageEntities);

  return savedProduct;
}

/**
 * @function to add user to the db
 * @param param0 took user details
 * @returns created user
 */
export async function insert_user_db({
  firstname,
  lastname,
  email,
  hashPassword,
  phonenumber,
  role,
}: createUser) {
  const AppDataSource = await getConnection();
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({ where: { email: email } });

  if (user) {
    throw new Error("User already Exist");
  }

  const userData = await userRepo.save({
    firstname,
    lastname,
    email,
    password: hashPassword,
    phonenumber,
    role,
  });

  return userData;
}

/**
 * @function to add user address into the db
 * @param param0 took address details
 * @returns created address
 */
export async function insert_user_address({
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
}: userAddress) {
  const AppDataSource = await getConnection();
  const userRepo = AppDataSource.getRepository(User);
  const addressRepo = AppDataSource.getRepository(Address);

  try {
    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    await addressRepo.update({ user }, { isActiveAddress: false });

    const newAddress = addressRepo.create({
      phonenumber,
      pincode,
      name,
      locality,
      com_address,
      city,
      state,
      landmark,
      alternate_phonenumber,
      address_type,
      user,
      isActiveAddress: true,
    });

    const savedAddress = await addressRepo.save(newAddress);

    return savedAddress;
  } catch (error) {
    throw new Error(
      `Failed to insert address for user ${userId}. Please try again.`
    );
  }
}

/**
 * @function to update the user address into the db
 * @param param0 took address details
 * @returns return updated address
 */
export async function update_user_address({
  id,
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
  userId,
}: updateAddress) {
  const AppDataSource = await getConnection();
  const addressRepo = AppDataSource.getRepository(Address);

  try {
    // Check if address exists
    const existingAddress = await addressRepo.findOne({
      where: { id: id, user: { id: userId } },
    });

    if (!existingAddress) {
      throw new Error(`Address with ID ${id} not found for user ${userId}`);
    }

    await addressRepo.update(
      { user: { id: userId } },
      { isActiveAddress: false }
    );
    // Update fields only if they are provided
    const updatedAddress = await addressRepo.save({
      ...existingAddress,
      name: name ?? existingAddress.name,
      phonenumber: phonenumber ?? existingAddress.phonenumber,
      pincode: pincode ?? existingAddress.pincode,
      locality: locality ?? existingAddress.locality,
      com_address: com_address ?? existingAddress.com_address,
      city: city ?? existingAddress.city,
      state: state ?? existingAddress.state,
      landmark: landmark ?? existingAddress.landmark,
      alternate_phonenumber:
        alternate_phonenumber ?? existingAddress.alternate_phonenumber,
      address_type: address_type ?? existingAddress.address_type,
      isActiveAddress: true,
    });

    return updatedAddress;
  } catch (error) {
    throw new Error(`Failed to update address  Error`);
  }
}

/**
 * @function to delete the user address from the db
 * @param param0 took addressId and userId
 * @returns success message
 */
export async function delete_user_address({
  addressId,
  userId,
}: {
  addressId: string;
  userId: string;
}) {
  const AppDataSource = await getConnection();
  const addressRepo = AppDataSource.getRepository(Address);

  try {
    // Check if address exists
    const existingAddress = await addressRepo.findOne({
      where: { id: addressId, user: { id: userId } },
    });

    if (!existingAddress) {
      throw new Error(
        `Address with ID ${addressId} not found for user ${userId}`
      );
    }

    // Delete address
    await addressRepo.delete({ id: addressId });

    return { message: "Address deleted successfully" };
  } catch (error) {
    throw new Error(`Failed to delete address `);
  }
}

/**
 * @function to inseret the user order into the db
 * @param param0 took the product details and user id
 * @returns inserted product
 */
export async function insert_user_order({
  userId,
  productId,
  quantity = 1,
  status,
}: {
  userId: string;
  productId: string;
  quantity?: number;
  status: OrderStatus;
}) {
  const AppDataSource = await getConnection();
  const orderRepo = AppDataSource.getRepository(UserOrder);
  const userRepo = AppDataSource.getRepository(User);
  const productRepo = AppDataSource.getRepository(ProductDetails);

  try {
    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error("User not found");
    console.log("Hoistory1", productId);
    const product = await productRepo.findOne({ where: { id: productId } });
    if (!product) throw new Error("Product not found");
    if (status === "ORDERED") {
      const newOrder = orderRepo.create({ user, product, quantity, status });
      return await orderRepo.save(newOrder);
    } else {
      let existingOrder = await orderRepo.findOne({
        where: { user: { id: userId }, product: { id: productId }, status },
      });

      if (existingOrder) {
        existingOrder.quantity += quantity;
        existingOrder.status = status;
        const updatedOrder = await orderRepo.save(existingOrder);
        return updatedOrder;
      } else {
        const newOrder = orderRepo.create({ user, product, quantity, status });
        const savedOrder = await orderRepo.save(newOrder);
        return savedOrder;
      }
    }
  } catch (error) {
    console.error("Error in insert_user_order:", error);
    throw new Error("Something went wrong");
  }
}

/**
 * @function to update the user order status into the db
 * @param param0 took the orderId, userId,quantity etc
 * @returns updated user products
 */
export async function update_user_order({
  orderId,
  orderIds,
  quantity,
  increase,
  isDelete,
  status,
}: {
  orderId?: string;
  orderIds?: string[];
  quantity?: number;
  increase?: boolean;
  isDelete?: boolean;
  status?: OrderStatus;
}) {
  try {
    const AppDataSource = await getConnection();
    const orderRepo = AppDataSource.getRepository(UserOrder);

    // Bulk Status Update
    if (orderIds && status) {
      // const orders = await orderRepo.findByIds(orderIds);
      const orders = await orderRepo.find({
        where: { id: In(orderIds) },
        relations: ["product"],
      });

      if (orders.length === 0) throw new Error("No matching orders found");

      const updatedOrders = orders.map((order) => {
        order.status = status;
        order.updatedAt = new Date();
        return order;
      });
      console.log(updatedOrders, "hereee");
      return await orderRepo.save(updatedOrders);
    }

    // Single Order Update (Quantity Change or Delete)
    if (orderId) {
      const order = await orderRepo.findOne({ where: { id: orderId } });
      if (!order) throw new Error("Order not found");

      if (isDelete) {
        await orderRepo.remove(order);
        return [];
      }

      if (quantity !== undefined) {
        if (increase) {
          order.quantity += quantity;
        } else {
          order.quantity = Math.max(1, order.quantity - quantity);
        }
      }

      const updatedOrder = await orderRepo.save(order);
      return [updatedOrder];
    }

    throw new Error("Invalid request: Provide either orderId or orderIds");
  } catch (error) {
    throw new Error("Something went wrong while updating orders");
  }
}
