// import fs from "fs";
// import csv from "csv-parser";
// import { getConnection } from "./connection/db.config";
// import { ProductDetails } from "./entities/ProductDetails";
// import { ProductImage } from "./entities/ProductImage";
// import { Subtitle } from "./entities/Subtitle";
// import path from "path";

// /** Function to Import CSV into PostgreSQL */
// async function importCSV<T>(filePath: string, Entity: { new (): T }) {
//   const AppDataSource = await getConnection();

//   return new Promise<void>((resolve, reject) => {
//     const records: any[] = [];

//     fs.createReadStream(filePath)
//       .pipe(csv())
//       .on("data", (row) => records.push(row))
//       .on("end", async () => {
//         try {
//           await AppDataSource.getRepository(Entity).save(records);
//           console.log(
//             `Successfully imported ${records.length} records into ${Entity.name}`
//           );
//           resolve();
//         } catch (error) {
//           console.error(`Error importing data into ${Entity.name}:`, error);
//           reject(error);
//         }
//       });
//   });
// }

// /** Main Function to Import Data */
// export async function importCSVData() {
//   const AppDataSource = await getConnection();

//   if (!AppDataSource.isInitialized) {
//     await AppDataSource.initialize();
//     console.log("Database connection established successfully.");
//   }

//   try {
//     await importCSV(
//       path.join(__dirname, "product_details.csv"),
//       ProductDetails
//     );
//     await importCSV(path.join(__dirname, "product_images.csv"), ProductImage);
//     await importCSV(path.join(__dirname, "sub_titles.csv"), Subtitle);

//     console.log("All data imported successfully!");
//     process.exit(0);
//   } catch (error) {
//     console.error("Failed to import data:", error);
//     process.exit(1);
//   }
// }
