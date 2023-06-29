# 使用 14.1.0-buster 作为基础镜像
FROM node:14.1.0-buster

# 在容器中创建工作目录
WORKDIR /app

# 拷贝 package.json 和 package-lock.json 到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 拷贝整个应用程序到工作目录
COPY . .

# 构建应用程序
RUN npm run build

# 暴露端口
EXPOSE 80

# 运行应用程序
CMD [ "npm", "run", "dev" ]


