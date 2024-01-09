FROM hub.xiguacity.cn/runtime/nginx-sidecar:stable
 
WORKDIR /opt/app-root/src
ADD dist /opt/app-root/src
COPY ./nginx.conf.template /
 
CMD envsubst < /nginx.conf.template > /etc/nginx/nginx.conf \
	&& cat /etc/nginx/nginx.conf \
	&& nginx -g 'daemon off;'