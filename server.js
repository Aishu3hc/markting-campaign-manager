const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); 


mongoose.connect(process.env.mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(" MongoDB connected"))
.catch((err) => console.error(" MongoDB connection error:", err));


const campaignSchema = new mongoose.Schema({
  name: String,
  description: String,
  budget: Number,
  status: String,
  startDate: String,
  endDate: String,
  platform: String
});

const Campaign = mongoose.model("Campaign", campaignSchema);


app.get("/api/campaigns", async (req, res) => {
  const campaigns = await Campaign.find();
  res.json(campaigns);
});


app.get("/api/campaigns/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).send("Campaign not found");
    res.json(campaign);
  } catch {
    res.status(400).send("Invalid campaign ID");
  }
});


app.post("/api/campaigns", async (req, res) => {
  try {
    const campaign = new Campaign(req.body);
    await campaign.save();
    res.status(201).json({ message: "Campaign saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save campaign" });
  }
});
app.get("/api/products", async (req, res) => {
    try {
      const products = await mongoose.connection.db.collection("products").find({}).toArray();
      res.json(products);
    } catch (err) {
      console.error("Error fetching products:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
});
 
app.post("/api/cart", async (req, res) => {
    try {
      await mongoose.connection.db.collection("cart").insertOne(req.body);
      res.status(201).json({ message: "Added to cart" });
    } catch (err) {
      res.status(500).json({ error: "Failed to add to cart" });
    }
  });
  
 
  app.post("/api/buy", async (req, res) => {
    try {
      await mongoose.connection.db.collection("buy").insertOne(req.body);
      res.status(201).json({ message: "Purchase recorded" });
    } catch (err) {
      res.status(500).json({ error: "Failed to record purchase" });
    }
  });
  
  
  app.post("/api/impression", async (req, res) => {
    try {
      await mongoose.connection.db.collection("impression").insertOne(req.body);
      res.status(201).json({ message: "Impression saved" });
    } catch (err) {
      res.status(500).json({ error: "Failed to save impression" });
    }
  });
  app.get("/api/impression", async (req, res) => {
    try {
      const data = await mongoose.connection.db.collection("impression").find({}).toArray();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch impression data" });
    }
  });
  
  app.get("/api/cart", async (req, res) => {
    try {
      const data = await mongoose.connection.db.collection("cart").find({}).toArray();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch cart data" });
    }
  });
  
  app.get("/api/buy", async (req, res) => {
    try {
      const data = await mongoose.connection.db.collection("buy").find({}).toArray();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch buy data" });
    }
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
