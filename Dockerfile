FROM nginx:latest
 
RUN mkdir /dist
COPY ./dist /dist