FROM hub.xiguacity.cn/runtime/nginx-sidecar:stable
 
ADD dist/* /webapp/
ADD coustom.conf /etc/nginx/default-site/coustom.conf 