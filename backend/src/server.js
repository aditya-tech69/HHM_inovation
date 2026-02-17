const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory data for demonstration. In production, replace with a real database.
const products = [
  {
    id: "obsidian-tea-set",
    name: "Obsidian Tea Set",
    price: 450.0,
    currency: "USD",
    limitedEdition: true,
    editionSize: 50
  }
];

const bookings = [];

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "hhm-backend" });
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/bookings", (req, res) => {
  const { name, email, date, notes } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }

  const booking = {
    id: `${Date.now()}`,
    name,
    email,
    date: date || null,
    notes: notes || "",
    createdAt: new Date().toISOString()
  };

  bookings.push(booking);

  res.status(201).json({ success: true, booking });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`HHM backend listening on http://localhost:${PORT}`);
});



