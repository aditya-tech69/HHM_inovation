export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

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

  // In a real app you'd persist this to a database.
  return res.status(201).json({ success: true, booking });
}


