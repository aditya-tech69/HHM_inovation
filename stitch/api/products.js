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

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  return res.status(200).json(products);
}

