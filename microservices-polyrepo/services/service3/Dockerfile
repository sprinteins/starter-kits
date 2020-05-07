FROM nginx:1.17-alpine

RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
RUN chgrp -R root /var/cache/nginx

RUN addgroup nginx root
USER nginx

COPY ./src /usr/share/nginx/html
COPY ./nginx.conf  /etc/nginx/

USER nginx
EXPOSE 8080

CMD ["nginx" , "-g", "daemon off;"];