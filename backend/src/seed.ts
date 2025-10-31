import dotenv from "dotenv";
import mongoose from "mongoose";
import { Experience } from "./models/Experience";
import  Promo  from "./models/Promo";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ Connected to MongoDB");

    await Experience.deleteMany({});
    await Promo.deleteMany({});

    const experiences = [
      {
        title: "Sunset Boat Ride",
        location: "Goa",
        description:
          "Enjoy a serene sunset boat ride along the beautiful Goan coast. Perfect for couples and families.",
        price: 1200,
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", // Unsplash image
        slots: [
          { date: "2025-11-01", time: "5:00 PM" },
          { date: "2025-11-02", time: "5:00 PM" },
        ],
      },
      {
        title: "Mountain Hike Adventure",
        location: "Manali",
        description:
          "An adventurous hiking experience through the beautiful Himalayan trails.",
        price: 800,
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        slots: [
          { date: "2025-11-03", time: "7:00 AM" },
          { date: "2025-11-04", time: "7:00 AM" },
        ],
      },
      {
        title: "Desert Safari",
        location: "Rajasthan",
        description:
          "Experience the thrill of sand dunes, camel rides, and Rajasthani folk culture in this desert safari.",
        price: 1500,
        image:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090",
        slots: [
          { date: "2025-11-05", time: "4:00 PM" },
          { date: "2025-11-06", time: "4:00 PM" },
        ],
      },
      {
  title: "Jungle Safari Experience",
  location: "Jim Corbett",
  price: 4000,
  image: "https://images.unsplash.com/photo-1611095973619-45bb2b7f7b06",
  slots: [
    { date: "2025-11-04", time: "8:00 AM" },
    { date: "2025-11-04", time: "3:00 PM" }
  ]
},
{
  title: "Paragliding Over Hills",
  location: "Bir Billing",
  price: 4500,
  image: "https://images.unsplash.com/photo-1558980664-10ea5f1e2ab7",
  slots: [
    { date: "2025-11-05", time: "9:00 AM" },
    { date: "2025-11-05", time: "1:00 PM" }
  ]
},
{
  title: "Backwater Cruise",
  location: "Kerala",
  price: 3000,
  image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  slots: [
    { date: "2025-11-06", time: "10:00 AM" },
    { date: "2025-11-06", time: "4:00 PM" }
  ]
},
{
  title: "Camping by the Lake",
  location: "Pawna Lake",
  price: 2200,
  image: "https://images.unsplash.com/photo-1517821099602-3c9746f8b1c3",
  slots: [
    { date: "2025-11-07", time: "6:00 PM" },
    { date: "2025-11-08", time: "8:00 AM" }
  ]
},
{
  title: "Temple Trail Tour",
  location: "Madurai",
  price: 1800,
  image: "https://images.unsplash.com/photo-1582719478146-1b27a6747f7b",
  slots: [
    { date: "2025-11-09", time: "10:00 AM" },
    { date: "2025-11-09", time: "4:00 PM" }
  ]
}

    ];

    const promos = [
      { code: "SAVE10", discountPercent: 10 },
      { code: "FLAT100", flatDiscount: 100 },
    ];

    await Experience.insertMany(experiences);
    await Promo.insertMany(promos);

    console.log("✅ Seed data inserted successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seed();
