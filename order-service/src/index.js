const express = require('express');
const redis = require('redis');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

// Connexion Redis
const client = redis.createClient({
  url: process.env.REDIS_URL
});

client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

// Routes
app.post('/orders', async (req, res) => {
  try {
    const { userId, items } = req.body;

    // Vérifier l'utilisateur
    const userResponse = await axios.get(`${process.env.USER_SERVICE_URL}/users/${userId}`);
    if (!userResponse.data) {
      return res.status(404).json({ error: 'User not found' });
    }

    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const productResponse = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/products/${item.productId}`);
      const product = productResponse.data;

      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for product ${product.name}` });
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      orderItems.push({
        productId: item.productId,
        productName: product.name,
        price: product.price,
        quantity: item.quantity,
        total: itemTotal
      });
    }

    // Créer la commande
    const orderId = uuidv4();
    const order = {
      id: orderId,
      userId,
      items: orderItems,
      total,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Sauvegarder dans Redis (expire après 1h)
    await client.setEx(`order:${orderId}`, 3600, JSON.stringify(order));

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderData = await client.get(`order:${orderId}`);

    if (!orderData) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(JSON.parse(orderData));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/orders/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const keys = await client.keys('order:*');
    const orders = [];

    for (const key of keys) {
      const orderData = await client.get(key);
      const order = JSON.parse(orderData);
      if (order.userId === userId) {
        orders.push(order);
      }
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'order-service' });
});

// Démarrer le serveur après la connexion Redis
const PORT = process.env.PORT || 3001;
(async () => {
  try {
    await client.connect();
    app.listen(PORT, () => {
      console.log(`Order service running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Impossible de se connecter à Redis', err);
    process.exit(1);
  }
})();
