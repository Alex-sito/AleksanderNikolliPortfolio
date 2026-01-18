#!/bin/bash

set -e

IMAGE_NAME="sito-alex-frontend"
CONTAINER_NAME="sito-alex-frontend-test"
PORT="4000"

echo "🧹 Arresto ed eliminazione eventuale container frontend esistente..."
docker stop $CONTAINER_NAME >/dev/null 2>&1 || true
docker rm $CONTAINER_NAME >/dev/null 2>&1 || true

echo "🐳 Build immagine Docker frontend SSR..."
docker build -t $IMAGE_NAME .

echo "🚀 Avvio container frontend SSR (porta localhost:$PORT)..."
docker run -d \
  --name $CONTAINER_NAME \
  -p 127.0.0.1:$PORT:$PORT \
  $IMAGE_NAME

echo "⏳ Attendo avvio SSR..."
sleep 5

echo "🔍 Test homepage SSR..."
curl -I http://localhost:$PORT || {
  echo "❌ Errore: frontend SSR non risponde"
  exit 1
}

echo ""
echo "✅ Frontend SSR Docker funzionante!"
echo "👉 Container: $CONTAINER_NAME"
echo "👉 URL: http://localhost:$PORT"
