#!/bin/bash

set -e

echo "Verificando assets de Swagger..."
SWAGGER_ASSET="public/bundles/apiplatform/swagger-ui/swagger-ui.css"

if [ ! -f "$SWAGGER_ASSET" ]; then
  echo "Assets de Swagger no encontrados: ejecutando assets:install"
  php bin/console assets:install public --no-interaction
else
  echo "Assets de Swagger presentes"
fi

exec docker-php-entrypoint "$@"
