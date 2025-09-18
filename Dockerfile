#指定基础镜像
FROM nginx
MAINTAINER CHEN BEI
COPY ./dist /home/front
COPY default.conf /etc/nginx/nginx.conf

# docker build -t manage .  #manage指镜像名称
# sudo docker run -d --name manage  -p 8081:8081 manage


docker run --name manage -p 8081:8081 -p 80:80 -v /Users/yeiccie/Documents/work_space/second-hand-mall/manage_code/nginxTmp/html:/usr/share/nginx/html -v /Users/yeiccie/Documents/work_space/second-hand-mall/manage_code/nginxTmp/log:/var/log/nginx -v /Users/yeiccie/Documents/work_space/second-hand-mall/manage_code/nginxTmp/conf:/etc/nginx -d nginx
