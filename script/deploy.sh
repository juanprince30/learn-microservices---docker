#!/bin/bash
 # scripts/deploy.sh
 echo "
 🚀
 Déploiement de l'application ecommerce"
 # Construire les images
 echo "
 📦
 Construction des images..."
 docker-compose build
 # Démarrer les services
 echo "🏁
 Démarrage des services..."
 docker-compose up -d
 # Attendre que les services soient prêts
 echo "
 ⏳
 Attente du démarrage des services..."
 sleep 30
 # Vérifier la santé des services
 echo "
 🔍
 Vérification de la santé des services..."
 curl -f http://localhost/health || exit 1
 curl -f http://localhost/api/users/health || exit 1
 curl -f http://localhost/api/products/health || exit 1
 curl -f http://localhost/api/orders/health || exit 1
 echo "
 ✅
 Déploiement terminé avec succès!"
 echo "
 🌐
 Application disponible sur http://localhost"