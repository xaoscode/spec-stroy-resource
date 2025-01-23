#!/bin/bash

# Настройки из переменных окружения
BACKUP_DIR="${BACKUP_DIR:-/backups/postgres}"   
DB_HOST="${DB_HOST:-pg}"                    
DB_USER="${DB_USER:-postgres}"        
DB_NAME="${DB_NAME:-mydatabase}"               
RETENTION_DAYS="${RETENTION_DAYS:-7}"         
ENCRYPTION_PASSWORD="${ENCRYPTION_PASSWORD:-}"

# Проверка существования директории для бэкапов
if [ ! -d "$BACKUP_DIR" ]; then
    echo "Создаём директорию для бэкапов: $BACKUP_DIR"
    mkdir -p "$BACKUP_DIR"
fi

# Функция для создания бэкапа
create_backup() {
    TIMESTAMP=$(date +%F_%H-%M-%S)
    BACKUP_FILE="${BACKUP_DIR}/backup_${TIMESTAMP}.sql"
    ENCRYPTED_FILE="${BACKUP_FILE}.gpg"
    
    echo "Создаём бэкап базы данных..."
    if pg_dump -h "$DB_HOST" -U "$DB_USER" "$DB_NAME" > "$BACKUP_FILE"; then
        echo "Бэкап создан: $BACKUP_FILE"
    else
        echo "Ошибка создания бэкапа! Проверьте настройки подключения." >&2
        return 1
    fi

    if [ -n "$ENCRYPTION_PASSWORD" ]; then
        echo "Шифрование бэкапа..."
        if gpg --batch --yes --passphrase "$ENCRYPTION_PASSWORD" -c "$BACKUP_FILE"; then
            rm "$BACKUP_FILE"
            echo "Бэкап успешно зашифрован: $ENCRYPTED_FILE"
        else
            echo "Ошибка шифрования файла!" >&2
            return 1
        fi
    else
        echo "ENCRYPTION_PASSWORD не задан. Пропуск шифрования."
    fi
}

# Функция для удаления старых бэкапов
cleanup_old_backups() {
    echo "Удаляем бэкапы старше $RETENTION_DAYS дней..."
    find "$BACKUP_DIR" -type f -mtime +"$RETENTION_DAYS" -name "*.gpg" -exec rm {} \; && echo "Старые бэкапы удалены."
}

# Основной процесс
while true; do
    echo "=== Запуск процесса бэкапа: $(date) ==="
    if create_backup; then
        cleanup_old_backups
    else
        echo "Ошибка во время выполнения процесса бэкапа!" >&2
    fi
    echo "Ожидание следующего запуска (24 часа)..."
    sleep 86400
done
