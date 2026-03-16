import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db.js";
import Destination from "../models/Destination.js";
import Category    from "../models/Category.js";
import Review      from "../models/Review.js";
import Itinerary   from "../models/Itinerary.js";

dotenv.config();

const destinations = [
  { name: "Bali",        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop", description: "Ancient temples, terraced rice paddies, and pristine beaches blending into a spiritual paradise.", priority: "1", location: "Indonesia", category: "Honeymoon" },
  { name: "Maldives",    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop", description: "Crystal lagoons, overwater bungalows, and endless turquoise horizons redefining luxury.", priority: "2", location: "Maldives", category: "Honeymoon" },
  { name: "Switzerland", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&auto=format&fit=crop", description: "Snow-capped alps, pristine lakes, and fairytale villages nestled in Europe's most dramatic landscapes.", priority: "3", location: "Europe", category: "Family" },
  { name: "Thailand",    image: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&auto=format&fit=crop", description: "Ancient temples, turquoise seas, floating markets and street food culture that is utterly addictive.", priority: "4", location: "Thailand", category: "Budget" },
  { name: "Dubai",       image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop", description: "Towering skylines, desert safaris, gold-soaked souks and the world's most ambitious city.", priority: "5", location: "UAE", category: "Luxury" },
  { name: "Japan",       image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop", description: "Bullet trains and Zen gardens, neon arcades and ancient samurai districts in perfect contradiction.", priority: "6", location: "Japan", category: "Cultural" },
  { name: "Norway",      image: "https://images.unsplash.com/photo-1501786223405-6d024d7e3da4?w=800&auto=format&fit=crop", description: "Dramatic fjords, the Northern Lights and Viking heritage woven through every coastal village.", priority: "7", location: "Scandinavia", category: "Adventure" },
  { name: "Vietnam",     image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&auto=format&fit=crop", description: "Ha Long Bay limestone karsts, Hoi An lantern streets and street food that stops your world.", priority: "8", location: "Vietnam", category: "Budget" },
  { name: "Greece",      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&auto=format&fit=crop", description: "Sun-bleached villages on volcanic cliffs, azure-domed churches against sapphire Aegean seas.", priority: "9", location: "Greece", category: "Honeymoon" },
  { name: "Singapore",   image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop", description: "Futuristic Supertrees, Michelin hawker food, and a city state where east meets west.", priority: "10", location: "Singapore", category: "Family" },
];

const categories = [
  { category: "honeymoon",  title: "Honeymoon",    subtitle: "Romantic escapes crafted for two",       image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop" },
  { category: "family",     title: "Family Trips",  subtitle: "Fun-filled vacations for all ages",      image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=600&auto=format&fit=crop" },
  { category: "adventure",  title: "Adventure",     subtitle: "Thrills, treks & unforgettable journeys",image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop" },
  { category: "luxury",     title: "Luxury",        subtitle: "Indulgent stays & premium experiences",  image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format&fit=crop" },
  { category: "budget",     title: "Budget Trips",  subtitle: "Best experiences at best prices",        image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=600&auto=format&fit=crop" },
  { category: "cultural",   title: "Cultural",      subtitle: "Explore heritage, art & history",        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop" },
];

const reviews = [
  { id: 1, name: "Priya Sharma",          location: "Mumbai, India",       photo: "", rating: 5, quote: "One Travel Expert planned our Maldives honeymoon flawlessly. Every detail from the seaplane transfer to the private beach dinner was handled with such care. Truly unforgettable!" },
  { id: 2, name: "Rahul & Meera Kapoor",  location: "Delhi, India",        photo: "", rating: 5, quote: "Our family trip to Switzerland was beyond expectations. The kids were thrilled and we loved every moment. No stress, no surprises — just pure joy." },
  { id: 3, name: "Arjun Mehta",           location: "Bengaluru, India",    photo: "", rating: 5, quote: "The Japan itinerary was perfect — cherry blossoms in Kyoto, street food in Tokyo, bullet trains. Hritik was always just a call away. Exceptional service." },
  { id: 4, name: "Sophia L.",             location: "Paris, France",       photo: "", rating: 5, quote: "Flawless execution from start to finish. The concierge team anticipated needs we didn't even know we had. Simply sublime." },
  { id: 5, name: "Vikram Nair",           location: "Chennai, India",      photo: "", rating: 5, quote: "Norway for the Northern Lights was a dream. Perfect timings, cozy cabin stays and expert guides. One of the best experiences of my life!" },
  { id: 6, name: "Neha & Rohan Gupta",   location: "Pune, India",         photo: "", rating: 5, quote: "Our Greece honeymoon was a dream. Santorini at sunset from our private terrace — we still can't believe how perfectly it was organised." },
];

const seedDB = async () => {
  await connectDB();
  try {
    await Promise.all([
      Destination.deleteMany({}),
      Category.deleteMany({}),
      Review.deleteMany({}),
    ]);
    console.log("🗑️  Cleared existing data");

    const insertedDests = await Destination.insertMany(destinations);
    await Category.insertMany(categories);
    await Review.insertMany(reviews);

    // Sample itinerary linked to Santorini/Greece (if it was inserted)
    const greece = insertedDests.find(d => d.name === "Greece");
    if (greece) {
      await Itinerary.create({
        _id: `itn_${greece._id}`,
        destinationId: greece._id.toString(),
        title: "Greece 3-Day Itinerary",
        mainHeading: "Santorini",
        displayTagline: "Welcome To",
        backgroundUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80",
        descriptionHeading: "Sun, Sea, Serenity – Only in Santorini",
        descriptionContent: "Curated for the discerning traveller, this itinerary blends the iconic with the intimate. Experience Greece through exclusive access, fresh seafood gastronomy, and the effortless elegance of island life.",
        services: { luxury: "5 Star Premium", Duration: "4 Days/3 Nights", includes: "Breakfast/Dinner", experience: "Island Tours" },
        days: [
          { day: 1, subtitle: "The Arrival", title: "Sunset Over the Caldera", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80", highlight: "Cliffside Welcome & Golden Hour Dinner", description: "Arrive on the volcanic jewel of Greece. Your suite perched above the Aegean welcomes you with uninterrupted blue horizons and a warm champagne toast at sunset.", details: [{ time: "14:00", activity: "Private Airport Transfer" }, { time: "16:00", activity: "Check-in at Canaves Oia Suites" }, { time: "19:30", activity: "Champagne Dinner Overlooking the Sea" }] },
          { day: 2, subtitle: "Beaches & Wine", title: "Red Cliffs & Volcanic Vines", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80", highlight: "Private Wine Tasting in Ancient Cellars", description: "From crimson cliffs to black sand, discover Santorini's natural wonders before indulging in a sommelier-curated journey through the island's volcanic wines.", details: [{ time: "10:00", activity: "Red Beach Scenic Walk" }, { time: "13:00", activity: "Seaside Taverna Lunch" }, { time: "16:30", activity: "Wine Tasting at Estate Argyros" }] },
          { day: 3, subtitle: "Adventure & Sea", title: "Volcano Trails & Hot Springs", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80", highlight: "Exclusive Sail to Nea Kameni", description: "Sail on a private catamaran to the volcanic islets. Swim in sulfur-rich hot springs and enjoy a Mediterranean dinner onboard as the sun melts into the sea.", details: [{ time: "09:30", activity: "Catamaran Pickup" }, { time: "12:00", activity: "Volcano Hike & Hot Springs Swim" }, { time: "17:30", activity: "Sunset Dinner Cruise" }] },
        ],
      });
      console.log("✅ Sample itinerary created for Greece/Santorini");
    }

    console.log(`✅ Seeded: ${insertedDests.length} destinations, ${categories.length} categories, ${reviews.length} reviews`);
  } catch (e) {
    console.error("❌ Seed failed:", e.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedDB();
