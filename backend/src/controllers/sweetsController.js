const prisma = require('../prisma');

exports.createSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;
    const sweet = await prisma.sweet.create({
      data: {
        name,
        category,
        price: parseFloat(price),
        quantity: parseInt(quantity)
      }
    });
    res.status(201).json(sweet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listSweets = async (req, res) => {
  const sweets = await prisma.sweet.findMany();
  res.json(sweets);
};

exports.searchSweets = async (req, res) => {
  const { q, minPrice, maxPrice, category } = req.query;
  const where = {
    AND: [
      q ? { name: { contains: q, mode: 'insensitive' } } : {},
      category ? { category } : {},
      (minPrice || maxPrice) ? {
        price: {
          gte: minPrice ? parseFloat(minPrice) : undefined,
          lte: maxPrice ? parseFloat(maxPrice) : undefined
        }
      } : {}
    ]
  };
  const sweets = await prisma.sweet.findMany({ where });
  res.json(sweets);
};

exports.updateSweet = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const sweet = await prisma.sweet.update({ where: { id }, data });
    res.json(sweet);
  } catch (err) {
    res.status(404).json({ message: 'Sweet not found' });
  }
};

exports.deleteSweet = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.sweet.delete({ where: { id } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(404).json({ message: 'Sweet not found' });
  }
};

exports.purchaseSweet = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const qty = parseInt(req.body.quantity || 1);
    const sweet = await prisma.sweet.findUnique({ where: { id } });
    if (!sweet || sweet.quantity < qty)
      return res.status(400).json({ message: 'Not enough stock' });
    const updated = await prisma.sweet.update({
      where: { id },
      data: { quantity: sweet.quantity - qty }
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.restockSweet = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const qty = parseInt(req.body.quantity || 1);
    const sweet = await prisma.sweet.findUnique({ where: { id } });
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    const updated = await prisma.sweet.update({
      where: { id },
      data: { quantity: sweet.quantity + qty }
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
