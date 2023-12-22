FROM nginx:1.16.0-alpine
COPY ./dist/car-service /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
# COPY ./error-page /usr/share/nginx/html