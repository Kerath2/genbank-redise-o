# Guía de Despliegue del Frontend BLAST en IBM Code Engine

Esta guía explica cómo hacer cambios en el frontend y desplegarlos en IBM Code Engine.

## Requisitos Previos

- Podman instalado
- IBM Cloud CLI (`ibmcloud`) instalado
- Acceso al proyecto de Code Engine: `blast-project`
- npm instalado

## URLs del Proyecto

- **Frontend (Producción)**: https://blast-service.22uiqudhp7kt.us-south.codeengine.appdomain.cloud
- **Container Registry**: us.icr.io/blast-service/blast-frontend
- **Proyecto Code Engine**: blast-project

---

## Proceso Completo de Despliegue

### 1. Hacer Cambios en el Código

Edita los archivos que necesites en `src/`:

```bash
# Ejemplo: editar un componente
vi src/components/BlastResults.tsx
```

### 2. Probar Localmente (Opcional pero Recomendado)

```bash
# Ejecutar en modo desarrollo
npm run dev

# La app estará disponible en http://localhost:5173
```

### 3. Compilar la Aplicación

```bash
# Compilar la aplicación
npm run build
```

Esto creará el directorio `build/` con los archivos compilados.

### 4. Preparar Archivos para Docker

```bash
# Intercambiar .dockerignore para permitir copiar build/
cp .dockerignore .dockerignore.bak
cp .dockerignore.prebuilt .dockerignore
```

### 5. Construir la Imagen Docker

```bash
# Construir imagen para amd64 (arquitectura de Code Engine)
podman build --platform linux/amd64 -f Dockerfile.prebuilt -t us.icr.io/blast-service/blast-frontend:latest .
```

**Nota**: Usamos `--platform linux/amd64` porque Code Engine usa arquitectura x64, aunque estemos en Mac ARM.

### 6. Restaurar .dockerignore Original

```bash
# Restaurar el archivo original
mv .dockerignore.bak .dockerignore
```

### 7. Autenticarse en IBM Cloud Container Registry

```bash
# Login a IBM Cloud (si no estás autenticado)
ibmcloud login --sso

# Login al Container Registry (esto configura podman automáticamente)
ibmcloud cr login
```

### 8. Subir Imagen al Registry

```bash
# Push de la imagen
podman push us.icr.io/blast-service/blast-frontend:latest
```

### 9. Configurar el Resource Group (si es necesario)

```bash
# Seleccionar el resource group Default
ibmcloud target -g Default
```

### 10. Actualizar la Aplicación en Code Engine

```bash
# El proyecto blast-project ya debería estar seleccionado, pero por si acaso:
ibmcloud ce project select --name blast-project

# Actualizar la aplicación con la nueva imagen
ibmcloud ce application update --name blast-service --image us.icr.io/blast-service/blast-frontend:latest
```

### 11. Verificar el Despliegue

```bash
# Ver el estado de la aplicación
ibmcloud ce application get --name blast-service

# Ver logs en tiempo real (opcional)
ibmcloud ce application logs -f --name blast-service
```

---

## Script de Despliegue Automático

Puedes usar este script para automatizar todo el proceso:

```bash
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
```

Guarda este script como `deploy.sh` y hazlo ejecutable:

```bash
chmod +x deploy.sh
./deploy.sh
```

---

## Solución de Problemas

### Error: "build/ directory not found"

Asegúrate de ejecutar `npm run build` antes de construir la imagen Docker.

### Error: "UNAUTHORIZED" o "403 Forbidden" al hacer push

1. Verifica que estés autenticado: `ibmcloud cr login`
2. Verifica que el namespace existe: `ibmcloud cr namespace-list`
3. Asegúrate de estar usando el namespace correcto: `blast-service`

### Error: "No resource group targeted"

```bash
ibmcloud target -g Default
```

### Error de arquitectura (exec format error)

Asegúrate de construir con `--platform linux/amd64`:

```bash
podman build --platform linux/amd64 -f Dockerfile.prebuilt -t us.icr.io/blast-service/blast-frontend:latest .
```

### La aplicación no refleja los cambios

1. Verifica que la imagen se haya subido correctamente:
   ```bash
   ibmcloud cr image-list | grep blast-frontend
   ```

2. Verifica que Code Engine esté usando la nueva imagen:
   ```bash
   ibmcloud ce app get --name blast-service
   ```

3. Limpia la caché del navegador o prueba en modo incógnito

4. Espera unos segundos para que la nueva revisión esté completamente desplegada

---

## Notas Importantes

1. **Arquitectura**: Code Engine usa `linux/amd64`. Siempre construye con `--platform linux/amd64` aunque estés en Mac ARM.

2. **Dockerfile.prebuilt vs Dockerfile**:
   - `Dockerfile`: Construye todo dentro del container (más lento, puede fallar por memoria)
   - `Dockerfile.prebuilt`: Usa build/ pre-compilado (más rápido, recomendado)

3. **Tags de Imagen**: Usamos `:latest` para simplicidad. En producción real, considera usar tags versionados como `:v1.2.3`.

4. **Variables de Entorno**: Si necesitas cambiar variables de entorno, usa:
   ```bash
   ibmcloud ce application update --name blast-service --env KEY=VALUE
   ```

5. **Rollback**: Si algo sale mal, puedes hacer rollback a una revisión anterior:
   ```bash
   # Ver revisiones disponibles
   ibmcloud ce app get --name blast-service

   # Hacer rollback (cambia el número de revisión)
   ibmcloud ce application update --name blast-service --revision blast-service-00004
   ```

---

## Estructura de Archivos

```
.
├── src/                        # Código fuente
├── build/                      # Archivos compilados (generado por npm run build)
├── Dockerfile                  # Dockerfile que compila dentro del container
├── Dockerfile.prebuilt         # Dockerfile que usa build/ pre-compilado
├── .dockerignore              # Ignora build/ y dist/
├── .dockerignore.prebuilt     # NO ignora build/ (para despliegue)
├── nginx.conf                 # Configuración de nginx
└── DEPLOYMENT.md              # Esta guía
```

---

## Verificación Post-Despliegue

Después de desplegar, verifica que todo funcione correctamente:

1. **Accede a la aplicación**: https://blast-service.22uiqudhp7kt.us-south.codeengine.appdomain.cloud

2. **Prueba las funcionalidades principales**:
   - BLAST N (nucleótidos): Verifica opciones de "Alignment view"
   - BLAST P (proteínas): Verifica opciones de "Alignment view"
   - Visualización con puntos para identidades

3. **Revisa los logs** para asegurarte de que no hay errores:
   ```bash
   ibmcloud ce app logs --name blast-service
   ```

---

## Contacto y Recursos

- **Documentación Code Engine**: https://cloud.ibm.com/docs/codeengine
- **Console IBM Cloud**: https://cloud.ibm.com/codeengine/projects
- **Proyecto en Console**: https://cloud.ibm.com/codeengine/project/us-south/ba5a9824-6646-4b19-a978-2701078f780c

---

## Historial de Cambios

### 2025-11-18
- ✅ Implementación de opciones de Alignment view diferenciadas por tipo de BLAST
- ✅ BLAST N: "Pairwise" y "Pairwise with dots for identities"
- ✅ BLAST P: "Pairwise" y "Query-anchored with dots for identities"
- ✅ Funcionalidad de visualización con puntos para posiciones idénticas
