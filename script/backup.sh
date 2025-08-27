 # Backup des volumes
 docker run --rm -v ecommerce_postgres_data:/data -v $(pwd):/backup alpine \
 tar czf /backup/postgres_backup_$(date +%Y%m%d_%H%M%S).tar.gz -C /data .
 # Backup de la base MongoDB
 docker exec mongo_container mongodump --out /backup/mongo_backup_$(date +%Y%m%d_%H%M%S)
 echo "
 ✅
 Backup terminé"