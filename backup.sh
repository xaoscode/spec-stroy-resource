#!/bin/bash

# Настройки из переменных окружения
BACKUP_DIR="${BACKUP_DIR:-/backups/postgres}"   
DB_HOST="${DB_HOST:-pg}"                    
DB_USER="${DB_USER:-postgres}"        
DB_NAME="${DB_NAME:-mydatabase}"               
RETENTION_DAYS="${RETENTION_DAYS:-7}"         

# Функция для создания бэкапа
create_backup() {
    TIMESTAMP=$(date +%F)
    BACKUP_FILE="${BACKUP_DIR}/backup_${TIMESTAMP}.sql"
    echo "Создаём бэкап базы данных..."
    pg_dump -h $DB_HOST -U $DB_USER $DB_NAME > $BACKUP_FILE

    if [ $? -eq 0 ]; then
        echo "Бэкап создан: $BACKUP_FILE"
    else
        echo "Ошибка создания бэкапа!" >&2
    fi
}

# Функция для удаления старых бэкапов
cleanup_old_backups() {
    echo "Удаляем бэкапы старше $RETENTION_DAYS дней..."
    find $BACKUP_DIR -type f -mtime +$RETENTION_DAYS -delete
}

# Основной процесс
while true; do
    create_backup
    cleanup_old_backups
    echo "Ожидание следующего запуска (24 часа)..."
    sleep 86400
done
