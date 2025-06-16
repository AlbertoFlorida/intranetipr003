FROM nginx:alpine

# Copia el build Angular compilado dentro del contenedor
COPY ./dist/intranet-ipr-frontend/browser/ /usr/share/nginx/html/

# Copia el nginx.conf personalizado para SPA (si tienes)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod -R a+r /usr/share/nginx/html
