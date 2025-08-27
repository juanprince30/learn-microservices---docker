#!/bin/bash
 # scripts/test.sh
 echo "
 🧪
 Tests de l'application"
 # Test de création d'utilisateur
 echo "
 👤
 Test création utilisateur..."
 USER_RESPONSE=$(curl -s -X POST http://localhost/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}')
 echo "User created: $USER_RESPONSE"
 # Test de création de produit
 echo "
 📦
 Test création produit..."
 PRODUCT_RESPONSE=$(curl -s -X POST http://localhost/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":99.99,"description":"Test description","stock":10}')
 echo "Product created: $PRODUCT_RESPONSE"
 # Test de création de commande
 echo "
 🛒
 Test création commande..."
 ORDER_RESPONSE=$(curl -s -X POST http://localhost/api/orders \
  -H "Content-Type: application/json" \
  -d '{"userId":"test-user-id","items":[{"productId":1,"quantity":2}]}')
 echo "Order created: $ORDER_RESPONSE"
 echo "
 ✅
 Tests terminés"
