FROM hub.xiguacity.cn/runtime/nginx-sidecar:stable
 
WORKDIR /opt/app-root/src
ADD dist /opt/app-root/src