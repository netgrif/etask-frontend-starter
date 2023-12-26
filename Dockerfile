FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build

FROM nginx:alpine
MAINTAINER Netgrif <devops@netgrif.com>
COPY default.nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/etask/ /usr/share/nginx/html/
EXPOSE 80
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js && exec nginx -g 'daemon off;'"]
