# Replica de servicio BLAST

Aplicación web que replica la funcionalidad del servicio BLAST (Basic Local Alignment Search Tool) para búsquedas de secuencias biológicas.

## 🌐 Producción

- **URL**: https://blast-service.22uiqudhp7kt.us-south.codeengine.appdomain.cloud
- **Proyecto Code Engine**: blast-project
- **Container Registry**: us.icr.io/blast-service/blast-frontend

## 🚀 Desarrollo Local

### Instalación

```bash
# Instalar dependencias
npm install
```

### Ejecutar en modo desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:5173
```

### Compilar para producción

```bash
# Compilar la aplicación
npm run build

# Los archivos compilados estarán en ./build/
```

## 📦 Despliegue

Para desplegar cambios a producción en IBM Code Engine, consulta la guía completa:

**📖 [DEPLOYMENT.md](./DEPLOYMENT.md)**

### Despliegue Rápido

```bash
# Opción 1: Script automático (recomendado)
./deploy.sh

# Opción 2: Pasos manuales
npm run build
cp .dockerignore .dockerignore.bak
cp .dockerignore.prebuilt .dockerignore
podman build --platform linux/amd64 -f Dockerfile.prebuilt -t us.icr.io/blast-service/blast-frontend:latest .
mv .dockerignore.bak .dockerignore
ibmcloud cr login
podman push us.icr.io/blast-service/blast-frontend:latest
ibmcloud target -g Default
ibmcloud ce application update --name blast-service --image us.icr.io/blast-service/blast-frontend:latest
```

## 🧬 Características

### BLAST N (Nucleótidos)
- Búsqueda de secuencias de nucleótidos
- Opciones de visualización:
  - Pairwise
  - Pairwise with dots for identities

### BLAST P (Proteínas)
- Búsqueda de secuencias de proteínas
- Opciones de visualización:
  - Pairwise
  - Query-anchored with dots for identities

### Funcionalidades
- Visualización de alineamientos
- Filtrado de resultados
- Exportación de datos
- Gráficos de distribución taxonómica
- Historial de búsquedas

## 🛠️ Stack Tecnológico

- **Frontend**: React + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui
- **Servidor Web**: Nginx
- **Contenedor**: Podman/Docker
- **Cloud**: IBM Code Engine
- **Registry**: IBM Cloud Container Registry

## 📁 Estructura del Proyecto

```
.
├── src/
│   ├── components/       # Componentes React
│   ├── imports/          # Componentes importados de Figma
│   └── main.tsx         # Punto de entrada
├── build/               # Archivos compilados (generado)
├── Dockerfile           # Dockerfile completo
├── Dockerfile.prebuilt  # Dockerfile optimizado para despliegue
├── nginx.conf           # Configuración de Nginx
├── deploy.sh            # Script de despliegue automático
└── DEPLOYMENT.md        # Guía de despliegue completa
```

## 🔧 Configuración

### Variables de Entorno (Producción)

Las variables de entorno se configuran en IBM Code Engine:

```bash
# Ver variables actuales
ibmcloud ce app get --name blast-service

# Actualizar variable
ibmcloud ce app update --name blast-service --env KEY=VALUE
```

## 📝 Diseño Original

El diseño original está disponible en Figma: https://www.figma.com/design/ArCP7OlpCWX29elqmXTr4i/Replica-de-servicio-BLAST

## 🐛 Solución de Problemas

### La aplicación no compila

```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error de arquitectura en el build

Asegúrate de usar `--platform linux/amd64` al construir para Code Engine:

```bash
podman build --platform linux/amd64 -f Dockerfile.prebuilt -t us.icr.io/blast-service/blast-frontend:latest .
```

### Los cambios no se reflejan en producción

1. Verifica que la imagen se subió correctamente
2. Limpia la caché del navegador
3. Espera unos segundos para que la nueva revisión se despliegue completamente

Consulta [DEPLOYMENT.md](./DEPLOYMENT.md) para más detalles.

## 📚 Recursos

- **Documentación Code Engine**: https://cloud.ibm.com/docs/codeengine
- **Console IBM Cloud**: https://cloud.ibm.com/codeengine/projects
- **BLAST NCBI**: https://blast.ncbi.nlm.nih.gov/

## 📄 Licencia

Este proyecto es una réplica educativa del servicio BLAST de NCBI.