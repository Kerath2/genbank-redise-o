#!/bin/bash

set -e  # Salir si hay algún error

echo "🚀 Iniciando proceso de despliegue..."

# 1. Compilar la aplicación
echo "📦 Compilando la aplicación..."
npm run build

# 2. Preparar .dockerignore
echo "📝 Preparando archivos Docker..."
cp .dockerignore .dockerignore.bak
cp .dockerignore.prebuilt .dockerignore

# 3. Construir imagen
echo "🐳 Construyendo imagen Docker..."
podman build --platform linux/amd64 -f Dockerfile.prebuilt -t us.icr.io/blast-service/blast-frontend:latest .

# 4. Restaurar .dockerignore
echo "♻️  Restaurando .dockerignore..."
mv .dockerignore.bak .dockerignore

# 5. Login y push
echo "☁️  Subiendo imagen al registry..."
ibmcloud cr login
podman push us.icr.io/blast-service/blast-frontend:latest

# 6. Actualizar aplicación
echo "🔄 Actualizando aplicación en Code Engine..."
ibmcloud target -g Default
ibmcloud ce project select --name blast-project
ibmcloud ce application update --name blast-service --image us.icr.io/blast-service/blast-frontend:latest

echo "✅ ¡Despliegue completado exitosamente!"
echo "🌐 URL: https://blast-service.22uiqudhp7kt.us-south.codeengine.appdomain.cloud"
