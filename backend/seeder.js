import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

// import seeder data into the database
const importData = async () => {
  try {
    // clear all the out the data from the database
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // insert the users into the database
    const createdUsers = await User.insertMany(users);

    // get the admin user's id
    // the admin user is the first item in the users array
    const adminUser = createdUsers[0]._id;

    // add the admin user to each of the products
    const sampleProducts = products.map(product => {
      return {
        // spread the products into the object and add the admin user
        ...product,
        user: adminUser
      };
    });

    // add this sampleProducts to the database
    await Product.insertMany(sampleProducts);

    console.log('Seeder data inserted'.green.inverse);
    // exit the process
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    // exit the process with failure
    process.exit(1);
  }
};

// destroy all the data in the database
const destroyData = async () => {
  try {
    // clear all the out the data from the database
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed!'.red.inverse);
    // exit the process
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    // exit the process with failure
    process.exit(1);
  }
};

// destroy the data if the -d flag is added,
// otherwise import the data
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
