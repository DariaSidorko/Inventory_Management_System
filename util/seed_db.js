const Product = require("../models/Product");
const User = require("../models/User");
const { fakerEN_US: faker } = require("@faker-js/faker");
const { Factory } = require("rosie");
require("dotenv").config();
const mongoose = require("mongoose");

const testUserPassword = faker.internet.password();

// Define factories
const userFactory = new Factory()
  .attr("name", () => faker.person.fullName())
  .attr("email", () => faker.internet.email())
  .attr("password", () => faker.internet.password());

const productFactory = new Factory()
  .attr("name", () => faker.commerce.productName())
  .attr("description", () => faker.commerce.productDescription())
  .attr("price", () => parseFloat(faker.commerce.price()))
  .attr("category", () => faker.helpers.arrayElement(['black tea', 'green tea', 'oolong tea', 'white tea', 'herbal tea', 'specialty tea']));

const seed_db = async () => {
  try {
    const mongoURL = process.env.MONGO_URI_TEST;
    await mongoose.connect(mongoURL);
    await Product.deleteMany({});
    await User.deleteMany({});

    const userData = userFactory.build({ password: testUserPassword });
    const testUser = await User.create(userData);

    const products = Array.from({ length: 20 }, () =>
      productFactory.build({ createdBy: testUser._id })
    );

    await Product.insertMany(products);
    console.log("✅ Database seeded");
    return testUser;
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    throw err;
  } finally {
    mongoose.connection.close();
  }
};

module.exports = { testUserPassword, seed_db };
