
// // run_seed.js
// const mongoose = require("mongoose");
// require("dotenv").config();
// const { seed_db } = require("./util/seed_db");

// const mongoURL = process.env.MONGO_URI_TEST;

// const run = async () => {
//   try {
//     await mongoose.connect(mongoURL);
//     console.log("Connected to MongoDB...");
//     await seed_db();
//     console.log("Database seeded successfully.");
//   } catch (err) {
//     console.error("Error seeding the database:", err);
//   } finally {
//     await mongoose.disconnect();
//     console.log("Disconnected.");
//   }
// };

// run();


// run_seed.js
const { seed_db } = require("./util/seed_db");

(async () => {
  try {
    console.log("🌱 Starting database seed...");
    const testUser = await seed_db();
    console.log("✅ Database seeding complete.");
    console.log("👤 Test user created:");
    console.log({
      email: testUser.email,
      password: "Check testUserPassword in seed_db.js export",
    });
  } catch (error) {
    console.error("❌ Error during database seeding:", error);
  } finally {
    process.exit(0);
  }
})();