const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());

// Proxy vers user-service
app.use('/users', createProxyMiddleware({
  target: 'http://user-service:3000',
  changeOrigin: true,
}));

// Proxy vers product-service
app.use('/products', createProxyMiddleware({
  target: 'http://product-service:5000',
  changeOrigin: true,
}));

// Proxy vers order-service
app.use('/orders', createProxyMiddleware({
  target: 'http://order-service:3001',
  changeOrigin: true,
}));

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'api-gateway' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
